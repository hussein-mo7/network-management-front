import { useTranslation } from "react-i18next";
import { FilterChipBar, SearchField } from "@/components/ui/data";
import { cn } from "@/lib/cn";
import type { ExpiringUrgencyFilter } from "@/lib/expiringUtils";

const FILTERS: ExpiringUrgencyFilter[] = ["all", "expired", "oneDay", "twoDays", "soon"];

interface ExpiringFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  urgency: ExpiringUrgencyFilter;
  onUrgencyChange: (value: ExpiringUrgencyFilter) => void;
  className?: string;
}

export function ExpiringFilters({
  search,
  onSearchChange,
  urgency,
  onUrgencyChange,
  className,
}: ExpiringFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <SearchField
        value={search}
        onChange={onSearchChange}
        placeholder={t("subscribers.filters.searchPlaceholder")}
        ariaLabel={t("subscribers.filters.search")}
      />

      <FilterChipBar
        label={t("expiring.filters.label")}
        value={urgency}
        onChange={(id) => onUrgencyChange(id as ExpiringUrgencyFilter)}
        options={FILTERS.map((key) => ({
          id: key,
          label: t(`expiring.filters.${key}`),
        }))}
      />
    </div>
  );
}
