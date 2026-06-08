import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  AssignUsernameModal,
  CustomerBalanceSection,
  CustomerKindBadge,
  CustomerProfileForm,
  type CustomerProfileFormValues,
} from "@/components/pages/customers";
import { SpeedTierPicker } from "@/components/pages/speeds";
import type { PickedUsername } from "@/components/pages/subscribers/PickAvailableUsernameModal";
import { Button } from "@/components/ui/buttons";
import { LoadingState } from "@/components/ui/feedback";
import { Heading, Text } from "@/components/ui/typography";
import { useCustomerByLineIdQuery, useCustomerMutations } from "@/hooks/useCustomers";
import {
  useSubscriberInvoiceMutations,
  useSubscriberInvoicesQuery,
  useSubscriberProfileMutations,
} from "@/hooks/useSubscribers";
import { useSpeedsQuery } from "@/hooks/useSpeeds";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import {
  customerOwesMoney,
  getCustomerKind,
  isOnSubscribersList,
} from "@/lib/customerUtils";
import { isOnExpiringPage } from "@/lib/expiringUtils";
import { getSubscriberInitials, isStoppedSubscriber } from "@/lib/subscriberUtils";
import { ApiError } from "@/types/api";
import type { PaymentMethod } from "@/types/subscriber";

export function CustomerProfilePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { canManage } = useRoleAccess();
  const { lineId } = useParams<{ lineId: string }>();
  const decodedLineId = lineId ? decodeURIComponent(lineId) : "";

  const [assignOpen, setAssignOpen] = useState(false);
  const [assignSpeedId, setAssignSpeedId] = useState<number | null>(null);

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

  useEffect(() => {
    if (!speedTiers.length) return;
    if (customer?.speedId) {
      setAssignSpeedId(customer.speedId);
      return;
    }
    if (customer?.speedMbps) {
      const match = speedTiers.find((tier) => tier.valueMbps === customer.speedMbps);
      setAssignSpeedId(match?.id ?? speedTiers[0].id);
      return;
    }
    setAssignSpeedId(speedTiers[0].id);
  }, [customer?.id, customer?.speedId, customer?.speedMbps, speedTiers]);

  const assignSpeedTier = useMemo(
    () => speedTiers.find((tier) => tier.id === assignSpeedId) ?? speedTiers[0] ?? null,
    [assignSpeedId, speedTiers],
  );

  if (isLoading) {
    return <LoadingState layout="default" variant="page" />;
  }

  if (isError || !customer) {
    if (!isLoading && !customer) {
      return <Navigate to="/customers" replace />;
    }
    return (
      <div className="rounded-xl border border-border p-6 text-center">
        <Text muted>{error instanceof ApiError ? error.message : t("common.unexpectedError")}</Text>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
          {t("common.retry")}
        </Button>
      </div>
    );
  }

  const initials = getSubscriberInitials(customer.fullName);
  const kind = getCustomerKind(customer);
  const stopped = isStoppedSubscriber(customer);
  const hasUsername = Boolean(customer.username);
  const expiring = hasUsername && isOnExpiringPage(customer);
  const onSubscribersList = hasUsername && isOnSubscribersList(customer);
  const owesMoney = customerOwesMoney(customer);
  const debtCleared = !owesMoney;
  const canAssignAfterStop = stopped && debtCleared && canManage;
  const showBalanceSection = !stopped || owesMoney;

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
        navigate(`/subscribers/${customer.id}`);
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
      <Link
        to="/customers"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        {t("customers.profile.backToList")}
      </Link>

      <div className="flex items-start gap-4 border-b border-border pb-6">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border text-sm font-medium text-muted-foreground">
          {initials}
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Heading as="h1" className="text-xl">
              {customer.fullName}
            </Heading>
            <CustomerKindBadge kind={kind} />
          </div>
          <Text muted className="mt-1 font-mono text-sm" dir="ltr">
            {customer.lineId}
          </Text>
          {owesMoney ? (
            <Text muted className="mt-2 text-sm">
              {t("customers.profile.balanceOwed")}:{" "}
              <span className="font-medium text-foreground">{customer.balance}</span>
            </Text>
          ) : stopped && debtCleared ? (
            <Text muted className="mt-2 text-sm">{t("customers.profile.stoppedNoDebt")}</Text>
          ) : null}
        </div>
      </div>

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
          showRecordPayment={owesMoney}
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
          {speedTiers.length > 0 ? (
            <div className="mt-4 space-y-2">
              <Text className="text-xs font-medium text-muted-foreground">
                {t("customers.assign.pickSpeed")}
              </Text>
              <SpeedTierPicker
                tiers={speedTiers}
                selectedId={assignSpeedId ?? speedTiers[0].id}
                onSelect={(tier) => setAssignSpeedId(tier.id)}
              />
            </div>
          ) : (
            <Text muted className="mt-4 text-sm">{t("customers.assign.noSpeedTiers")}</Text>
          )}
          <Button
            className="mt-4"
            size="sm"
            variant="outline"
            onClick={() => setAssignOpen(true)}
            disabled={!assignSpeedId && speedTiers.length > 0}
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
          {speedTiers.length > 0 ? (
            <div className="mt-4 space-y-2">
              <Text className="text-xs font-medium text-muted-foreground">
                {t("customers.assign.pickSpeed")}
              </Text>
              <SpeedTierPicker
                tiers={speedTiers}
                selectedId={assignSpeedId ?? speedTiers[0].id}
                onSelect={(tier) => setAssignSpeedId(tier.id)}
              />
            </div>
          ) : (
            <Text muted className="mt-4 text-sm">{t("customers.assign.noSpeedTiers")}</Text>
          )}
          <Button
            className="mt-4"
            size="sm"
            variant="outline"
            onClick={() => setAssignOpen(true)}
            disabled={!assignSpeedId && speedTiers.length > 0}
          >
            {t("customers.profile.assignAction")}
          </Button>
        </section>
      ) : null}

      {!stopped && hasUsername ? (
        <section className="rounded-xl border border-border bg-muted/20 p-4 sm:p-6">
          {expiring ? (
            <Text muted className="text-sm">
              {t("customers.profile.expiringHint")}{" "}
              <Link to="/expiring" className="font-medium text-foreground underline-offset-2 hover:underline">
                {t("nav.items.expiring")}
              </Link>
            </Text>
          ) : onSubscribersList ? (
            <>
              <Text muted className="text-sm">
                {t("customers.profile.subscriberHint")}
              </Text>
              <Link
                to={`/subscribers/${customer.id}`}
                className="mt-3 inline-flex text-sm font-medium text-foreground underline-offset-2 hover:underline"
              >
                {t("customers.actions.viewSubscription")}
              </Link>
            </>
          ) : null}
        </section>
      ) : null}

      <AssignUsernameModal
        open={assignOpen}
        customer={customer}
        speedId={assignSpeedId}
        speedMbps={assignSpeedTier?.valueMbps ?? 0}
        onClose={() => setAssignOpen(false)}
        onAssign={handleAssign}
        isSubmitting={assignUsernameMutation.isPending}
      />
    </div>
  );
}
