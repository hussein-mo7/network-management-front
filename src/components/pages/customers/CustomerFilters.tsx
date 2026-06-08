import { useTranslation } from "react-i18next";
import { FilterChipBar, SearchField } from "@/components/ui/data";
import type { CustomerRegistryKindFilter } from "@/lib/customerUtils";
import { cn } from "@/lib/cn";

export type CustomerKindFilter = CustomerRegistryKindFilter;

interface CustomerFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  kind: CustomerKindFilter;
  onKindChange: (value: CustomerKindFilter) => void;
  speedMbps: number | "all";
  onSpeedChange: (value: number | "all") => void;
  speedOptions: number[];
  className?: string;
}

export function CustomerFilters({
  search,
  onSearchChange,
  kind,
  onKindChange,
  speedMbps,
  onSpeedChange,
  speedOptions,
  className,
}: CustomerFiltersProps) {
  const { t } = useTranslation();

  const kindFilters: CustomerKindFilter[] = ["all", "customer", "subscriber", "stopped"];

  return (
    <div className={cn("space-y-4", className)}>
      <SearchField
        value={search}
        onChange={onSearchChange}
        placeholder={t("customers.filters.searchPlaceholder")}
        ariaLabel={t("customers.filters.search")}
      />

      <div className="space-y-4 border-t border-border pt-4">
        <FilterChipBar
          label={t("customers.filters.kind")}
          value={kind}
          onChange={(id) => onKindChange(id as CustomerKindFilter)}
          options={kindFilters.map((value) => ({
            id: value,
            label: t(`customers.filters.kind_${value}`),
          }))}
        />

        <FilterChipBar
          label={t("customers.filters.speed")}
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
