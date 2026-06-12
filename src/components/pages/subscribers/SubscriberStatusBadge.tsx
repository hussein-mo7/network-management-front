import { PauseCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { SubscriberLifecycleStatus } from "@/types/subscriber";
import { cn } from "@/lib/cn";

/** Muted status labels for the active subscribers list (no stopped / موقوف) */
interface SubscriberStatusBadgeProps {
  status: Extract<SubscriberLifecycleStatus, "active" | "no_subscription" | "suspended"> | "paused";
}

export function SubscriberStatusBadge({ status }: SubscriberStatusBadgeProps) {
  const { t } = useTranslation();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground",
        (status === "active" || status === "suspended") && "text-foreground",
        status === "suspended" && "border-danger/40 bg-danger/10 text-danger",
        status === "paused" && "border-danger/40 bg-danger/10 text-danger",
      )}
    >
      {status === "paused" ? <PauseCircle className="h-3 w-3 shrink-0" /> : null}
      {t(`subscribers.status.${status}`)}
    </span>
  );
}
