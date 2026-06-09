import { MessageSquare, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/buttons";
import { ProfileSection } from "@/components/ui/profile";
import { Text } from "@/components/ui/typography";
import { useSendSmsMutation, useSmsTemplatesQuery } from "@/hooks/useSms";
import { smsPath } from "@/lib/routePaths";
import { SMS_MAX_LENGTH } from "@/lib/smsUtils";
import type { Subscriber } from "@/types/subscriber";
import type { SmsTemplate } from "@/types/sms";
import { ApiError } from "@/types/api";
import { cn } from "@/lib/cn";

interface SubscriberSmsTabProps {
  subscriber: Subscriber;
  canManage?: boolean;
}

export function SubscriberSmsTab({ subscriber, canManage = false }: SubscriberSmsTabProps) {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [activeTemplateId, setActiveTemplateId] = useState<number | null>(null);

  const templatesQuery = useSmsTemplatesQuery();
  const templates = templatesQuery.data ?? [];
  const sendMutation = useSendSmsMutation();

  const phone = subscriber.phone?.trim() ?? "";
  const canSend = canManage && Boolean(phone) && message.trim().length > 0;

  useEffect(() => {
    if (!templates.length || activeTemplateId != null) return;
    setActiveTemplateId(templates[0].id);
    setMessage(templates[0].body);
  }, [templates, activeTemplateId]);

  const handleTemplateChange = (template: SmsTemplate) => {
    setActiveTemplateId(template.id);
    setMessage(template.body);
  };

  const handleSend = async () => {
    if (!canSend) return;

    const trimmed = message.trim();
    if (!trimmed) {
      toast.error(t("sms.toast.noMessage"));
      return;
    }

    try {
      const result = await sendMutation.mutateAsync({
        recipientType: "subscribers",
        subscriberIds: [subscriber.id],
        phones: [phone],
        message: trimmed,
        templateId: activeTemplateId ?? undefined,
      });

      if (result.failedCount > 0) {
        toast.warning(t("sms.toast.partial", { sent: result.sentCount, failed: result.failedCount }));
      } else {
        toast.success(t("subscribers.profile.sms.sendSuccess"));
      }
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("common.unexpectedError"));
    }
  };

  return (
    <div className="space-y-6">
      <ProfileSection
        title={t("subscribers.profile.sms.title")}
        description={t("subscribers.profile.sms.subtitle")}
      >
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-border/70 bg-muted/20 px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Phone className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <Text className="text-xs font-medium text-muted-foreground">
              {t("subscribers.table.phone")}
            </Text>
            <Text className="mt-0.5 font-medium" dir="ltr">
              {phone || t("subscribers.profile.sms.noPhone")}
            </Text>
          </div>
        </div>

        {!phone ? (
          <Text muted className="text-sm">{t("subscribers.profile.sms.noPhoneHint")}</Text>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Text className="text-xs font-medium text-muted-foreground">
                  {t("sms.compose.templatesLabel")}
                </Text>
                <Link
                  to={smsPath("templates")}
                  className="text-xs font-medium text-foreground hover:underline"
                >
                  {t("sms.compose.manageTemplates")}
                </Link>
              </div>
              {templates.length === 0 ? (
                <Text muted className="text-sm">{t("subscribers.profile.sms.noTemplates")}</Text>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => handleTemplateChange(template)}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                        activeTemplateId === template.id
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="subscriber-sms-message" className="text-sm font-medium">
                  {t("sms.compose.messageLabel")}
                </label>
                <span
                  className={cn(
                    "text-xs tabular-nums",
                    message.length > SMS_MAX_LENGTH ? "text-danger" : "text-muted-foreground",
                  )}
                >
                  {message.length} / {SMS_MAX_LENGTH}
                </span>
              </div>
              <textarea
                id="subscriber-sms-message"
                rows={5}
                maxLength={SMS_MAX_LENGTH}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!canManage}
                placeholder={t("sms.compose.messagePlaceholder")}
                className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border disabled:opacity-60"
              />
            </div>

            {canManage ? (
              <div className="flex justify-end border-t border-border/60 pt-4">
                <Button onClick={handleSend} isLoading={sendMutation.isPending} disabled={!canSend}>
                  <Send className="h-4 w-4" />
                  {sendMutation.isPending
                    ? t("sms.compose.sending")
                    : t("subscribers.profile.sms.send")}
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </ProfileSection>

      <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/15 px-4 py-3">
        <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        <Text muted className="text-xs">{t("subscribers.profile.sms.serverHint")}</Text>
      </div>
    </div>
  );
}
