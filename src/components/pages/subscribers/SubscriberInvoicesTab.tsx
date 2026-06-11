import { Eye, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { InvoiceFormModal, type InvoiceFormValues } from "@/components/pages/subscribers/InvoiceFormModal";
import { InvoicePreviewModal } from "@/components/pages/subscribers/InvoicePreviewModal";
import { Button } from "@/components/ui/buttons";
import { StatusBadge } from "@/components/ui/data";
import { ConfirmDialog } from "@/components/ui/modals";
import { Text } from "@/components/ui/typography";
import { formatMoneyILS } from "@/lib/formatMoney";
import { getPaymentMethodLabel } from "@/lib/invoiceUtils";
import type { Subscriber, SubscriberInvoice } from "@/types/subscriber";
import { format, parseISO } from "date-fns";

interface SubscriberInvoicesTabProps {
  invoices: SubscriberInvoice[];
  balance: number;
  subscriber: Pick<Subscriber, "lineId" | "fullName" | "phone" | "facilityType">;
  canManage?: boolean;
  onAddInvoice?: (values: InvoiceFormValues) => Promise<void>;
  onDeleteInvoice?: (invoiceId: number) => Promise<void>;
}

const INVOICE_VARIANT = {
  unpaid: "warning",
  partial: "accent",
  paid: "success",
  debt: "danger",
} as const;

export function SubscriberInvoicesTab({
  invoices,
  balance,
  subscriber,
  canManage = false,
  onAddInvoice,
  onDeleteInvoice,
}: SubscriberInvoicesTabProps) {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<SubscriberInvoice | null>(null);
  const [invoiceToPreview, setInvoiceToPreview] = useState<SubscriberInvoice | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (values: InvoiceFormValues) => {
    if (!onAddInvoice) return;
    setIsSubmitting(true);
    try {
      await onAddInvoice(values);
      setModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!invoiceToDelete || !onDeleteInvoice) return;
    setIsDeleting(true);
    try {
      await onDeleteInvoice(invoiceToDelete.id);
      setInvoiceToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const showActionsColumn = true;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 sm:flex sm:items-center sm:justify-between">
        <div>
          <Text className="text-sm font-medium">{t("subscribers.invoices.balance")}</Text>
          <p className="text-2xl font-bold text-foreground tabular-nums" dir="ltr">
            {formatMoneyILS(balance)}
          </p>
        </div>
        {canManage && onAddInvoice ? (
          <Button size="sm" className="mt-3 sm:mt-0" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" />
            {t("subscribers.invoices.add")}
          </Button>
        ) : null}
      </div>

      {invoices.length === 0 ? (
        <Text muted className="text-sm">{t("subscribers.invoices.empty")}</Text>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-start font-semibold">#</th>
                <th className="px-4 py-3 text-start font-semibold">{t("subscribers.invoices.amount")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("subscribers.invoices.paid")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("subscribers.invoices.remaining")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("subscribers.invoices.status")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("subscribers.invoices.paymentMethod")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("subscribers.table.createdAt")}</th>
                {showActionsColumn ? (
                  <th className="w-28 px-4 py-3 text-center align-middle font-semibold">{t("subscribers.table.actions")}</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">{inv.id}</td>
                  <td className="px-4 py-3 tabular-nums" dir="ltr">{formatMoneyILS(inv.amount)}</td>
                  <td className="px-4 py-3 tabular-nums" dir="ltr">{formatMoneyILS(inv.paidAmount)}</td>
                  <td className="px-4 py-3 tabular-nums" dir="ltr">
                    {formatMoneyILS(Math.max(0, inv.amount - inv.paidAmount))}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      label={t(`subscribers.invoices.status_${inv.status}`)}
                      variant={INVOICE_VARIANT[inv.status]}
                    />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {getPaymentMethodLabel(inv.paymentMethod, t)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {format(parseISO(inv.createdAt), "yyyy-MM-dd")}
                  </td>
                  {showActionsColumn ? (
                    <td className="px-4 py-3 text-center align-middle">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={t("subscribers.invoices.preview")}
                          onClick={() => setInvoiceToPreview(inv)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {canManage && onDeleteInvoice ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={t("subscribers.invoices.delete")}
                            onClick={() => setInvoiceToDelete(inv)}
                          >
                            <Trash2 className="h-4 w-4 text-danger" />
                          </Button>
                        ) : null}
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <InvoiceFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        defaultPayment={balance < 0 ? Math.abs(balance) : 0}
      />

      <InvoicePreviewModal
        open={invoiceToPreview !== null}
        onClose={() => setInvoiceToPreview(null)}
        invoice={invoiceToPreview}
        subscriber={subscriber}
      />

      <ConfirmDialog
        open={invoiceToDelete !== null}
        onClose={() => setInvoiceToDelete(null)}
        onConfirm={handleConfirmDelete}
        title={t("subscribers.invoices.deleteTitle")}
        message={
          invoiceToDelete
            ? t("subscribers.invoices.deleteMessage", {
                id: invoiceToDelete.id,
                amount: invoiceToDelete.amount,
              })
            : ""
        }
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}
