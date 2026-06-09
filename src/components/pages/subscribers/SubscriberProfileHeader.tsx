import { Building2, Gauge, HardDrive, Hash, Phone, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SubscriberStatusBadge } from "@/components/pages/subscribers/SubscriberStatusBadge";
import { Button } from "@/components/ui/buttons";
import { ProfileHero } from "@/components/ui/profile";
import { DataUsageDisplay } from "@/components/ui/data";
import { resolveUsageLimitMb } from "@/lib/speedFairUsage";
import {
  buildSpeedLabel,
  getSubscriberInitials,
  getSubscriberLifecycleStatus,
  getSubscriberListStatus,
} from "@/lib/subscriberUtils";
import type { Subscriber } from "@/types/subscriber";

interface SubscriberProfileHeaderProps {
  subscriber: Subscriber;
  onStop?: () => void;
  onPause?: () => void;
  onUnpause?: () => void;
  canManage?: boolean;
  isStopping?: boolean;
  isPausing?: boolean;
  backTo?: string;
  backLabel?: string;
}

export function SubscriberProfileHeader({
  subscriber,
  onStop,
  onPause,
  onUnpause,
  canManage = false,
  isStopping = false,
  isPausing = false,
  backTo,
  backLabel,
}: SubscriberProfileHeaderProps) {
  const { t } = useTranslation();
  const lifecycle = getSubscriberLifecycleStatus(subscriber);
  const listStatus = getSubscriberListStatus(subscriber);
  const backHref = backTo ?? (subscriber.isSuspended ? "/stopped" : "/subscribers");
  const backText =
    backLabel ??
    (subscriber.isSuspended ? t("subscribers.profile.backToStopped") : t("subscribers.profile.backToList"));
  const initials = getSubscriberInitials(subscriber.fullName);
  const showPause =
    canManage && lifecycle === "active" && Boolean(subscriber.username) && !subscriber.isPaused;
  const showUnpause =
    canManage && lifecycle === "active" && Boolean(subscriber.username) && subscriber.isPaused;
  const showStop = canManage && lifecycle === "active" && Boolean(subscriber.username);
  const usedMb = subscriber.totalUsage ?? 0;
  const limitMb = resolveUsageLimitMb(
    subscriber.usageLimit,
    subscriber.speedMbps,
    subscriber.speedId ?? undefined,
  );
  const showUsage = Boolean(subscriber.username && (usedMb > 0 || limitMb != null));

  const actions =
    showPause || showUnpause || showStop ? (
      <>
        {showPause ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onPause}
            isLoading={isPausing}
            disabled={isPausing || isStopping}
          >
            {t("subscribers.profile.pauseSubscriber")}
          </Button>
        ) : null}
        {showUnpause ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onUnpause}
            isLoading={isPausing}
            disabled={isPausing || isStopping}
          >
            {t("subscribers.profile.unpauseSubscriber")}
          </Button>
        ) : null}
        {showStop ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onStop}
            isLoading={isStopping}
            disabled={isStopping || isPausing}
          >
            {t("subscribers.profile.stopSubscriber")}
          </Button>
        ) : null}
      </>
    ) : undefined;

  return (
    <ProfileHero
      backTo={backHref}
      backLabel={backText}
      initials={initials}
      name={subscriber.fullName}
      badge={<SubscriberStatusBadge status={listStatus} />}
      actions={actions}
      items={[
        {
          icon: Hash,
          label: t("subscribers.table.lineId"),
          value: subscriber.lineId,
          dir: "ltr",
          mono: true,
        },
        {
          icon: User,
          label: t("subscribers.table.username"),
          value: subscriber.username ?? t("subscribers.profile.noUsername"),
          dir: subscriber.username ? "ltr" : undefined,
          mono: Boolean(subscriber.username),
          valueClassName: subscriber.username ? undefined : "text-muted-foreground font-normal",
        },
        {
          icon: Phone,
          label: t("subscribers.table.phone"),
          value: subscriber.phone?.trim() || "—",
          dir: subscriber.phone ? "ltr" : undefined,
          mono: Boolean(subscriber.phone),
          valueClassName: subscriber.phone ? undefined : "text-muted-foreground font-normal",
        },
        {
          icon: Gauge,
          label: t("subscribers.table.speed"),
          value: subscriber.speedMbps > 0 ? buildSpeedLabel(subscriber.speedMbps) : "—",
          valueClassName: subscriber.speedMbps > 0 ? undefined : "text-muted-foreground font-normal",
        },
        {
          icon: Building2,
          label: t("subscribers.form.facilityType"),
          value: subscriber.facilityType?.trim() || "—",
          valueClassName: subscriber.facilityType ? undefined : "text-muted-foreground font-normal",
        },
        {
          icon: HardDrive,
          label: t("subscribers.profile.stats.dataUsage"),
          value: showUsage ? (
            <DataUsageDisplay usedMb={usedMb} limitMb={limitMb} size="sm" />
          ) : (
            "—"
          ),
        },
      ]}
    />
  );
}
