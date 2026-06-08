import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  AssignUsernameModal,
  CustomerBalanceSection,
  CustomerProfileForm,
  CustomerProfileHeader,
  type CustomerProfileFormValues,
} from "@/components/pages/customers";
import type { PickedUsername } from "@/components/pages/subscribers/PickAvailableUsernameModal";
import { Button } from "@/components/ui/buttons";
import { LoadingState } from "@/components/ui/feedback";
import { Heading, Text } from "@/components/ui/typography";
import { useCustomerByLineIdQuery, useCustomerMutations } from "@/hooks/useCustomers";
import {
  useSubscriberInvoiceMutations,
  useSubscriberInvoicesQuery,
  useSubscriberProfileMutations,
  useSubscriberSpeedHistoryQuery,
} from "@/hooks/useSubscribers";
import { useSpeedsQuery } from "@/hooks/useSpeeds";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import {
  customerOwesMoney,
  isOnSubscribersList,
} from "@/lib/customerUtils";
import { isOnExpiringPage } from "@/lib/expiringUtils";
import { subscriberProfilePath } from "@/lib/routePaths";
import { buildSpeedLabel, isStoppedSubscriber } from "@/lib/subscriberUtils";
import { ApiError } from "@/types/api";
import type { PaymentMethod } from "@/types/subscriber";

export function CustomerProfilePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { canManage } = useRoleAccess();
  const { lineId } = useParams<{ lineId: string }>();
  const decodedLineId = lineId ? decodeURIComponent(lineId) : "";

  const [assignOpen, setAssignOpen] = useState(false);

  const {
    data: customer,
    isLoading,
    isError,
    error,
    refetch,
  } = useCustomerByLineIdQuery(decodedLineId, Boolean(decodedLineId));

  const { updateMutation } = useCustomerMutations();
  const { assignUsernameMutation } = useSubscriberProfileMutations(customer?.id ?? 0);

  const invoicesQuery = useSubscriberInvoicesQuery(customer?.id ?? 0, customer?.lineId ?? "");
  const { createMutation: createInvoiceMutation } = useSubscriberInvoiceMutations(
    customer?.id ?? 0,
    customer?.lineId ?? "",
  );

  const { data: speedTiers = [] } = useSpeedsQuery();
  const speedHistoryQuery = useSubscriberSpeedHistoryQuery(customer?.id ?? 0, customer?.lineId ?? "");

  const poolSpeedMbps = useMemo(() => {
    if (!customer) return null;
    if (customer.speedMbps) return customer.speedMbps;
    const fromHistory = speedHistoryQuery.data?.[0]?.newSpeedMbps;
    return fromHistory && fromHistory > 0 ? fromHistory : null;
  }, [customer, speedHistoryQuery.data]);

  const poolSpeedId = useMemo(() => {
    if (!customer) return null;
    if (customer.speedId) return customer.speedId;
    if (poolSpeedMbps) {
      return speedTiers.find((tier) => tier.valueMbps === poolSpeedMbps)?.id ?? null;
    }
    return null;
  }, [customer, poolSpeedMbps, speedTiers]);

  const canPickUsername = Boolean(poolSpeedId && poolSpeedMbps);

  if (isLoading) {
    return <LoadingState layout="default" variant="page" />;
  }

  if (isError || !customer) {
    return (
      <div className="space-y-4 rounded-xl border border-border p-6 text-center">
        <Text muted>
          {error instanceof ApiError ? error.message : t("customers.profile.notFound")}
        </Text>
        <div className="flex flex-wrap justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            {t("common.retry")}
          </Button>
          <Link to="/customers">
            <Button variant="ghost" size="sm">
              {t("customers.profile.backToList")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const stopped = isStoppedSubscriber(customer);
  const hasUsername = Boolean(customer.username);
  const expiring = hasUsername && isOnExpiringPage(customer);
  const onSubscribersList = hasUsername && isOnSubscribersList(customer);
  const owesMoney = customerOwesMoney(customer);
  const debtCleared = !owesMoney;
  const canAssignAfterStop = stopped && debtCleared && canManage;
  const showBalanceSection = true;

  const showError = (err: unknown) => {
    toast.error(err instanceof ApiError ? err.message : t("common.unexpectedError"));
  };

  const handleSave = async (values: CustomerProfileFormValues) => {
    try {
      await updateMutation.mutateAsync({
        id: customer.id,
        values: {
          fullName: values.fullName,
          facilityType: values.facilityType,
          phone: values.phone,
          packageLine: values.packageLine,
          notes: values.notes,
        },
      });
      toast.success(t("customers.form.updateSuccess"));
      refetch();
    } catch (err) {
      showError(err);
    }
  };

  const handleAssign = async (picked: PickedUsername) => {
    const wasStopped = stopped;
    try {
      await assignUsernameMutation.mutateAsync(picked.id);
      toast.success(
        wasStopped
          ? t("customers.profile.restoreSubscriberSuccess")
          : t("customers.profile.assignSuccess"),
      );
      setAssignOpen(false);
      await refetch();
      if (wasStopped) {
        navigate(subscriberProfilePath(customer.lineId, "stats"));
      }
    } catch (err) {
      showError(err);
    }
  };

  const handleRecordPayment = async (amount: number, paymentMethod: PaymentMethod, notes?: string) => {
    try {
      await createInvoiceMutation.mutateAsync({
        amount: 0,
        paidAmount: amount,
        paymentMethod,
        notes: notes ?? "",
      });
      toast.success(t("customers.form.updateSuccess"));
      await refetch();
      await invoicesQuery.refetch();
    } catch (err) {
      showError(err);
    }
  };

  return (
    <div className="space-y-6">
      <CustomerProfileHeader
        customer={customer}
        poolSpeedMbps={poolSpeedMbps}
        expiring={expiring}
        onSubscribersList={onSubscribersList}
        stoppedWithNoDebt={stopped && debtCleared}
      />

      {stopped ? (
        <section className="rounded-xl border border-border bg-muted/20 p-4 sm:p-6">
          <Heading as="h2" className="text-base font-semibold">
            {t("customers.profile.afterStoppedTitle")}
          </Heading>
          <Text className="mt-2 text-sm">{t("customers.profile.stoppedHint")}</Text>
          <Text muted className="mt-2 text-sm">
            {t("customers.balance.editProfileHint")}
          </Text>
          <Link
            to="/stopped"
            className="mt-3 inline-block text-sm font-medium text-foreground underline-offset-2 hover:underline"
          >
            {t("nav.items.stopped")}
          </Link>
        </section>
      ) : null}

      {showBalanceSection ? (
        <CustomerBalanceSection
          customer={customer}
          invoices={invoicesQuery.data ?? []}
          canManage={canManage}
          showRecordPayment={canManage}
          onRecordPayment={handleRecordPayment}
          isSubmitting={createInvoiceMutation.isPending}
        />
      ) : null}

      <CustomerProfileForm
        customer={customer}
        canManage={canManage}
        onSave={handleSave}
        isSubmitting={updateMutation.isPending}
      />

      {canAssignAfterStop ? (
        <section className="rounded-xl border border-border bg-surface p-4 sm:p-6">
          <Heading as="h2" className="text-base font-semibold">
            {t("customers.profile.assignSection")}
          </Heading>
          <Text muted className="mt-2 text-sm">
            {t("customers.balance.paidOff")} {t("customers.profile.assignHint")}
          </Text>
          <AssignSpeedDisplay
            speedMbps={poolSpeedMbps}
            canPick={canPickUsername}
            subscriberLineId={customer.lineId}
          />
          <Button
            className="mt-4"
            size="sm"
            variant="outline"
            onClick={() => setAssignOpen(true)}
            disabled={!canPickUsername}
          >
            {t("customers.profile.assignAction")}
          </Button>
        </section>
      ) : null}

      {!stopped && !hasUsername && canManage ? (
        <section className="rounded-xl border border-border bg-surface p-4 sm:p-6">
          <Heading as="h2" className="text-base font-semibold">
            {t("customers.profile.assignSection")}
          </Heading>
          <Text muted className="mt-2 text-sm">
            {t("customers.profile.assignHint")}
          </Text>
          <AssignSpeedDisplay
            speedMbps={poolSpeedMbps}
            canPick={canPickUsername}
            subscriberLineId={customer.lineId}
          />
          <Button
            className="mt-4"
            size="sm"
            variant="outline"
            onClick={() => setAssignOpen(true)}
            disabled={!canPickUsername}
          >
            {t("customers.profile.assignAction")}
          </Button>
        </section>
      ) : null}

      <AssignUsernameModal
        open={assignOpen}
        customer={customer}
        speedId={poolSpeedId}
        speedMbps={poolSpeedMbps ?? 0}
        onClose={() => setAssignOpen(false)}
        onAssign={handleAssign}
        isSubmitting={assignUsernameMutation.isPending}
      />
    </div>
  );
}

function AssignSpeedDisplay({
  speedMbps,
  canPick,
  subscriberLineId,
}: {
  speedMbps: number | null;
  canPick: boolean;
  subscriberLineId: string;
}) {
  const { t } = useTranslation();

  return (
    <div className="mt-4 rounded-lg border border-border bg-muted/20 px-4 py-3">
      <Text className="text-xs font-medium text-muted-foreground">
        {t("customers.assign.currentSpeed")}
      </Text>
      <Text className="mt-1 text-sm font-medium">
        {speedMbps ? buildSpeedLabel(speedMbps) : "—"}
      </Text>
      <Text muted className="mt-1 text-xs">
        {canPick
          ? t("customers.assign.speedReadOnlyHint")
          : t("customers.assign.speedMissingHint")}
      </Text>
      {!canPick ? (
        <Link
          to={subscriberProfilePath(subscriberLineId, "stats")}
          className="mt-2 inline-block text-xs font-medium text-foreground underline-offset-2 hover:underline"
        >
          {t("customers.assign.openSubscriberProfile")}
        </Link>
      ) : null}
    </div>
  );
}
