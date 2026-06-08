import { cn } from "@/lib/cn";

interface TableSubscriberCellProps {
  name: string;
  subtitle?: string | null;
  initials: string;
  className?: string;
}

/** Compact identity cell — capped width so other columns get room. */
export function TableSubscriberCell({
  name,
  subtitle,
  initials,
  className,
}: TableSubscriberCellProps) {
  return (
    <div className={cn("flex min-w-0 items-center gap-2", className)}>
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted/30 text-[10px] font-medium text-muted-foreground">
        {initials}
      </div>
      <div className="min-w-0 overflow-hidden">
        <p className="truncate text-sm font-medium leading-tight text-foreground">{name}</p>
        {subtitle ? (
          <p className="truncate text-[11px] leading-tight text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
