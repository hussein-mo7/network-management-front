import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";

interface SubscriptionFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  speedMbps: number | "all";
  onSpeedChange: (value: number | "all") => void;
  speedOptions: number[];
  className?: string;
}

/** Active subscriptions list — search + speed only */
export function SubscriptionFilters({
  search,
  onSearchChange,
  speedMbps,
  onSpeedChange,
  speedOptions,
  className,
}: SubscriptionFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between", className)}>
      <div className="relative max-w-md flex-1">
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

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">{t("subscribers.filters.speed")}</span>
        <button
          type="button"
          onClick={() => onSpeedChange("all")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
            speedMbps === "all"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {t("common.all")}
        </button>
        {speedOptions.map((mbps) => (
          <button
            key={mbps}
            type="button"
            onClick={() => onSpeedChange(mbps)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              speedMbps === mbps
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {mbps}M
          </button>
        ))}
      </div>
    </div>
  );
}
