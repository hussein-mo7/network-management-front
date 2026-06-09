import { useTranslation } from "react-i18next";
import { Textarea } from "@/components/ui/forms";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

interface UsernameChangeCauseFieldProps {
  value: string;
  onChange: (text: string) => void;
  error?: string;
  className?: string;
}

export function UsernameChangeCauseField({
  value,
  onChange,
  error,
  className,
}: UsernameChangeCauseFieldProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-2", className)}>
      <div>
        <Text className="text-sm font-medium">{t("subscribers.username.changeCauseTitle")}</Text>
        <Text muted className="mt-1 text-xs">
          {t("subscribers.username.changeCauseHint")}
        </Text>
      </div>
      <Textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("subscribers.username.changeCausePlaceholder")}
        error={error}
      />
    </div>
  );
}
