import { useMemo, useState } from "react";
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
} from "@/components/pages/subscribers";
import { parseSubscriberProfileTab, subscriberProfilePath } from "@/lib/routePaths";
import { useSpeedsQuery } from "@/hooks/useSpeeds";
import { ConfirmDialog } from "@/components/ui/modals";
import { Button } from "@/components/ui/buttons";
import { LoadingState } from "@/components/ui/feedback";
import { Text } from "@/components/ui/typography";
import { buttonBaseClassName, buttonSizes, buttonVariants } from "@/components/ui/buttons/buttonStyles";
import {
  useSubscriberByLineIdQuery,
  useSubscriberInvoiceMutations,
  useSubscriberInvoicesQuery,
  useSubscriberProfileMutations,
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
  const { lineId: lineIdParam, tab: tabParam } = useParams<{
    lineId: string;
    tab?: string;
  }>();
  const decodedLineId = lineIdParam ? decodeURIComponent(lineIdParam) : "";
  const parsedTab = parseSubscriberProfileTab(tabParam);
  const { canManage, canViewPasswords } = useRoleAccess();
  const [stopDialogOpen, setStopDialogOpen] = useState(false);
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const [unpauseDialogOpen, setUnpauseDialogOpen] = useState(false);
  const [pickUsernameOpen, setPickUsernameOpen] = useState(false);
  const { data: speedTiers = [] } = useSpeedsQuery();

  const profileQuery = useSubscriberByLineIdQuery(decodedLineId, Boolean(decodedLineId));

  const subscriber = profileQuery.data?.subscriber;
  const subscriberId = subscriber?.id ?? 0;
  const lineId = subscriber?.lineId ?? decodedLineId;

  const invoicesQuery = useSubscriberInvoicesQuery(subscriberId, lineId);
  const usernameHistoryQuery = useSubscriberUsernameHistoryQuery(subscriberId, lineId);
  const speedHistoryQuery = useSubscriberSpeedHistoryQuery(subscriberId, lineId);

  const { updateMutation, stopMutation, pauseMutation, assignUsernameMutation } =
    useSubscriberProfileMutations(subscriberId);
  const { createMutation, deleteMutation } = useSubscriberInvoiceMutations(subscriberId, lineId);
  const daysGone = profileQuery.data?.daysGone ?? null;
  const daysRemaining = profileQuery.data?.daysRemaining ?? null;

  const resolvedSpeedId = useMemo(() => {
    if (!subscriber) return null;
    if (subscriber.speedId) return subscriber.speedId;
    return speedTiers.find((t) => t.valueMbps === subscriber.speedMbps)?.id ?? null;
  }, [subscriber, speedTiers]);

  const poolSpeedMbps = useMemo(() => {
    if (!subscriber) return null;
    if (subscriber.speedMbps) return subscriber.speedMbps;
    const fromHistory = speedHistoryQuery.data?.[0]?.newSpeedMbps;
    return fromHistory && fromHistory > 0 ? fromHistory : null;
  }, [subscriber, speedHistoryQuery.data]);

  const poolSpeedId = useMemo(() => {
    if (resolvedSpeedId) return resolvedSpeedId;
    if (!poolSpeedMbps) return null;
    return speedTiers.find((tier) => tier.valueMbps === poolSpeedMbps)?.id ?? null;
  }, [resolvedSpeedId, poolSpeedMbps, speedTiers]);

  const isSubmitting =
    updateMutation.isPending ||
    stopMutation.isPending ||
    assignUsernameMutation.isPending ||
    createMutation.isPending ||
    deleteMutation.isPending ||
    pauseMutation.isPending;

  const showError = (err: unknown) => {
    const message =
      err instanceof ApiError
        ? err.message
        : err instanceof Error
          ? err.message
          : t("common.unexpectedError");
    toast.error(message);
  };

  const handleSave = async (patch: Partial<Subscriber> & { speedId?: number }) => {
    if (!subscriber) return;
    const previousLineId = subscriber.lineId;
    try {
      const updated = await updateMutation.mutateAsync(patch);
      const hadPasswordChange = patch.password !== undefined;
      const hadSpeedChange = patch.speedId !== undefined;
      const hadLineChange = patch.packageLine !== undefined;
      toast.success(
        hadPasswordChange
          ? t("subscribers.username.passwordUpdated")
          : hadSpeedChange
            ? t("subscribers.profile.speedUpdateSuccess")
            : t("subscribers.form.updateSuccess"),
      );
      if (hadSpeedChange) {
        await speedHistoryQuery.refetch();
      }
      if (hadLineChange && updated.lineId !== previousLineId) {
        navigate(subscriberProfilePath(updated.lineId, parsedTab ?? "stats"), { replace: true });
      }
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

  const handlePause = async () => {
    try {
      await pauseMutation.mutateAsync(true);
      toast.success(t("subscribers.profile.pauseSuccess"));
      setPauseDialogOpen(false);
    } catch (err) {
      showError(err);
    }
  };

  const handleUnpause = async () => {
    try {
      await pauseMutation.mutateAsync(false);
      toast.success(t("subscribers.profile.unpauseSuccess"));
      setUnpauseDialogOpen(false);
    } catch (err) {
      showError(err);
    }
  };

  if (!decodedLineId) {
    return <Navigate to="/subscribers" replace />;
  }

  if (profileQuery.isLoading) {
    return <LoadingState layout="default" variant="page" />;
  }

  if (!tabParam && subscriber) {
    return (
      <Navigate
        to={subscriberProfilePath(lineId, subscriber.isSuspended ? "username" : "stats")}
        replace
      />
    );
  }

  if (tabParam && !parsedTab) {
    return (
      <Navigate
        to={subscriberProfilePath(subscriber?.lineId ?? decodedLineId, "stats")}
        replace
      />
    );
  }

  const activeTab = parsedTab ?? "stats";

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
        navigate(subscriberProfilePath(lineId, "stats"));
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
        onPause={subscriber.isSuspended ? undefined : () => setPauseDialogOpen(true)}
        onUnpause={subscriber.isSuspended ? undefined : () => setUnpauseDialogOpen(true)}
        isStopping={stopMutation.isPending}
        isPausing={pauseMutation.isPending}
      />

      <SubscriberProfileTabs lineId={lineId} />

      <div>
        {activeTab === "stats" ? (
          <SubscriberStatsTab
            subscriber={subscriber}
            speedTiers={speedTiers}
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
            poolSpeedMbps={poolSpeedMbps}
            poolSpeedId={poolSpeedId}
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
        speedMbps={poolSpeedMbps ?? subscriber.speedMbps ?? 0}
        packageLine={poolSpeedMbps ?? subscriber.packageLine ?? subscriber.speedMbps ?? 0}
        speedId={poolSpeedId}
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

      <ConfirmDialog
        open={pauseDialogOpen}
        onClose={() => setPauseDialogOpen(false)}
        onConfirm={handlePause}
        title={t("subscribers.profile.pauseTitle")}
        message={t("subscribers.profile.pauseMessage", { name: subscriber.fullName })}
        confirmLabel={t("subscribers.profile.pauseConfirm")}
        cancelLabel={t("common.cancel")}
        isLoading={pauseMutation.isPending}
        variant="default"
      />

      <ConfirmDialog
        open={unpauseDialogOpen}
        onClose={() => setUnpauseDialogOpen(false)}
        onConfirm={handleUnpause}
        title={t("subscribers.profile.unpauseTitle")}
        message={t("subscribers.profile.unpauseMessage", { name: subscriber.fullName })}
        confirmLabel={t("subscribers.profile.unpauseConfirm")}
        cancelLabel={t("common.cancel")}
        isLoading={pauseMutation.isPending}
        variant="default"
      />
    </div>
  );
}
