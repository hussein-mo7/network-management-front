import type { TFunction } from "i18next";
import type { InvoiceStatus, PaymentMethod } from "@/types/subscriber";

export function computeInvoiceStatus(amount: number, paidAmount: number): InvoiceStatus {
  if (paidAmount <= 0) return "unpaid";
  if (paidAmount >= amount) return "paid";
  return "partial";
}

export function balanceDeltaForInvoice(amount: number, paidAmount: number): number {
  return paidAmount - amount;
}

/** Undo balance change when removing an invoice */
export function balanceDeltaForDeletedInvoice(amount: number, paidAmount: number): number {
  return -balanceDeltaForInvoice(amount, paidAmount);
}

export const PAYMENT_METHOD_OPTIONS: PaymentMethod[] = ["cash", "transfer", "credit"];

export function getPaymentMethodLabel(
  method: PaymentMethod | null | undefined,
  t: TFunction,
): string {
  if (!method) return t("subscribers.invoices.paymentMethodUnset");
  return t(`subscribers.invoices.paymentMethod_${method}`);
}
