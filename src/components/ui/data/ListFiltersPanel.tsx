import type { ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";

interface ListFiltersPanelProps {
  search: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Shared filter shell for list pages — search on top, chip groups in a soft panel. */
export function ListFiltersPanel({ search, children, className }: ListFiltersPanelProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">{search}</div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/70 bg-gradient-to-b from-muted/30 to-muted/10">
        <div className="flex items-center gap-2 border-b border-border/50 px-4 py-2.5 sm:px-5">
          <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("common.filters")}
          </span>
        </div>
        <div className="space-y-5 p-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
}

interface FilterGroupProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function FilterGroup({ label, children, className }: FilterGroupProps) {
  return (
    <div className={cn("space-y-2.5", className)}>
      <span className="block text-xs font-semibold text-foreground/80">{label}</span>
      {children}
    </div>
  );
}
