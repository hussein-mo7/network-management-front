import { differenceInHours, differenceInCalendarDays, parseISO } from "date-fns";
import type { Subscriber } from "@/types/subscriber";

export function getHoursUntilDisconnect(subscriber: Subscriber, now = new Date()): number | null {
  if (!subscriber.disconnectionDate) return null;
  try {
    const end = parseISO(subscriber.disconnectionDate);
    return Math.max(0, differenceInHours(end, now));
  } catch {
    return null;
  }
}

export function getCalendarDaysUntilDisconnect(subscriber: Subscriber, now = new Date()): number | null {
  if (!subscriber.disconnectionDate) return null;
  try {
    return differenceInCalendarDays(parseISO(subscriber.disconnectionDate), now);
  } catch {
    return null;
  }
}

type TimeLeftT = (key: string, opts?: Record<string, unknown>) => string;

/** Expiring / disconnect labels: غدا for 1 day, hours when today. */
export function formatDisconnectTimeLeft(
  t: TimeLeftT,
  subscriber: Subscriber,
  now = new Date(),
): string {
  const daysLeft = getCalendarDaysUntilDisconnect(subscriber, now);
  if (daysLeft === null) return "—";
  if (daysLeft < 0) {
    return t("expiring.table.daysLeftExpired", { days: Math.abs(daysLeft) });
  }
  if (daysLeft === 0) {
    const hours = getHoursUntilDisconnect(subscriber, now);
    if (hours === null) return t("expiring.table.daysLeftToday");
    return t("expiring.table.hoursLeft", { hours });
  }
  if (daysLeft === 1) {
    return t("expiring.table.daysLeftTomorrow");
  }
  return t("expiring.table.daysLeft", { days: daysLeft });
}
