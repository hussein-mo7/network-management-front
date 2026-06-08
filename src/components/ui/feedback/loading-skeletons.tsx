import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { cn } from "@/lib/cn";

export function PageHeaderSkeleton({ showAction = true }: { showAction?: boolean }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 space-y-2">
        <Skeleton className="h-7 w-48 max-w-full" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>
      {showAction ? <Skeleton className="h-9 w-32 shrink-0 rounded-lg" /> : null}
    </div>
  );
}

export function SpeedTiersGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-border bg-surface p-4 shadow-card sm:p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="mt-4 h-5 w-24" />
          <Skeleton className="mt-2 h-4 w-32" />
          <div className="mt-4 flex gap-4">
            <Skeleton className="h-8 w-14" />
            <Skeleton className="h-8 w-14" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SpeedTierPickerSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-24 rounded-lg" />
      ))}
    </div>
  );
}

export function StatCardsRowSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-surface px-4 py-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-3 h-8 w-16" />
          <Skeleton className="mt-2 h-3 w-28" />
        </div>
      ))}
    </div>
  );
}

export function DataTableSkeleton({ rows = 6, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex gap-4 border-b border-border bg-muted/30 px-4 py-3">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className={cn("h-3.5", i === 0 ? "w-28" : "w-20")} />
        ))}
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="flex items-center gap-4 px-4 py-3.5">
            <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
            {Array.from({ length: columns - 1 }).map((_, col) => (
              <Skeleton key={col} className={cn("h-3.5", col === 0 ? "w-32" : "w-20")} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SupportContentSkeleton() {
  return (
    <div className="space-y-6">
      <StatCardsRowSkeleton count={4} />
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-56 rounded-xl border border-border" />
        <Skeleton className="h-56 rounded-xl border border-border" />
      </div>
      <section className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
        <DataTableSkeleton rows={8} columns={6} />
      </section>
    </div>
  );
}

export function SupportPageSkeleton() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <SupportContentSkeleton />
    </div>
  );
}

export function AvailableUsernamesPageSkeleton() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <PageHeaderSkeleton showAction={false} />
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <SpeedTierPickerSkeleton count={5} />
      </div>
      <section className="space-y-4 rounded-xl border border-border bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-28 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-16 rounded-lg" />
          ))}
        </div>
        <DataTableSkeleton rows={7} columns={5} />
      </section>
    </div>
  );
}
