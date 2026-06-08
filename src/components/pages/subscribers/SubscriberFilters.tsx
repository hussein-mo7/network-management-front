import { useTranslation } from "react-i18next";
import { FilterChipBar, SearchField } from "@/components/ui/data";
import type { SubscriberListStatusFilter } from "@/lib/subscriberUtils";
import { cn } from "@/lib/cn";

export type SubscriberStatusFilter = SubscriberListStatusFilter;

interface SubscriberFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: SubscriberStatusFilter;
  onStatusChange: (value: SubscriberStatusFilter) => void;
  speedMbps: number | "all";
  onSpeedChange: (value: number | "all") => void;
  speedOptions: number[];
  className?: string;
}

export function SubscriberFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  speedMbps,
  onSpeedChange,
  speedOptions,
  className,
}: SubscriberFiltersProps) {
  const { t } = useTranslation();

  const statusFilters: SubscriberStatusFilter[] = ["all", "active", "no_subscription"];

  return (
    <div className={cn("space-y-4", className)}>
      <SearchField
        value={search}
        onChange={onSearchChange}
        placeholder={t("subscribers.filters.searchPlaceholder")}
        ariaLabel={t("subscribers.filters.search")}
      />

      <div className="space-y-4 border-t border-border pt-4">
        <FilterChipBar
          label={t("subscribers.filters.status")}
          value={status}
          onChange={(id) => onStatusChange(id as SubscriberStatusFilter)}
          options={statusFilters.map((value) => ({
            id: value,
            label: t(`subscribers.filters.status_${value}`),
          }))}
        />

        <FilterChipBar
          label={t("subscribers.filters.speed")}
          value={speedMbps === "all" ? "all" : String(speedMbps)}
          onChange={(id) => onSpeedChange(id === "all" ? "all" : Number(id))}
          options={[
            { id: "all", label: t("common.all") },
            ...speedOptions.map((mbps) => ({
              id: String(mbps),
              label: `${mbps}M`,
            })),
          ]}
        />
      </div>
    </div>
  );
}
