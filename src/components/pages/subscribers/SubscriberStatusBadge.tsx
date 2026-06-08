import { useTranslation } from "react-i18next";
import type { SubscriberLifecycleStatus } from "@/types/subscriber";
import { cn } from "@/lib/cn";

/** Muted status labels for the active subscribers list (no stopped / موقوف) */
interface SubscriberStatusBadgeProps {
  status: Extract<SubscriberLifecycleStatus, "active" | "no_subscription" | "suspended">;
}

export function SubscriberStatusBadge({ status }: SubscriberStatusBadgeProps) {
  const { t } = useTranslation();

  return (
    <span
      className={cn(
        "inline-flex rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground",
        (status === "active" || status === "suspended") && "text-foreground",
        status === "suspended" && "border-warning/40 text-warning",
      )}
    >
      {t(`subscribers.status.${status}`)}
    </span>
  );
}
