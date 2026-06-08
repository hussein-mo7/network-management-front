import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/buttons";
import { Input, Textarea } from "@/components/ui/forms";
import { Heading } from "@/components/ui/typography";
import { FACILITY_TYPE_OPTIONS } from "@/lib/mocks/subscribers.mock";
import type { Customer } from "@/types/customer";

export interface CustomerProfileFormValues {
  fullName: string;
  facilityType: string;
  facilityTypeOther: string;
  phone: string;
  packageLine: number;
  notes: string;
}

interface CustomerProfileFormProps {
  customer: Customer;
  canManage?: boolean;
  onSave: (values: CustomerProfileFormValues) => void;
  isSubmitting?: boolean;
}

export function CustomerProfileForm({
  customer,
  canManage = false,
  onSave,
  isSubmitting = false,
}: CustomerProfileFormProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CustomerProfileFormValues>({
    defaultValues: {
      fullName: customer.fullName,
      facilityType: customer.facilityType,
      facilityTypeOther: "",
      phone: customer.phone ?? "",
      packageLine: customer.packageLine,
      notes: customer.notes ?? "",
    },
  });

  const facilityType = watch("facilityType");

  useEffect(() => {
    reset({
      fullName: customer.fullName,
      facilityType: customer.facilityType,
      facilityTypeOther: "",
      phone: customer.phone ?? "",
      packageLine: customer.packageLine,
      notes: customer.notes ?? "",
    });
  }, [customer, reset]);

  return (
    <section className="rounded-xl border border-border bg-surface p-4 sm:p-6">
      <Heading as="h2" className="text-base font-semibold">
        {t("customers.profile.detailsSection")}
      </Heading>

      <form onSubmit={handleSubmit(onSave)} className="mt-4 space-y-4">
        <Input
          label={t("customers.form.fullName")}
          disabled={!canManage}
          error={errors.fullName?.message}
          {...register("fullName", { required: t("customers.form.fullNameRequired") })}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">{t("customers.form.facilityType")}</label>
            <select
              disabled={!canManage}
              className="flex h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
              {...register("facilityType")}
            >
              {FACILITY_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          {facilityType === "أخرى" ? (
            <Input
              label={t("customers.form.facilityTypeOther")}
              disabled={!canManage}
              {...register("facilityTypeOther", {
                required: t("customers.form.facilityTypeOtherRequired"),
              })}
            />
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label={t("customers.form.phone")} disabled={!canManage} dir="ltr" {...register("phone")} />
          <Input
            label={t("customers.form.lineNumber")}
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            disabled={!canManage}
            error={errors.packageLine?.message}
            {...register("packageLine", {
              required: t("customers.form.lineNumberRequired"),
              valueAsNumber: true,
              min: { value: 1, message: t("customers.form.lineNumberRequired") },
            })}
          />
        </div>

        <Textarea label={t("customers.form.notes")} disabled={!canManage} rows={3} {...register("notes")} />

        {canManage ? (
          <Button type="submit" size="sm" isLoading={isSubmitting}>
            {t("customers.form.saveProfile")}
          </Button>
        ) : null}
      </form>
    </section>
  );
}
