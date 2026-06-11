import { Calendar, Clock, Gauge, HardDrive, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SubscriberRouterSection } from "@/components/pages/subscribers/SubscriberRouterSection";
import { Button } from "@/components/ui/buttons";
import { Input, PasswordInput, Textarea } from "@/components/ui/forms";
import { DataUsageDisplay, StatCard } from "@/components/ui/data";
import { ProfileSection } from "@/components/ui/profile";
import { Text } from "@/components/ui/typography";
import { resolveUsageLimitMb } from "@/lib/speedFairUsage";
import { getDaysUntilDisconnect, getUsageDays, buildSpeedLabel } from "@/lib/subscriberUtils";
import type { SubscriberProfilePatch } from "@/hooks/useSubscribers";
import type { Subscriber } from "@/types/subscriber";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/cn";

type SubscriberProfileSavePatch = SubscriberProfilePatch;

interface SubscriberStatsTabProps {
  subscriber: Subscriber;
  canManage?: boolean;
  canViewPasswords?: boolean;
  showNotes?: boolean;
  daysGone?: number | null;
  daysRemaining?: number | null;
  onSave?: (patch: SubscriberProfileSavePatch) => void | Promise<void>;
  isSubmitting?: boolean;
  showRenew?: boolean;
  onRenewUsername?: () => void;
  isRenewing?: boolean;
}

interface ProfileFormValues {
  fullName: string;
  phone: string;
  notes: string;
  password: string;
  packageLine: number;
  firstContactDate: string;
}

function toDateInputValue(value: string | null): string {
  if (!value) return "";
  try {
    return format(parseISO(value), "yyyy-MM-dd");
  } catch {
    return value.slice(0, 10);
  }
}

export function SubscriberStatsTab({
  subscriber,
  canManage = false,
  canViewPasswords = false,
  showNotes = true,
  daysGone = null,
  daysRemaining = null,
  onSave,
  isSubmitting = false,
  showRenew = false,
  onRenewUsername,
  isRenewing = false,
}: SubscriberStatsTabProps) {
  const { t } = useTranslation();
  const usageDays = daysGone ?? getUsageDays(subscriber);
  const daysLeft = daysRemaining ?? getDaysUntilDisconnect(subscriber);
  const speedLabel = subscriber.speedMbps > 0 ? buildSpeedLabel(subscriber.speedMbps) : null;
  const usedMb = subscriber.totalUsage ?? 0;
  const limitMb = resolveUsageLimitMb(
    subscriber.usageLimit,
    subscriber.speedMbps,
    subscriber.speedId ?? undefined,
  );
  const canEditFirstContact = canManage && Boolean(subscriber.usernameId && subscriber.speedId);
  const showUsage = Boolean(subscriber.username && (usedMb > 0 || limitMb != null));
  const [routerName, setRouterName] = useState(subscriber.routerName ?? "");
  const [routerImageFile, setRouterImageFile] = useState<File | null>(null);
  const [routerImagePreview, setRouterImagePreview] = useState<string | null>(
    subscriber.routerImageUrl ?? null,
  );

  useEffect(() => {
    setRouterName(subscriber.routerName ?? "");
    setRouterImageFile(null);
    setRouterImagePreview(subscriber.routerImageUrl ?? null);
  }, [subscriber.id, subscriber.routerName, subscriber.routerImageUrl]);

  const appendRouterPatch = (patch: SubscriberProfileSavePatch) => {
    if (!canManage) return;
    const trimmedRouterName = routerName.trim();
    const nameChanged = trimmedRouterName !== (subscriber.routerName ?? "").trim();
    if (nameChanged) {
      patch.routerName = trimmedRouterName || null;
    }
    if (routerImageFile) {
      patch.routerImageFile = routerImageFile;
      patch.routerName = trimmedRouterName || null;
    }
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
      firstContactDate: toDateInputValue(subscriber.firstContactDate),
    },
  });

  useEffect(() => {
    reset({
      fullName: subscriber.fullName,
      phone: subscriber.phone ?? "",
      notes: subscriber.notes ?? "",
      password: subscriber.password ?? "",
      packageLine: subscriber.packageLine,
      firstContactDate: toDateInputValue(subscriber.firstContactDate),
    });
  }, [
    subscriber.lineId,
    subscriber.packageLine,
    subscriber.fullName,
    subscriber.phone,
    subscriber.notes,
    subscriber.password,
    subscriber.firstContactDate,
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

  const handleImageFileSelect = (file: File) => {
    setRouterImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setRouterImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Text className="text-sm font-semibold text-foreground">{t("subscribers.profile.cycleOverview")}</Text>
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
            label={t("subscribers.profile.stats.dataUsage")}
            value={
              showUsage ? (
                <DataUsageDisplay usedMb={usedMb} limitMb={limitMb} size="lg" />
              ) : (
                "—"
              )
            }
            hint={
              subscriber.username
                ? t("subscribers.profile.stats.dataUsageHint", { username: subscriber.username })
                : t("subscribers.profile.stats.dataUsageNoUsername")
            }
            icon={HardDrive}
            iconClassName="bg-accent/10 text-accent"
          />
        </div>
      </div>

      <ProfileSection title={t("subscribers.profile.formSection")} bodyClassName="p-0">
        <div
          className={cn(
            "flex flex-wrap items-start gap-3 border-b border-border/60 bg-gradient-to-r from-primary/5 via-transparent to-transparent px-4 py-4 sm:px-6",
            !speedLabel && "opacity-80",
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Gauge className="h-5 w-5" strokeWidth={2} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-muted-foreground">{t("subscribers.table.speed")}</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">
              {speedLabel ? t("subscribers.profile.currentSpeed", { speed: speedLabel }) : "—"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{t("subscribers.profile.speedReadOnlyHint")}</p>
          </div>
          {showRenew ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="shrink-0"
              onClick={onRenewUsername}
              disabled={isRenewing}
              isLoading={isRenewing}
            >
              <RotateCcw className="h-4 w-4" />
              {t("subscribers.username.renewUsername")}
            </Button>
          ) : null}
        </div>

        <form
          onSubmit={handleSubmit(async (values) => {
            const patch: SubscriberProfileSavePatch = {
              fullName: values.fullName.trim(),
              phone: values.phone.trim() || null,
              ...(showNotes ? { notes: values.notes.trim() || null } : {}),
            };
            const password = values.password.trim();
            const previous = (subscriber.password ?? "").trim();
            if (canManage && password !== previous) {
              patch.password = password || null;
            }
            if (canManage && values.packageLine !== subscriber.packageLine) {
              patch.packageLine = values.packageLine;
            }
            if (canEditFirstContact) {
              const nextFirstContact = values.firstContactDate.trim();
              const previousFirstContact = toDateInputValue(subscriber.firstContactDate);
              if (nextFirstContact !== previousFirstContact) {
                patch.firstContactDate = nextFirstContact || null;
                patch.usernameId = subscriber.usernameId;
                patch.usernameSpeedId = subscriber.speedId;
              }
            }
            appendRouterPatch(patch);
            await onSave?.(patch);
            setRouterImageFile(null);
          })}
          className="space-y-6 p-4 sm:p-6"
        >
          <SubscriberRouterSection
            routerName={routerName}
            imagePreview={routerImagePreview}
            canManage={canManage}
            onRouterNameChange={setRouterName}
            onImageFileSelect={handleImageFileSelect}
          />

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
            <Input
              label={t("subscribers.form.fullName")}
              {...register("fullName")}
              disabled={!canManage}
            />
            <Input label={t("subscribers.form.phone")} {...register("phone")} disabled={!canManage} />
            <div className="space-y-1">
              <Input
                label={t("subscribers.profile.firstContact")}
                type="date"
                disabled={!canEditFirstContact}
                {...register("firstContactDate", {
                  validate: (value) => {
                    if (!canEditFirstContact) return true;
                    if (!value?.trim()) return t("subscribers.profile.firstContactRequired");
                    return true;
                  },
                })}
                error={errors.firstContactDate?.message}
              />
              {canManage && !canEditFirstContact ? (
                <Text muted className="text-xs">
                  {t("subscribers.profile.firstContactNoUsername")}
                </Text>
              ) : null}
            </div>
            <Input
              label={t("subscribers.profile.disconnection")}
              value={formatDate(subscriber.disconnectionDate)}
              readOnly
              disabled
            />
          </div>

          {canManage ? (
            <div className="space-y-1">
              <Text muted className="text-xs">
                {t("subscribers.profile.passwordEditHint")}
              </Text>
            </div>
          ) : null}

          {showNotes ? (
            <Textarea
              label={t("subscribers.form.notes")}
              rows={3}
              {...register("notes")}
              disabled={!canManage}
            />
          ) : null}

          {canManage ? (
            <div className="flex justify-end border-t border-border/60 pt-4">
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
