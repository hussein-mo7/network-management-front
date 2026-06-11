import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Modal, ModalFooterButton } from "@/components/ui/modals";
import { Input, Textarea } from "@/components/ui/forms";
import { Text } from "@/components/ui/typography";
import { PaymentMethodSelect } from "@/components/pages/subscribers/PaymentMethodSelect";
import type { PaymentMethod } from "@/types/subscriber";

export interface InvoiceFormValues {
  paidAmount: number;
  paymentMethod: PaymentMethod | "";
  notes: string;
}

interface InvoiceFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: InvoiceFormValues) => void;
  isSubmitting?: boolean;
  /** Pre-fill with amount owed (positive number) when balance is negative */
  defaultPayment?: number;
}

export function InvoiceFormModal({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
  defaultPayment,
}: InvoiceFormModalProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InvoiceFormValues>({
    defaultValues: {
      paidAmount: defaultPayment ?? 0,
      paymentMethod: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        paidAmount: defaultPayment ?? 0,
        paymentMethod: "",
        notes: "",
      });
    }
  }, [open, defaultPayment, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title={t("subscribers.invoices.addTitle")}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Text muted className="text-sm">{t("subscribers.invoices.addHint")}</Text>

        <Input
          label={t("subscribers.invoices.paidAmount")}
          type="number"
          min={0}
          step="0.01"
          error={errors.paidAmount?.message}
          {...register("paidAmount", {
            required: t("subscribers.invoices.amountRequired"),
            valueAsNumber: true,
            min: { value: 0.01, message: t("subscribers.invoices.amountRequired") },
          })}
        />

        <PaymentMethodSelect register={register} error={errors.paymentMethod} />

        <Textarea label={t("subscribers.form.notes")} rows={2} {...register("notes")} />

        <div className="flex justify-end gap-2 pt-2">
          <ModalFooterButton variant="outline" type="button" onClick={handleClose}>
            {t("common.cancel")}
          </ModalFooterButton>
          <ModalFooterButton type="submit" isLoading={isSubmitting}>
            {t("subscribers.invoices.add")}
          </ModalFooterButton>
        </div>
      </form>
    </Modal>
  );
}
