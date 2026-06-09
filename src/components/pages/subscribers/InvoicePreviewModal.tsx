import { Printer } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/buttons";
import { StatusBadge } from "@/components/ui/data";
import { Modal } from "@/components/ui/modals";
import { Text } from "@/components/ui/typography";
import { getPaymentMethodLabel } from "@/lib/invoiceUtils";
import type { Subscriber, SubscriberInvoice } from "@/types/subscriber";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/cn";

const INVOICE_VARIANT = {
  unpaid: "warning",
  partial: "accent",
  paid: "success",
  debt: "danger",
} as const;

interface InvoicePreviewModalProps {
  open: boolean;
  onClose: () => void;
  invoice: SubscriberInvoice | null;
  subscriber: Pick<Subscriber, "lineId" | "fullName" | "phone" | "facilityType">;
}

export function InvoicePreviewModal({
  open,
  onClose,
  invoice,
  subscriber,
}: InvoicePreviewModalProps) {
  const { t, i18n } = useTranslation();
  const printRef = useRef<HTMLDivElement>(null);

  if (!invoice) return null;

  const remaining = Math.max(0, invoice.amount - invoice.paidAmount);
  const createdLabel = format(parseISO(invoice.createdAt), "yyyy-MM-dd");
  const paidLabel = invoice.paidAt ? format(parseISO(invoice.paidAt), "yyyy-MM-dd") : "—";

  const handlePrint = () => {
    const node = printRef.current;
    if (!node) return;
    const printWindow = window.open("", "_blank", "noopener,noreferrer,width=800,height=900");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="${i18n.dir()}">
        <head>
          <meta charset="utf-8" />
          <title>${t("subscribers.invoices.previewTitle", { id: invoice.id })}</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: system-ui, sans-serif; margin: 0; padding: 32px; color: #111; }
            .card { border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); color: #fff; padding: 28px 32px; }
            .header h1 { margin: 0 0 4px; font-size: 22px; }
            .header p { margin: 0; opacity: 0.9; font-size: 14px; }
            .body { padding: 28px 32px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 4px; }
            .value { font-size: 15px; font-weight: 600; }
            .amount-box { background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 12px; padding: 20px; text-align: center; margin-top: 8px; }
            .amount { font-size: 32px; font-weight: 800; color: #0f766e; }
            .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
            .row:last-child { border-bottom: none; font-weight: 700; }
            .muted { color: #6b7280; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>${node.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t("subscribers.invoices.previewTitle", { id: invoice.id })}
      className="sm:max-w-lg"
      footer={
        <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            {t("subscribers.invoices.print")}
          </Button>
        </div>
      }
    >
      <div
        ref={printRef}
        className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
      >
        <div className="bg-gradient-to-br from-primary to-primary/80 px-5 py-6 text-primary-foreground sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider opacity-90">
                {t("subscribers.invoices.previewHeading")}
              </p>
              <h2 className="mt-1 text-xl font-bold" dir="ltr">
                #{invoice.id}
              </h2>
              <p className="mt-2 text-sm opacity-90">{subscriber.fullName}</p>
            </div>
            <StatusBadge
              label={t(`subscribers.invoices.status_${invoice.status}`)}
              variant={INVOICE_VARIANT[invoice.status]}
            />
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <InvoiceField label={t("subscribers.table.lineId")} value={subscriber.lineId} ltr />
            <InvoiceField
              label={t("subscribers.form.phone")}
              value={subscriber.phone ?? "—"}
              ltr={Boolean(subscriber.phone)}
            />
            <InvoiceField
              label={t("subscribers.form.facilityType")}
              value={subscriber.facilityType?.trim() || "—"}
            />
            <InvoiceField label={t("subscribers.table.createdAt")} value={createdLabel} ltr />
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-5 text-center">
            <Text muted className="text-xs font-medium uppercase tracking-wide">
              {t("subscribers.invoices.amount")}
            </Text>
            <p className="mt-1 text-3xl font-bold text-primary" dir="ltr">
              {invoice.amount} ₪
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/20 px-4 py-2">
            <InvoiceRow label={t("subscribers.invoices.paid")} value={`${invoice.paidAmount} ₪`} />
            <InvoiceRow
              label={t("subscribers.invoices.remaining")}
              value={`${remaining} ₪`}
              strong
            />
            <InvoiceRow
              label={t("subscribers.invoices.paymentMethod")}
              value={getPaymentMethodLabel(invoice.paymentMethod, t)}
            />
            <InvoiceRow label={t("subscribers.invoices.paidAt")} value={paidLabel} ltr />
          </div>

          {invoice.notes?.trim() ? (
            <div className="rounded-lg border border-dashed border-border px-4 py-3">
              <Text muted className="text-xs font-medium">{t("subscribers.form.notes")}</Text>
              <p className="mt-1 text-sm text-foreground">{invoice.notes}</p>
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

function InvoiceField({
  label,
  value,
  ltr = false,
}: {
  label: string;
  value: string;
  ltr?: boolean;
}) {
  return (
    <div>
      <Text muted className="text-xs font-medium">{label}</Text>
      <p className={cn("mt-1 text-sm font-semibold text-foreground", ltr && "tabular-nums")} dir={ltr ? "ltr" : undefined}>
        {value}
      </p>
    </div>
  );
}

function InvoiceRow({
  label,
  value,
  strong = false,
  ltr = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
  ltr?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 py-2.5 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={cn("text-sm text-foreground", strong && "font-bold")}
        dir={ltr ? "ltr" : undefined}
      >
        {value}
      </span>
    </div>
  );
}
