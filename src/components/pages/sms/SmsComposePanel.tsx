import { Lightbulb, Send, Signal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/buttons";
import { Text } from "@/components/ui/typography";
import { SMS_MAX_LENGTH } from "@/lib/smsUtils";
import { cn } from "@/lib/cn";
import type { SmsRecipientMode, SmsTemplateId } from "@/types/sms";

const TEMPLATE_IDS: SmsTemplateId[] = ["renewal", "expired", "support", "blank"];

interface SmsComposePanelProps {
  recipientMode: SmsRecipientMode;
  message: string;
  onMessageChange: (value: string) => void;
  activeTemplate: SmsTemplateId;
  onTemplateChange: (id: SmsTemplateId) => void;
  customPhone: string;
  onCustomPhoneChange: (value: string) => void;
  recipientCount: number;
  onSend: () => void;
  isSending?: boolean;
  canSend?: boolean;
  className?: string;
}

export function SmsComposePanel({
  recipientMode,
  message,
  onMessageChange,
  activeTemplate,
  onTemplateChange,
  customPhone,
  onCustomPhoneChange,
  recipientCount,
  onSend,
  isSending = false,
  canSend = true,
  className,
}: SmsComposePanelProps) {
  const { t } = useTranslation();
  const charCount = message.length;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-surface px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Signal className="h-4 w-4" />
          <span>{t("sms.provider")}</span>
        </div>
        <span className="text-xs text-muted-foreground">{t("sms.charLimit")}</span>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
        <Text className="text-sm font-semibold">{t("sms.compose.title")}</Text>

        {recipientMode === "custom" ? (
          <div className="mt-4 space-y-1">
            <label htmlFor="sms-custom-phone" className="text-sm font-medium">
              {t("sms.compose.customPhoneLabel")}
            </label>
            <input
              id="sms-custom-phone"
              type="tel"
              value={customPhone}
              onChange={(e) => onCustomPhoneChange(e.target.value)}
              placeholder={t("sms.compose.customPhonePlaceholder")}
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border"
              dir="ltr"
            />
            <Text muted className="text-xs">{t("sms.compose.customPhoneHint")}</Text>
          </div>
        ) : (
          <Text muted className="mt-2 text-sm">
            {t("sms.compose.previewRecipients", { count: recipientCount })}
          </Text>
        )}

        <div className="mt-4 space-y-2">
          <Text className="text-xs font-medium text-muted-foreground">{t("sms.compose.templatesLabel")}</Text>
          <div className="flex flex-wrap gap-2">
            {TEMPLATE_IDS.filter((id) => id !== "blank").map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => onTemplateChange(id)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                  activeTemplate === id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {t(`sms.templates.${id}`).slice(0, 42)}
                {t(`sms.templates.${id}`).length > 42 ? "…" : ""}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="sms-message" className="text-sm font-medium">
              {t("sms.compose.messageLabel")}
            </label>
            <span
              className={cn(
                "text-xs tabular-nums",
                charCount > SMS_MAX_LENGTH ? "text-danger" : "text-muted-foreground",
              )}
            >
              {charCount} / {SMS_MAX_LENGTH}
            </span>
          </div>
          <textarea
            id="sms-message"
            rows={5}
            maxLength={SMS_MAX_LENGTH}
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder={t("sms.compose.messagePlaceholder")}
            className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={onSend} isLoading={isSending} disabled={!canSend || isSending}>
            <Send className="h-4 w-4" />
            {isSending ? t("sms.compose.sending") : t("sms.compose.send")}
          </Button>
        </div>
      </div>

      <aside className="rounded-xl border border-border bg-muted/20 p-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-warning" />
          <Text className="text-sm font-semibold">{t("sms.tips.title")}</Text>
        </div>
        <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
          <li>{t("sms.tips.item1")}</li>
          <li>{t("sms.tips.item2")}</li>
          <li>{t("sms.tips.item3")}</li>
        </ul>
        <Text muted className="mt-3 text-xs">{t("sms.tips.note")}</Text>
      </aside>
    </div>
  );
}
