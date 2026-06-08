import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import type { InvoiceFormValues } from "@/components/pages/subscribers/InvoiceFormModal";
import {
  SubscriberInvoicesTab,
  SubscriberProfileHeader,
  PickAvailableUsernameModal,
  SubscriberProfileTabs,
  SubscriberStatsTab,
  SubscriberUsernameTab,
  type SubscriberProfileTab,
} from "@/components/pages/subscribers";
import { useSpeedsQuery } from "@/hooks/useSpeeds";
import { ConfirmDialog } from "@/components/ui/modals";
import { Button } from "@/components/ui/buttons";
import { LoadingState } from "@/components/ui/feedback";
import { Text } from "@/components/ui/typography";
import { buttonBaseClassName, buttonSizes, buttonVariants } from "@/components/ui/buttons/buttonStyles";
import {
  useSubscriberInvoiceMutations,
  useSubscriberInvoicesQuery,
  useSubscriberProfileMutations,
  useSubscriberProfileQuery,
  useSubscriberSpeedHistoryQuery,
  useSubscriberUsernameHistoryQuery,
} from "@/hooks/useSubscribers";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { ApiError } from "@/types/api";
import type { Subscriber } from "@/types/subscriber";
import { cn } from "@/lib/cn";

export function SubscriberProfilePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { subscriberId: subscriberIdParam } = useParams<{ subscriberId: string }>();
  const subscriberId = Number(subscriberIdParam);
  const { canManage, canViewPasswords } = useRoleAccess();

  const [activeTab, setActiveTab] = useState<SubscriberProfileTab>("stats");
  const [stopDialogOpen, setStopDialogOpen] = useState(false);
  const [pickUsernameOpen, setPickUsernameOpen] = useState(false);
  const [assignSpeedId, setAssignSpeedId] = useState<number | null>(null);
  const { data: speedTiers = [] } = useSpeedsQuery();

  const profileQuery = useSubscriberProfileQuery(subscriberId, Number.isFinite(subscriberId));
  const lineId = profileQuery.data?.subscriber.lineId ?? "";

  const invoicesQuery = useSubscriberInvoicesQuery(subscriberId, lineId);
  const usernameHistoryQuery = useSubscriberUsernameHistoryQuery(subscriberId, lineId);
  const speedHistoryQuery = useSubscriberSpeedHistoryQuery(subscriberId, lineId);

  const { updateMutation, stopMutation, assignUsernameMutation } =
    useSubscriberProfileMutations(subscriberId);
  const { createMutation, deleteMutation } = useSubscriberInvoiceMutations(subscriberId, lineId);

  const subscriber = profileQuery.data?.subscriber;
  const daysGone = profileQuery.data?.daysGone ?? null;
  const daysRemaining = profileQuery.data?.daysRemaining ?? null;

  const resolvedSpeedId = useMemo(() => {
    if (!subscriber) return null;
    if (subscriber.speedId) return subscriber.speedId;
    return speedTiers.find((t) => t.valueMbps === subscriber.speedMbps)?.id ?? null;
  }, [subscriber, speedTiers]);

  useEffect(() => {
    if (!subscriber?.isSuspended) return;
    setActiveTab("username");
    setAssignSpeedId(resolvedSpeedId ?? speedTiers[0]?.id ?? null);
  }, [subscriber?.id, subscriber?.isSuspended, resolvedSpeedId, speedTiers]);

  const isSubmitting =
    updateMutation.isPending ||
    stopMutation.isPending ||
    assignUsernameMutation.isPending ||
    createMutation.isPending ||
    deleteMutation.isPending;

  const showError = (err: unknown) => {
    const message =
      err instanceof ApiError
        ? err.message
        : err instanceof Error
          ? err.message
          : t("common.unexpectedError");
    toast.error(message);
  };

  const handleSave = async (patch: Partial<Subscriber>) => {
    try {
      await updateMutation.mutateAsync(patch);
      const hadPasswordChange = patch.password !== undefined;
      toast.success(
        hadPasswordChange
          ? t("subscribers.username.passwordUpdated")
          : t("subscribers.form.updateSuccess"),
      );
    } catch (err) {
      showError(err);
    }
  };

  const handleAddInvoice = async (values: InvoiceFormValues) => {
    try {
      await createMutation.mutateAsync(values);
      toast.success(t("subscribers.invoices.createSuccess"));
    } catch (err) {
      showError(err);
    }
  };

  const handleDeleteInvoice = async (invoiceId: number) => {
    try {
      await deleteMutation.mutateAsync(invoiceId);
      toast.success(t("subscribers.invoices.deleteSuccess"));
    } catch (err) {
      showError(err);
    }
  };

  const handleStop = async () => {
    try {
      await stopMutation.mutateAsync();
      toast.success(t("subscribers.profile.stopSuccess"));
      setStopDialogOpen(false);
      navigate("/stopped");
    } catch (err) {
      showError(err);
    }
  };

  if (!Number.isFinite(subscriberId) || subscriberId <= 0) {
    return <Navigate to="/subscribers" replace />;
  }

  if (profileQuery.isLoading) {
    return <LoadingState layout="default" variant="page" />;
  }

  if (profileQuery.isError || !subscriber) {
    return (
      <div className="space-y-4 py-12 text-center">
        <Text muted>
          {profileQuery.error instanceof ApiError
            ? profileQuery.error.message
            : t("subscribers.profile.notFound")}
        </Text>
        <Button variant="outline" size="sm" onClick={() => profileQuery.refetch()}>
          {t("common.retry")}
        </Button>
        <Link to="/subscribers" className={cn(buttonBaseClassName, buttonVariants.outline, buttonSizes.sm)}>
          {t("subscribers.profile.backToList")}
        </Link>
      </div>
    );
  }

  const handleAssignUsername = async (picked: { id: number }) => {
    try {
      await assignUsernameMutation.mutateAsync(picked.id);
      toast.success(
        subscriber?.isSuspended
          ? t("subscribers.username.reactivateSuccess")
          : t("subscribers.username.changeSuccess"),
      );
      setPickUsernameOpen(false);
      if (subscriber?.isSuspended) {
        navigate("/subscribers");
      }
    } catch (err) {
      showError(err);
    }
  };

  return (
    <div className="space-y-6">
      <SubscriberProfileHeader
        subscriber={subscriber}
        canManage={canManage}
        onStop={subscriber.isSuspended ? undefined : () => setStopDialogOpen(true)}
        isStopping={stopMutation.isPending}
      />

      <SubscriberProfileTabs active={activeTab} onChange={setActiveTab} />

      <div>
        {activeTab === "stats" ? (
          <SubscriberStatsTab
            subscriber={subscriber}
            canManage={canManage}
            canViewPasswords={canViewPasswords}
            daysGone={daysGone}
            daysRemaining={daysRemaining}
            onSave={canManage ? handleSave : undefined}
            isSubmitting={isSubmitting}
          />
        ) : null}

        {activeTab === "invoices" ? (
          <SubscriberInvoicesTab
            invoices={invoicesQuery.data ?? []}
            balance={subscriber.balance}
            canManage={canManage}
            monthlyPrice={subscriber.monthlyPrice}
            onAddInvoice={canManage ? handleAddInvoice : undefined}
            onDeleteInvoice={canManage ? handleDeleteInvoice : undefined}
          />
        ) : null}

        {activeTab === "username" ? (
          <SubscriberUsernameTab
            usernameHistory={usernameHistoryQuery.data ?? []}
            speedHistory={speedHistoryQuery.data ?? []}
            canManage={canManage}
            isStopped={subscriber.isSuspended}
            currentUsername={subscriber.username}
            showAssign={subscriber.isSuspended && canManage}
            showChange={!subscriber.isSuspended && Boolean(subscriber.username)}
            speedTiers={speedTiers}
            assignSpeedId={assignSpeedId}
            onAssignSpeedChange={setAssignSpeedId}
            onPickUsername={() => setPickUsernameOpen(true)}
          />
        ) : null}
      </div>

      <PickAvailableUsernameModal
        open={pickUsernameOpen}
        onClose={() => setPickUsernameOpen(false)}
        title={
          subscriber.isSuspended
            ? t("subscribers.username.assignTitle")
            : t("subscribers.username.changeTitle")
        }
        hint={
          subscriber.isSuspended
            ? t("subscribers.username.assignHint")
            : t("subscribers.username.changeModalHint")
        }
        speedMbps={
          speedTiers.find((t) => t.id === assignSpeedId)?.valueMbps ??
          (subscriber.speedMbps || speedTiers[0]?.valueMbps || 4)
        }
        packageLine={
          speedTiers.find((t) => t.id === assignSpeedId)?.valueMbps ??
          (subscriber.packageLine || subscriber.speedMbps || speedTiers[0]?.valueMbps || 4)
        }
        speedId={assignSpeedId ?? resolvedSpeedId ?? speedTiers[0]?.id ?? null}
        excludeUsername={subscriber.username}
        onConfirm={handleAssignUsername}
        isSubmitting={assignUsernameMutation.isPending}
      />

      <ConfirmDialog
        open={stopDialogOpen}
        onClose={() => setStopDialogOpen(false)}
        onConfirm={handleStop}
        title={t("subscribers.profile.stopTitle")}
        message={t("subscribers.profile.stopMessage", { name: subscriber.fullName })}
        confirmLabel={t("subscribers.profile.stopConfirm")}
        cancelLabel={t("common.cancel")}
        isLoading={isSubmitting}
        variant="danger"
      />
    </div>
  );
}
