import { Calendar, Clock, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SubscriberRouterSection } from "@/components/pages/subscribers/SubscriberRouterSection";
import { SpeedTierPicker } from "@/components/pages/speeds";
import { Button } from "@/components/ui/buttons";
import { Input, PasswordInput, Textarea } from "@/components/ui/forms";
import { StatCard } from "@/components/ui/data";
import { ProfileSection } from "@/components/ui/profile";
import { Text } from "@/components/ui/typography";
import { getDaysUntilDisconnect, getUsageDays, buildSpeedLabel } from "@/lib/subscriberUtils";
import type { SpeedTier } from "@/types/speeds";
import type { Subscriber } from "@/types/subscriber";
import { format, parseISO } from "date-fns";

interface SubscriberStatsTabProps {
  subscriber: Subscriber;
  speedTiers?: SpeedTier[];
  canManage?: boolean;
  canViewPasswords?: boolean;
  daysGone?: number | null;
  daysRemaining?: number | null;
  onSave?: (
    patch: Partial<Subscriber> & { speedId?: number; routerImageFile?: File; routerImageUrl?: string | null },
  ) => void | Promise<void>;
  isSubmitting?: boolean;
}

interface ProfileFormValues {
  fullName: string;
  phone: string;
  notes: string;
  password: string;
  packageLine: number;
}

export function SubscriberStatsTab({
  subscriber,
  speedTiers = [],
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
  const resolvedSpeedId =
    subscriber.speedId ?? speedTiers.find((tier) => tier.valueMbps === subscriber.speedMbps)?.id ?? null;
  const [selectedSpeedId, setSelectedSpeedId] = useState<number | null>(resolvedSpeedId);
  const canEditSpeed = canManage && Boolean(subscriber.username) && speedTiers.length > 0;
  const [routerName, setRouterName] = useState(subscriber.routerName ?? "");
  const [routerImageFile, setRouterImageFile] = useState<File | null>(null);
  const [routerImagePreview, setRouterImagePreview] = useState<string | null>(
    subscriber.routerImageUrl ?? null,
  );

  useEffect(() => {
    setSelectedSpeedId(resolvedSpeedId);
  }, [subscriber.id, resolvedSpeedId]);

  useEffect(() => {
    setRouterName(subscriber.routerName ?? "");
    setRouterImageFile(null);
    setRouterImagePreview(subscriber.routerImageUrl ?? null);
  }, [subscriber.id, subscriber.routerName, subscriber.routerImageUrl]);

  const routerHasChanges =
    routerName.trim() !== (subscriber.routerName ?? "").trim() || routerImageFile !== null;

  const appendRouterPatch = (
    patch: Partial<Subscriber> & { speedId?: number; routerImageFile?: File; routerImageUrl?: string | null },
  ) => {
    const trimmedRouterName = routerName.trim();
    if (canManage && trimmedRouterName !== (subscriber.routerName ?? "").trim()) {
      patch.routerName = trimmedRouterName || null;
    }
    if (canManage && routerImageFile) {
      patch.routerImageFile = routerImageFile;
      patch.routerImageUrl = routerImagePreview;
    }
  };

  const handleRouterSave = async () => {
    const patch: Partial<Subscriber> & { speedId?: number; routerImageFile?: File; routerImageUrl?: string | null } =
      {};
    appendRouterPatch(patch);
    if (patch.routerName === undefined && !patch.routerImageFile) return;
    await onSave?.(patch);
    setRouterImageFile(null);
  };

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
      packageLine: subscriber.packageLine,
    },
  });

  useEffect(() => {
    reset({
      fullName: subscriber.fullName,
      phone: subscriber.phone ?? "",
      notes: subscriber.notes ?? "",
      password: subscriber.password ?? "",
      packageLine: subscriber.packageLine,
    });
  }, [
    subscriber.lineId,
    subscriber.packageLine,
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
      <SubscriberRouterSection
        routerName={routerName}
        imagePreview={routerImagePreview}
        canManage={canManage}
        isSubmitting={isSubmitting}
        hasChanges={routerHasChanges}
        onRouterNameChange={setRouterName}
        onImageFileSelect={(file) => {
          setRouterImageFile(file);
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") {
              setRouterImagePreview(reader.result);
            }
          };
          reader.readAsDataURL(file);
        }}
        onSave={canManage ? handleRouterSave : undefined}
      />

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

      <ProfileSection title={t("subscribers.profile.formSection")} bodyClassName="p-0">
      <form
        onSubmit={handleSubmit(async (values) => {
          const patch: Partial<Subscriber> & { speedId?: number } = {
            fullName: values.fullName.trim(),
            phone: values.phone.trim() || null,
            notes: values.notes.trim() || null,
          };
          const password = values.password.trim();
          const previous = (subscriber.password ?? "").trim();
          if (canManage && password !== previous) {
            patch.password = password || null;
          }
          if (canEditSpeed && selectedSpeedId && selectedSpeedId !== resolvedSpeedId) {
            patch.speedId = selectedSpeedId;
          }
          if (canManage && values.packageLine !== subscriber.packageLine) {
            patch.packageLine = values.packageLine;
          }
          appendRouterPatch(patch);
          await onSave?.(patch);
          setRouterImageFile(null);
        })}
        className="space-y-4 p-4 sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label={t("subscribers.table.lineId")} value={subscriber.lineId} readOnly disabled />
          <Input
            label={t("subscribers.form.lineNumber")}
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            disabled={!canManage}
            error={errors.packageLine?.message}
            {...register("packageLine", {
              required: t("subscribers.form.lineNumberRequired"),
              valueAsNumber: true,
              min: { value: 1, message: t("subscribers.form.lineNumberRequired") },
            })}
          />
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
          {canEditSpeed ? (
            <div className="space-y-2 sm:col-span-2">
              <Text className="text-xs font-medium text-muted-foreground">
                {t("subscribers.table.speed")}
              </Text>
              <SpeedTierPicker
                tiers={speedTiers}
                selectedId={selectedSpeedId ?? speedTiers[0]?.id ?? 0}
                onSelect={(tier) => setSelectedSpeedId(tier.id)}
              />
              <Text muted className="text-xs">{t("subscribers.profile.speedEditHint")}</Text>
            </div>
          ) : (
            <Input
              label={t("subscribers.table.speed")}
              value={subscriber.speedMbps ? buildSpeedLabel(subscriber.speedMbps) : "—"}
              readOnly
              disabled
            />
          )}
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
      </ProfileSection>
    </div>
  );
}
