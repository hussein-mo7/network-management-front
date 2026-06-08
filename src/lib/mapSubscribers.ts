import type {
  InvoiceStatus,
  PaymentMethod,
  SpeedHistoryEntry,
  Subscriber,
  SubscriberInvoice,
  UsernameHistoryEntry,
} from "@/types/subscriber";

export interface BackendSubscriberRow {
  id: number;
  usernameID?: number | null;
  username?: string | null;
  password?: string | null;
  speedId?: number | null;
  speedValue?: number | null;
  lineId: string;
  fullName: string;
  facilityType?: string | null;
  phone?: string | null;
  monthlyPrice?: string | number | null;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  isSuspended?: boolean | null;
  notes?: string | null;
  balance?: string | number | null;
  createdAt?: string | Date | null;
  suspendAt?: string | Date | null;
}

export interface BackendSubscriberProfileResponse {
  status?: string;
  success?: boolean;
  data: BackendSubscriberRow;
  daysGone?: number | null;
  daysRemaining?: number | null;
}

export interface BackendSubscribersListResponse {
  success?: boolean;
  status?: string;
  data: {
    data: BackendSubscriberRow[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface BackendUsernameHistoryRow {
  id: number;
  subscriberId: number;
  oldUsername: string;
  oldPassword?: string | null;
  usageStartDate?: string | Date | null;
  usageEndDate?: string | Date | null;
  changedAt?: string | Date | null;
}

export interface BackendSpeedHistoryRow {
  id: number;
  subscriberId: number;
  /** API / Drizzle column names */
  oldSpeed?: number | null;
  newSpeed?: number | null;
  oldSpeedMbps?: number | null;
  newSpeedMbps?: number | null;
  usageStartDate?: string | Date | null;
  usageEndDate?: string | Date | null;
  daysUsed?: number | null;
  changedAt?: string | Date | null;
}

export interface BackendInvoiceRow {
  id: number;
  subscriberId: number;
  amount: string | number;
  paidAmount: string | number;
  paymentMethod: "cash" | "bank_transfer" | "credit";
  status: "unpaid" | "partial" | "paid";
  notes?: string | null;
  createdAt: string | Date;
}

function toIso(value: string | Date | null | undefined): string | null {
  if (value == null) return null;
  if (value instanceof Date) return value.toISOString();
  return value;
}

function toNumber(value: string | number | null | undefined, fallback = 0): number {
  if (value == null || value === "") return fallback;
  const n = typeof value === "number" ? value : parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}

export function mapPaymentMethodFromApi(method: BackendInvoiceRow["paymentMethod"]): PaymentMethod {
  if (method === "bank_transfer") return "transfer";
  return method;
}

export function mapPaymentMethodToApi(method: PaymentMethod): BackendInvoiceRow["paymentMethod"] {
  if (method === "transfer") return "bank_transfer";
  return method;
}

export function mapSubscriberRecord(row: BackendSubscriberRow): Subscriber {
  const createdAt = toIso(row.createdAt) ?? new Date().toISOString();
  const startDate = toIso(row.startDate);
  const endDate = toIso(row.endDate);

  return {
    id: row.id,
    lineId: row.lineId,
    username: row.username ?? null,
    password: row.password ?? null,
    fullName: row.fullName ?? "",
    facilityType: row.facilityType ?? "",
    phone: row.phone ?? null,
    packageLine: row.speedValue ?? 0,
    speedId: row.speedId ?? null,
    usernameId: row.usernameID ?? null,
    speedMbps: row.speedValue ?? 0,
    monthlyPrice: toNumber(row.monthlyPrice, 0),
    startDate,
    firstContactDate: startDate,
    disconnectionDate: endDate,
    isActive: !row.isSuspended,
    isSuspended: Boolean(row.isSuspended),
    isOwnerUsername: false,
    balance: toNumber(row.balance, 0),
    notes: row.notes ?? null,
    createdAt,
    updatedAt: toIso(row.suspendAt) ?? createdAt,
  };
}

export function mapInvoiceRecord(row: BackendInvoiceRow, lineId: string): SubscriberInvoice {
  const paidAmount = toNumber(row.paidAmount, 0);
  const amount = toNumber(row.amount, 0);
  let status: InvoiceStatus = row.status;
  if (paidAmount > amount) status = "debt";

  return {
    id: row.id,
    subscriberLineId: lineId,
    amount,
    paidAmount,
    status,
    paymentMethod: mapPaymentMethodFromApi(row.paymentMethod),
    notes: row.notes ?? null,
    createdAt: toIso(row.createdAt) ?? new Date().toISOString(),
    paidAt: paidAmount > 0 ? toIso(row.createdAt) : null,
  };
}

export function mapUsernameHistory(
  rows: BackendUsernameHistoryRow[],
  lineId: string,
): UsernameHistoryEntry[] {
  return rows.map((row) => ({
    id: row.id,
    subscriberLineId: lineId,
    oldUsername: row.oldUsername,
    oldPassword: row.oldPassword ?? "",
    usageStartDate: toIso(row.usageStartDate),
    usageEndDate: toIso(row.usageEndDate),
    changedAt: toIso(row.changedAt) ?? new Date().toISOString(),
  }));
}

export function mapSpeedHistory(rows: BackendSpeedHistoryRow[], lineId: string): SpeedHistoryEntry[] {
  return rows.map((row) => ({
    id: row.id,
    subscriberLineId: lineId,
    oldSpeedMbps: row.oldSpeedMbps ?? row.oldSpeed ?? 0,
    newSpeedMbps: row.newSpeedMbps ?? row.newSpeed ?? 0,
    usageStartDate: toIso(row.usageStartDate),
    usageEndDate: toIso(row.usageEndDate),
    daysUsed: row.daysUsed ?? null,
    changedAt: toIso(row.changedAt) ?? new Date().toISOString(),
  }));
}

export interface SubscriberProfileDto {
  subscriber: Subscriber;
  daysGone: number | null;
  daysRemaining: number | null;
}

export function mapSubscriberProfileResponse(
  body: BackendSubscriberProfileResponse,
): SubscriberProfileDto {
  return {
    subscriber: mapSubscriberRecord(body.data),
    daysGone: body.daysGone ?? null,
    daysRemaining: body.daysRemaining ?? null,
  };
}
