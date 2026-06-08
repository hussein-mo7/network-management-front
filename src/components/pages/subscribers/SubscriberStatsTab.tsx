import { Calendar, Clock, Wallet } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/buttons";
import { Input, PasswordInput, Textarea } from "@/components/ui/forms";
import { StatCard } from "@/components/ui/data";
import { Text } from "@/components/ui/typography";
import { getDaysUntilDisconnect, getUsageDays, buildSpeedLabel } from "@/lib/subscriberUtils";
import type { Subscriber } from "@/types/subscriber";
import { format, parseISO } from "date-fns";

interface SubscriberStatsTabProps {
  subscriber: Subscriber;
  canManage?: boolean;
  canViewPasswords?: boolean;
  daysGone?: number | null;
  daysRemaining?: number | null;
  onSave?: (patch: Partial<Subscriber>) => void | Promise<void>;
  isSubmitting?: boolean;
}

interface ProfileFormValues {
  fullName: string;
  phone: string;
  notes: string;
  password: string;
}

export function SubscriberStatsTab({
  subscriber,
  canManage = false,
  canViewPasswords = false,
  daysGone = null,
  daysRemaining = null,
  onSave,
  isSubmitting = false,
}: SubscriberStatsTabProps) {
  const { t } = useTranslation();
  const usageDays = daysGone ?? getUsageDays(subscriber);
  const daysLeft = daysRemaining ?? getDaysUntilDisconnect(subscriber);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: subscriber.fullName,
      phone: subscriber.phone ?? "",
      notes: subscriber.notes ?? "",
      password: subscriber.password ?? "",
    },
  });

  useEffect(() => {
    reset({
      fullName: subscriber.fullName,
      phone: subscriber.phone ?? "",
      notes: subscriber.notes ?? "",
      password: subscriber.password ?? "",
    });
  }, [
    subscriber.lineId,
    subscriber.fullName,
    subscriber.phone,
    subscriber.notes,
    subscriber.password,
    reset,
  ]);

  const formatDate = (value: string | null) => {
    if (!value) return "—";
    try {
      return format(parseISO(value), "yyyy-MM-dd");
    } catch {
      return value;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          label={t("subscribers.profile.stats.usageDays")}
          value={usageDays ?? "—"}
          hint={t("subscribers.profile.stats.usageDaysHint")}
          icon={Clock}
        />
        <StatCard
          label={t("subscribers.profile.stats.daysLeft")}
          value={daysLeft ?? "—"}
          hint={t("subscribers.profile.stats.daysLeftHint")}
          icon={Calendar}
          iconClassName="bg-warning/10 text-warning"
        />
        <StatCard
          label={t("subscribers.profile.stats.balance")}
          value={`${subscriber.balance} ₪`}
          hint={t("subscribers.profile.stats.monthlyPrice", { price: subscriber.monthlyPrice })}
          icon={Wallet}
          iconClassName={subscriber.balance < 0 ? "bg-danger/10 text-danger" : "bg-success/10 text-success"}
        />
      </div>

      <form
        onSubmit={handleSubmit(async (values) => {
          const patch: Partial<Subscriber> = {
            fullName: values.fullName.trim(),
            phone: values.phone.trim() || null,
            notes: values.notes.trim() || null,
          };
          const password = values.password.trim();
          const previous = (subscriber.password ?? "").trim();
          if (canManage && password !== previous) {
            patch.password = password || null;
          }
          await onSave?.(patch);
        })}
        className="space-y-4 rounded-xl border border-border bg-surface p-4 sm:p-5"
      >
        <Text className="text-sm font-semibold">{t("subscribers.profile.formSection")}</Text>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label={t("subscribers.table.lineId")} value={subscriber.lineId} readOnly disabled />
          <Input
            label={t("subscribers.table.username")}
            value={subscriber.username ?? "—"}
            readOnly
            disabled
          />
          {canViewPasswords && canManage ? (
            <PasswordInput
              label={t("subscribers.table.password")}
              autoComplete="new-password"
              error={errors.password?.message}
              {...register("password", {
                validate: (value) => {
                  const trimmed = value?.trim() ?? "";
                  if (!trimmed) return t("subscribers.username.passwordRequired");
                  if (trimmed.length < 4) return t("subscribers.username.passwordMin");
                  return true;
                },
              })}
            />
          ) : null}
          <Input
            label={t("subscribers.table.speed")}
            value={buildSpeedLabel(subscriber.speedMbps)}
            readOnly
            disabled
          />
          <Input
            label={t("subscribers.form.fullName")}
            {...register("fullName")}
            disabled={!canManage}
          />
          <Input label={t("subscribers.form.phone")} {...register("phone")} disabled={!canManage} />
          <Input
            label={t("subscribers.profile.firstContact")}
            value={formatDate(subscriber.firstContactDate)}
            readOnly
            disabled
          />
          <Input
            label={t("subscribers.profile.disconnection")}
            value={formatDate(subscriber.disconnectionDate)}
            readOnly
            disabled
          />
        </div>

        {canManage ? (
          <Text muted className="text-xs">
            {t("subscribers.profile.passwordEditHint")}
          </Text>
        ) : null}

        <Textarea
          label={t("subscribers.form.notes")}
          rows={3}
          {...register("notes")}
          disabled={!canManage}
        />

        {canManage ? (
          <div className="flex justify-end">
            <Button type="submit" size="sm" isLoading={isSubmitting}>
              {t("common.save")}
            </Button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
