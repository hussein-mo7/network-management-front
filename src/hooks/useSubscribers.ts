import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InvoiceFormValues } from "@/components/pages/subscribers/InvoiceFormModal";
import { customersService } from "@/services/customers.service";
import { subscribersService, type SubscribersListParams } from "@/services/subscribers.service";
import type { Subscriber } from "@/types/subscriber";

export const subscribersQueryKey = (params?: SubscribersListParams) =>
  ["subscribers", params ?? {}] as const;

export const subscriberProfileQueryKey = (id: number) => ["subscribers", "profile", id] as const;

export const subscriberByLineIdQueryKey = (lineId: string) =>
  ["subscribers", "line", lineId] as const;

export const subscriberInvoicesQueryKey = (id: number) => ["subscribers", id, "invoices"] as const;

export const subscriberUsernameHistoryQueryKey = (id: number) =>
  ["subscribers", id, "username-history"] as const;

export const subscriberSpeedHistoryQueryKey = (id: number) =>
  ["subscribers", id, "speed-history"] as const;

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

export function useSubscriberProfileMutations(subscriberId: number) {
  const queryClient = useQueryClient();

  const invalidateProfile = () => {
    queryClient.invalidateQueries({ queryKey: subscriberProfileQueryKey(subscriberId) });
    queryClient.invalidateQueries({ queryKey: ["subscribers", "line"] });
    queryClient.invalidateQueries({ queryKey: ["subscribers"] });
  };

  const updateMutation = useMutation({
    mutationFn: async (patch: Partial<Subscriber> & { password?: string | null; speedId?: number }) => {
      if (patch.packageLine !== undefined) {
        await customersService.update(subscriberId, { lineId: String(patch.packageLine) });
      }

      const hasSubscriberFields =
        patch.fullName !== undefined ||
        patch.facilityType !== undefined ||
        patch.phone !== undefined ||
        patch.notes !== undefined ||
        patch.isSuspended !== undefined ||
        patch.isPaused !== undefined ||
        patch.monthlyPrice !== undefined ||
        patch.speedId !== undefined ||
        patch.password !== undefined;

      if (hasSubscriberFields) {
        return subscribersService.update(subscriberId, {
          fullName: patch.fullName,
          facilityType: patch.facilityType,
          phone: patch.phone,
          notes: patch.notes,
          isSuspended: patch.isSuspended,
          isPaused: patch.isPaused,
          monthlyPrice: patch.monthlyPrice,
          speedId: patch.speedId,
          password: patch.password,
        });
      }

      const profile = await subscribersService.getProfile(subscriberId);
      return profile.subscriber;
    },
    onSuccess: (_data, patch) => {
      invalidateProfile();
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      if (patch.speedId !== undefined) {
        queryClient.invalidateQueries({ queryKey: subscriberSpeedHistoryQueryKey(subscriberId) });
      }
    },
  });

  const stopMutation = useMutation({
    mutationFn: () => subscribersService.update(subscriberId, { isSuspended: true }),
    onSuccess: invalidateProfile,
  });

  const pauseMutation = useMutation({
    mutationFn: (paused: boolean) =>
      subscribersService.update(subscriberId, { isPaused: paused }),
    onSuccess: () => {
      invalidateProfile();
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
    },
  });

  const assignUsernameMutation = useMutation({
    mutationFn: (availableUsernameId: number) =>
      subscribersService.assignUsername(subscriberId, availableUsernameId),
    onSuccess: () => {
      invalidateProfile();
      queryClient.invalidateQueries({ queryKey: subscriberInvoicesQueryKey(subscriberId) });
      queryClient.invalidateQueries({ queryKey: subscriberUsernameHistoryQueryKey(subscriberId) });
      queryClient.invalidateQueries({ queryKey: subscriberSpeedHistoryQueryKey(subscriberId) });
      queryClient.invalidateQueries({ queryKey: ["available-usernames"] });
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
    },
  });

  return { updateMutation, stopMutation, pauseMutation, assignUsernameMutation, invalidateProfile };
}

export function useSubscriberInvoiceMutations(subscriberId: number, lineId: string) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: subscriberInvoicesQueryKey(subscriberId) });
    queryClient.invalidateQueries({ queryKey: subscriberProfileQueryKey(subscriberId) });
  };

  const createMutation = useMutation({
    mutationFn: (values: InvoiceFormValues) =>
      subscribersService.createInvoice(subscriberId, lineId, {
        amount: Number(values.amount) || 0,
        paidAmount: Number(values.paidAmount) || 0,
        paymentMethod: values.paymentMethod as import("@/types/subscriber").PaymentMethod,
        notes: values.notes,
      }),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (invoiceId: number) =>
      subscribersService.deleteInvoice(subscriberId, invoiceId),
    onSuccess: invalidate,
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
