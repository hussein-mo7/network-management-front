import { differenceInCalendarDays, parseISO } from "date-fns";
import type { Subscriber, SubscriberLifecycleStatus } from "@/types/subscriber";

export function buildSpeedLabel(mbps: number): string {
  return `${mbps} Mbps`;
}

/** Unique Mbps values from loaded rows (e.g. 4, 8, 16, 32). */
export function getDistinctSpeeds(rows: { speedMbps: number }[]): number[] {
  return [...new Set(rows.map((r) => r.speedMbps).filter((m) => m > 0))].sort((a, b) => a - b);
}

/** Speed tier catalog + speeds present in subscriber data (for filter chips). */
export function mergeSpeedFilterOptions(tierMbps: number[], dataMbps: number[]): number[] {
  return [...new Set([...tierMbps, ...dataMbps])].filter((m) => m > 0).sort((a, b) => a - b);
}

/** Stopped / موقوف — shown on `/stopped`, not on the main subscribers list */
export function isStoppedSubscriber(subscriber: Subscriber): boolean {
  return subscriber.isSuspended;
}

export function getSubscriberLifecycleStatus(subscriber: Subscriber): SubscriberLifecycleStatus {
  if (subscriber.isSuspended) return "suspended";
  if (!subscriber.username) return "no_subscription";
  return "active";
}

/** Active subscribers only (excludes stopped / موقوف) */
export function filterActiveSubscribers(rows: Subscriber[]): Subscriber[] {
  return rows.filter((row) => !isStoppedSubscriber(row));
}

export function getDaysUntilDisconnect(subscriber: Subscriber, now = new Date()): number | null {
  if (!subscriber.disconnectionDate) return null;
  try {
    return differenceInCalendarDays(parseISO(subscriber.disconnectionDate), now);
  } catch {
    return null;
  }
}

export function getUsageDays(subscriber: Subscriber, now = new Date()): number | null {
  if (!subscriber.firstContactDate) return null;
  try {
    return Math.max(0, differenceInCalendarDays(now, parseISO(subscriber.firstContactDate)));
  } catch {
    return null;
  }
}

export function matchesSubscriberSearch(subscriber: Subscriber, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = [
    subscriber.lineId,
    subscriber.username ?? "",
    subscriber.fullName,
    subscriber.facilityType,
    subscriber.phone ?? "",
    String(subscriber.packageLine),
    subscriber.notes ?? "",
    String(subscriber.speedMbps),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

export type SubscriberListStatusFilter = "all" | "active" | "no_subscription";

export function filterSubscribers(
  rows: Subscriber[],
  filters: {
    search: string;
    status: SubscriberListStatusFilter;
    speedMbps: number | "all";
  },
): Subscriber[] {
  return rows.filter((row) => {
    if (isStoppedSubscriber(row)) return false;
    if (!matchesSubscriberSearch(row, filters.search)) return false;
    if (filters.status !== "all" && getSubscriberLifecycleStatus(row) !== filters.status) return false;
    if (filters.speedMbps !== "all" && row.speedMbps !== filters.speedMbps) return false;
    return true;
  });
}

export function getSubscriberInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
