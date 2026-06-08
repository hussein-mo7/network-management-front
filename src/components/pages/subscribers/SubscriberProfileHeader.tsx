import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SubscriberStatusBadge } from "@/components/pages/subscribers/SubscriberStatusBadge";
import { Button } from "@/components/ui/buttons";
import { Heading, Text } from "@/components/ui/typography";
import {
  buildSpeedLabel,
  getSubscriberInitials,
  getSubscriberLifecycleStatus,
} from "@/lib/subscriberUtils";
import type { Subscriber } from "@/types/subscriber";

interface SubscriberProfileHeaderProps {
  subscriber: Subscriber;
  onStop?: () => void;
  canManage?: boolean;
  isStopping?: boolean;
  backTo?: string;
  backLabel?: string;
}

export function SubscriberProfileHeader({
  subscriber,
  onStop,
  canManage = false,
  isStopping = false,
  backTo,
  backLabel,
}: SubscriberProfileHeaderProps) {
  const { t } = useTranslation();
  const lifecycle = getSubscriberLifecycleStatus(subscriber);
  const listStatus =
    lifecycle === "suspended"
      ? "suspended"
      : lifecycle === "active" || lifecycle === "no_subscription"
        ? lifecycle
        : "active";
  const backHref = backTo ?? (subscriber.isSuspended ? "/stopped" : "/subscribers");
  const backText =
    backLabel ??
    (subscriber.isSuspended ? t("subscribers.profile.backToStopped") : t("subscribers.profile.backToList"));
  const initials = getSubscriberInitials(subscriber.fullName);

  return (
    <div className="space-y-4">
      <Link
        to={backHref}
        className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {backText}
      </Link>

      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 text-sm font-medium text-foreground">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Heading as="h1" className="text-xl sm:text-2xl">
                {subscriber.fullName}
              </Heading>
              <SubscriberStatusBadge status={listStatus} />
            </div>
            <Text muted className="mt-1 font-mono text-sm" dir="ltr">
              {subscriber.lineId}
            </Text>
            <Text muted className="mt-2 text-sm">
              {buildSpeedLabel(subscriber.speedMbps)} · {subscriber.facilityType}
              {subscriber.username ? ` · ${subscriber.username}` : ` · ${t("subscribers.profile.noUsername")}`}
              {subscriber.phone ? ` · ${subscriber.phone}` : ""}
            </Text>
          </div>
        </div>

        {canManage && lifecycle === "active" && subscriber.username ? (
          <Button
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={onStop}
            isLoading={isStopping}
            disabled={isStopping}
          >
            {t("subscribers.profile.stopSubscriber")}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
