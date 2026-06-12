import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InvoiceFormValues } from "@/components/pages/subscribers/InvoiceFormModal";
import { balanceDeltaForInvoice } from "@/lib/invoiceUtils";
import {
  applyBalanceDelta,
  invalidatePoolAndStatsCaches,
  invalidateSubscriberCaches,
  patchSubscriberInCaches,
} from "@/lib/queryCache";
import {
  subscriberByLineIdQueryKey,
  subscriberInvoicesQueryKey,
  subscriberLogsQueryKey,
  subscriberProfileQueryKey,
  subscriberSpeedHistoryQueryKey,
  subscriberUsernameHistoryQueryKey,
  subscribersQueryKey,
} from "@/lib/queryKeys";
import { customersService } from "@/services/customers.service";
import {
  subscribersService,
  type SubscriberUpdatePayload,
  type SubscribersListParams,
} from "@/services/subscribers.service";
import { usernamesService } from "@/services/usernames.service";
import type { SubscriberInvoice } from "@/types/subscriber";

export {
  subscriberByLineIdQueryKey,
  subscriberInvoicesQueryKey,
  subscriberLogsQueryKey,
  subscriberProfileQueryKey,
  subscriberSpeedHistoryQueryKey,
  subscriberUsernameHistoryQueryKey,
  subscribersQueryKey,
} from "@/lib/queryKeys";

export type SubscriberProfilePatch = SubscriberUpdatePayload & {
  packageLine?: number;
  firstContactDate?: string | null;
  usernameId?: number | null;
  usernameSpeedId?: number | null;
};

export function useSubscribersQuery(
  params: SubscribersListParams = {},
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: subscribersQueryKey(params),
    queryFn: () => subscribersService.list(params),
    enabled: options?.enabled ?? true,
  });
}

/** API: suspended=false, expired=true — urgency filtered on the client */
export function useExpiringSubscribersQuery(search?: string) {
  return useSubscribersQuery({
    suspended: false,
    expired: true,
    search: search?.trim() || undefined,
    limit: 500,
  });
}

/** API: suspended=true — includes rows without a linked username */
export function useStoppedSubscribersQuery(search?: string) {
  return useSubscribersQuery({
    suspended: true,
    expired: false,
    search: search?.trim() || undefined,
    limit: 500,
  });
}

export function useSubscriberProfileQuery(subscriberId: number, enabled = true) {
  return useQuery({
    queryKey: subscriberProfileQueryKey(subscriberId),
    queryFn: () => subscribersService.getProfile(subscriberId),
    enabled: enabled && subscriberId > 0,
  });
}

export function useSubscriberByLineIdQuery(lineId: string, enabled = true) {
  return useQuery({
    queryKey: subscriberByLineIdQueryKey(lineId),
    queryFn: () => subscribersService.getByLineId(lineId),
    enabled: enabled && Boolean(lineId.trim()),
  });
}

export function useSubscriberUsernameHistoryQuery(subscriberId: number, lineId: string) {
  return useQuery({
    queryKey: subscriberUsernameHistoryQueryKey(subscriberId),
    queryFn: () => subscribersService.getUsernameHistory(subscriberId, lineId),
    enabled: subscriberId > 0 && Boolean(lineId),
  });
}

export function useSubscriberSpeedHistoryQuery(subscriberId: number, lineId: string) {
  return useQuery({
    queryKey: subscriberSpeedHistoryQueryKey(subscriberId),
    queryFn: () => subscribersService.getSpeedHistory(subscriberId, lineId),
    enabled: subscriberId > 0 && Boolean(lineId),
  });
}

export function useSubscriberInvoicesQuery(subscriberId: number, lineId: string) {
  return useQuery({
    queryKey: subscriberInvoicesQueryKey(subscriberId),
    queryFn: () => subscribersService.listInvoices(subscriberId, lineId),
    enabled: subscriberId > 0 && Boolean(lineId),
  });
}

export function useSubscriberLogsQuery(
  subscriberId: number,
  context: { lineId: string; fullName: string },
  params: { page?: number; limit?: number } = {},
  enabled = true,
) {
  const page = params.page ?? 1;
  const limit = params.limit ?? 15;

  return useQuery({
    queryKey: subscriberLogsQueryKey(subscriberId, page, limit),
    queryFn: () => subscribersService.getActivityLogs(subscriberId, context, { page, limit }),
    enabled: enabled && subscriberId > 0 && Boolean(context.lineId.trim()),
    placeholderData: (prev) => prev,
  });
}

export function useSubscriberProfileMutations(subscriberId: number) {
  const queryClient = useQueryClient();

  const invalidateProfile = (lineId?: string) => {
    invalidateSubscriberCaches(queryClient, { subscriberId, lineId });
  };

  const updateMutation = useMutation({
    mutationFn: async (patch: SubscriberProfilePatch) => {
      if (patch.packageLine !== undefined) {
        await customersService.update(subscriberId, { lineId: String(patch.packageLine) });
      }

      const subscriberPayload: SubscriberUpdatePayload = {
        fullName: patch.fullName,
        facilityType: patch.facilityType,
        phone: patch.phone,
        notes: patch.notes,
        isSuspended: patch.isSuspended,
        isPaused: patch.isPaused,
        monthlyPrice: patch.monthlyPrice,
        speedId: patch.speedId,
        password: patch.password,
        routerName: patch.routerName,
        routerImageFile: patch.routerImageFile,
      };

      const hasSubscriberFields = Object.entries(subscriberPayload).some(
        ([, value]) => value !== undefined,
      );

      let updatedSubscriber;
      if (hasSubscriberFields) {
        updatedSubscriber = await subscribersService.update(subscriberId, subscriberPayload);
      }

      if (
        patch.firstContactDate !== undefined &&
        patch.usernameId &&
        patch.usernameSpeedId
      ) {
        await usernamesService.updateStartDate(
          patch.usernameSpeedId,
          patch.usernameId,
          patch.firstContactDate ?? "",
        );
      }

      if (updatedSubscriber) {
        return updatedSubscriber;
      }

      const profile = await subscribersService.getProfile(subscriberId);
      return profile.subscriber;
    },
    onSuccess: (subscriber, patch) => {
      patchSubscriberInCaches(queryClient, subscriber);
      invalidateProfile(subscriber.lineId);
      if (patch.speedId !== undefined) {
        queryClient.invalidateQueries({ queryKey: subscriberSpeedHistoryQueryKey(subscriberId) });
      }
    },
  });

  const stopMutation = useMutation({
    mutationFn: () => subscribersService.update(subscriberId, { isSuspended: true }),
    onSuccess: (subscriber) => {
      patchSubscriberInCaches(queryClient, subscriber);
      invalidateProfile(subscriber.lineId);
    },
  });

  const pauseMutation = useMutation({
    mutationFn: (paused: boolean) =>
      subscribersService.update(subscriberId, { isPaused: paused }),
    onSuccess: (subscriber) => {
      patchSubscriberInCaches(queryClient, subscriber);
      invalidateProfile(subscriber.lineId);
    },
  });

  const assignUsernameMutation = useMutation({
    mutationFn: ({
      availableUsernameId,
      changeCause,
    }: {
      availableUsernameId: number;
      changeCause?: string | null;
    }) => subscribersService.assignUsername(subscriberId, availableUsernameId, changeCause),
    onSuccess: (subscriber) => {
      patchSubscriberInCaches(queryClient, subscriber);
      invalidateProfile(subscriber.lineId);
      queryClient.invalidateQueries({ queryKey: subscriberInvoicesQueryKey(subscriberId) });
      queryClient.invalidateQueries({ queryKey: subscriberUsernameHistoryQueryKey(subscriberId) });
      queryClient.invalidateQueries({ queryKey: subscriberSpeedHistoryQueryKey(subscriberId) });
      invalidatePoolAndStatsCaches(queryClient);
    },
  });

  const autoAssignUsernameMutation = useMutation({
    mutationFn: (speedId: number) =>
      subscribersService.autoAssignUsernameBySpeed(subscriberId, speedId),
    onSuccess: (subscriber) => {
      patchSubscriberInCaches(queryClient, subscriber);
      invalidateProfile(subscriber.lineId);
      queryClient.invalidateQueries({ queryKey: subscriberInvoicesQueryKey(subscriberId) });
      queryClient.invalidateQueries({ queryKey: subscriberUsernameHistoryQueryKey(subscriberId) });
      queryClient.invalidateQueries({ queryKey: subscriberSpeedHistoryQueryKey(subscriberId) });
      invalidatePoolAndStatsCaches(queryClient);
    },
  });

  return {
    updateMutation,
    stopMutation,
    pauseMutation,
    assignUsernameMutation,
    autoAssignUsernameMutation,
    invalidateProfile,
  };
}

export function useSubscriberInvoiceMutations(subscriberId: number, lineId: string) {
  const queryClient = useQueryClient();

  const invalidateInvoices = () => {
    queryClient.invalidateQueries({ queryKey: subscriberInvoicesQueryKey(subscriberId) });
    invalidateSubscriberCaches(queryClient, { subscriberId, lineId });
  };

  const createMutation = useMutation({
    mutationFn: (values: InvoiceFormValues) =>
      subscribersService.createInvoice(subscriberId, lineId, {
        paidAmount: Number(values.paidAmount) || 0,
        paymentMethod: values.paymentMethod as import("@/types/subscriber").PaymentMethod,
        notes: values.notes,
      }),
    onSuccess: (_invoice, values) => {
      const paid = Number(values.paidAmount) || 0;
      applyBalanceDelta(queryClient, subscriberId, lineId, balanceDeltaForInvoice(paid, paid));
      invalidateInvoices();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (invoiceId: number) =>
      subscribersService.deleteInvoice(subscriberId, invoiceId),
    onSuccess: (_void, invoiceId) => {
      const invoices = queryClient.getQueryData<SubscriberInvoice[]>(
        subscriberInvoicesQueryKey(subscriberId),
      );
      const removed = invoices?.find((row) => row.id === invoiceId);
      if (removed) {
        applyBalanceDelta(
          queryClient,
          subscriberId,
          lineId,
          -balanceDeltaForInvoice(removed.amount, removed.paidAmount),
        );
      }
      invalidateInvoices();
    },
  });

  return { createMutation, deleteMutation };
}

export function useSubscriberUsernameHistoryMutations(subscriberId: number, lineId: string) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: subscriberUsernameHistoryQueryKey(subscriberId) });
  };

  const createMutation = useMutation({
    mutationFn: (body: {
      oldUsername: string;
      oldPassword?: string | null;
      usageStartDate?: string | null;
      usageEndDate?: string | null;
    }) => subscribersService.createUsernameHistoryEntry(subscriberId, lineId, body),
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      historyId,
      body,
    }: {
      historyId: number;
      body: {
        oldUsername: string;
        oldPassword?: string | null;
        usageStartDate?: string | null;
        usageEndDate?: string | null;
      };
    }) => subscribersService.updateUsernameHistoryEntry(subscriberId, lineId, historyId, body),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (historyId: number) =>
      subscribersService.deleteUsernameHistoryEntry(subscriberId, historyId),
    onSuccess: invalidate,
  });

  return { createMutation, updateMutation, deleteMutation };
}

export function useUsernameHistoryExcelMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["subscribers"] });
    queryClient.invalidateQueries({ queryKey: ["username-history"] });
  };

  const importMutation = useMutation({
    mutationFn: (file: File) => subscribersService.importUsernameHistoryExcel(file),
    onSuccess: invalidate,
  });

  const exportMutation = useMutation({
    mutationFn: () => subscribersService.exportUsernameHistoryExcel(),
  });

  return { importMutation, exportMutation };
}

export function useSubscriberExcelMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["subscribers"] });
    queryClient.invalidateQueries({ queryKey: ["customers"] });
  };

  const importMutation = useMutation({
    mutationFn: (file: File) => subscribersService.importExcel(file),
    onSuccess: invalidate,
  });

  const exportMutation = useMutation({
    mutationFn: () => subscribersService.exportExcel(),
  });

  return { importMutation, exportMutation };
}

export function useSubscriberListMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["subscribers"] });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: number;
      values: {
        fullName?: string;
        facilityType?: string | null;
        phone?: string | null;
        notes?: string | null;
      };
    }) => subscribersService.update(id, values),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => subscribersService.remove(id),
    onSuccess: invalidate,
  });

  const deleteAllMutation = useMutation({
    mutationFn: () => subscribersService.removeAll(),
    onSuccess: invalidate,
  });

  return { updateMutation, deleteMutation, deleteAllMutation };
}
