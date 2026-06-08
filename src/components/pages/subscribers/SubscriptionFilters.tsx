import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { SubscriberListStatusFilter } from "@/lib/subscriberUtils";
import { cn } from "@/lib/cn";

interface SubscriptionFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: SubscriberListStatusFilter;
  onStatusChange: (value: SubscriberListStatusFilter) => void;
  speedMbps: number | "all";
  onSpeedChange: (value: number | "all") => void;
  speedOptions: number[];
  className?: string;
}

const STATUS_FILTERS: SubscriberListStatusFilter[] = ["all", "active", "paused", "no_subscription"];

/** Active subscriptions list — search, status, speed */
export function SubscriptionFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  speedMbps,
  onSpeedChange,
  speedOptions,
  className,
}: SubscriptionFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("subscribers.filters.searchPlaceholder")}
          className={cn(
            "flex h-10 w-full rounded-lg border border-border bg-background ps-10 pe-3 text-sm",
            "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border",
          )}
          aria-label={t("subscribers.filters.search")}
        />
      </div>

      <div className="space-y-3 border-t border-border pt-4">
        <FilterRow label={t("subscribers.filters.status")}>
          {STATUS_FILTERS.map((value) => (
            <FilterChip
              key={value}
              active={status === value}
              onClick={() => onStatusChange(value)}
              label={t(`subscribers.filters.status_${value}`)}
            />
          ))}
        </FilterRow>

        <FilterRow label={t("subscribers.filters.speed")}>
          <FilterChip
            active={speedMbps === "all"}
            onClick={() => onSpeedChange("all")}
            label={t("common.all")}
          />
          {speedOptions.map((mbps) => (
            <FilterChip
              key={mbps}
              active={speedMbps === mbps}
              onClick={() => onSpeedChange(mbps)}
              label={`${mbps}M`}
            />
          ))}
        </FilterRow>
      </div>
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <span className="shrink-0 text-xs font-medium text-muted-foreground sm:w-16">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
