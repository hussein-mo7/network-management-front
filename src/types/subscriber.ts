/** UI / mock model — aligned with legacy fields; API may use speedId + usernameId (see STRUCTURE.md). */

export type SubscriberLifecycleStatus = "active" | "suspended" | "no_subscription" | "stopped";

export type InvoiceStatus = "unpaid" | "partial" | "paid" | "debt";
export type PaymentMethod = "cash" | "transfer" | "credit";

export interface Subscriber {
  id: number;
  /** Display ID e.g. W04-101 */
  lineId: string;
  username: string | null;
  password: string | null;
  fullName: string;
  facilityType: string;
  phone: string | null;
  /** Line / package number */
  packageLine: number;
  speedId?: number | null;
  usernameId?: number | null;
  speedMbps: number;
  monthlyPrice: number;
  startDate: string | null;
  firstContactDate: string | null;
  disconnectionDate: string | null;
  isActive: boolean;
  isSuspended: boolean;
  isOwnerUsername: boolean;
  balance: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UsernameHistoryEntry {
  id: number;
  subscriberLineId: string;
  oldUsername: string;
  oldPassword: string;
  usageStartDate: string | null;
  usageEndDate: string | null;
  changedAt: string;
}

export interface SpeedHistoryEntry {
  id: number;
  subscriberLineId: string;
  oldSpeedMbps: number;
  newSpeedMbps: number;
  usageStartDate: string | null;
  usageEndDate: string | null;
  daysUsed: number | null;
  changedAt: string;
}

export interface SubscriberInvoice {
  id: number;
  subscriberLineId: string;
  amount: number;
  paidAmount: number;
  status: InvoiceStatus;
  paymentMethod: PaymentMethod | null;
  notes: string | null;
  createdAt: string;
  paidAt: string | null;
}

export interface SubscriberListFilters {
  search: string;
  status: "all" | SubscriberLifecycleStatus;
  speedMbps: number | "all";
}
