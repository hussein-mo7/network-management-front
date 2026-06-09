import { Banknote } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/buttons";
import { Input } from "@/components/ui/forms";
import { ProfileSection } from "@/components/ui/profile";
import { Text } from "@/components/ui/typography";
import type { SubscriberProfilePatch } from "@/hooks/useSubscribers";

interface SubscriberMonthlyPriceSectionProps {
  monthlyPrice: number;
  canManage?: boolean;
  onSave?: (patch: SubscriberProfilePatch) => void | Promise<void>;
  isSubmitting?: boolean;
}

function formatPriceField(price: number): string {
  if (!Number.isFinite(price) || price < 0) return "";
  return String(price);
}

export function SubscriberMonthlyPriceSection({
  monthlyPrice,
  canManage = false,
  onSave,
  isSubmitting = false,
}: SubscriberMonthlyPriceSectionProps) {
  const { t } = useTranslation();
  const [priceInput, setPriceInput] = useState(formatPriceField(monthlyPrice));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPriceInput(formatPriceField(monthlyPrice));
    setError(null);
  }, [monthlyPrice]);

  const handleSave = async () => {
    if (!onSave) return;
    const raw = priceInput.trim();
    if (raw === "") {
      setError(t("subscribers.profile.monthlyPriceRequired"));
      return;
    }
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed < 0) {
      setError(t("subscribers.profile.monthlyPriceInvalid"));
      return;
    }
    if (parsed === monthlyPrice) return;
    setError(null);
    await onSave({ monthlyPrice: parsed });
  };

  const dirty = priceInput.trim() !== formatPriceField(monthlyPrice);

  return (
    <ProfileSection
      title={t("subscribers.profile.monthlyPriceSectionTitle")}
      description={t("subscribers.profile.monthlyPriceHint")}
      bodyClassName="p-4 sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Banknote className="h-5 w-5" strokeWidth={2} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <Input
              label={t("subscribers.profile.monthlyPriceLabel")}
              type="number"
              min={0}
              step="0.01"
              inputMode="decimal"
              dir="ltr"
              disabled={!canManage}
              value={priceInput}
              onChange={(e) => {
                setPriceInput(e.target.value);
                setError(null);
              }}
              error={error ?? undefined}
            />
            <Text muted className="mt-2 text-xs">
              {t("subscribers.profile.monthlyPriceSectionHint")}
            </Text>
          </div>
        </div>
        {canManage && onSave ? (
          <Button
            type="button"
            size="sm"
            className="w-full shrink-0 sm:w-auto"
            onClick={handleSave}
            disabled={!dirty || isSubmitting}
            isLoading={isSubmitting}
          >
            {t("common.save")}
          </Button>
        ) : null}
      </div>
    </ProfileSection>
  );
}
