import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { SmsAudienceFilters, SmsComposePanel, SmsRecipientTable } from "@/components/pages/sms";
import { Button } from "@/components/ui/buttons";
import { LoadingState } from "@/components/ui/feedback";
import { Heading, Text } from "@/components/ui/typography";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { useSendSmsMutation, useSmsRecipientsQuery } from "@/hooks/useSms";
import type { SmsAudienceFilter, SmsRecipientMode, SmsTemplateId } from "@/types/sms";
import { ApiError } from "@/types/api";

export function SmsPage() {
  const { t } = useTranslation();
  const { canManage } = useRoleAccess();

  const [recipientMode, setRecipientMode] = useState<SmsRecipientMode>("subscribers");
  const [audience, setAudience] = useState<SmsAudienceFilter>("expires1Day");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [message, setMessage] = useState("");
  const [activeTemplate, setActiveTemplate] = useState<SmsTemplateId>("renewal");
  const [customPhone, setCustomPhone] = useState("");

  const listAudience: SmsAudienceFilter =
    recipientMode === "customers" ? "customers" : audience;

  const {
    data: filteredRows = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useSmsRecipientsQuery(listAudience, search, recipientMode !== "custom");

  const sendMutation = useSendSmsMutation();

  useEffect(() => {
    setSelectedIds(new Set());
  }, [audience, search, recipientMode]);

  useEffect(() => {
    if (activeTemplate === "blank") return;
    setMessage(t(`sms.templates.${activeTemplate}`));
  }, [activeTemplate, t]);

  const selectedRecipients = useMemo(
    () => filteredRows.filter((r) => selectedIds.has(r.id)),
    [filteredRows, selectedIds],
  );

  const toggleRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = (checked: boolean) => {
    if (checked) setSelectedIds(new Set(filteredRows.map((r) => r.id)));
    else setSelectedIds(new Set());
  };

  const handleSend = async () => {
    if (!canManage) return;

    const trimmed = message.trim();
    if (!trimmed) {
      toast.error(t("sms.toast.noMessage"));
      return;
    }

    try {
      if (recipientMode === "custom") {
        if (!customPhone.trim()) {
          toast.error(t("sms.toast.noPhone"));
          return;
        }
        const result = await sendMutation.mutateAsync({
          recipientType: "custom",
          phone: customPhone.trim(),
          message: trimmed,
        });
        toast.success(t("sms.toast.sent", { count: result.sentCount }));
        return;
      }

      if (selectedRecipients.length === 0) {
        toast.error(t("sms.toast.noRecipients"));
        return;
      }

      const result = await sendMutation.mutateAsync({
        recipientType: "subscribers",
        subscriberIds: selectedRecipients.map((r) => r.id),
        phones: selectedRecipients.map((r) => r.phone!).filter(Boolean),
        message: trimmed,
      });

      if (result.failedCount > 0) {
        toast.warning(t("sms.toast.partial", { sent: result.sentCount, failed: result.failedCount }));
      } else {
        toast.success(t("sms.toast.sent", { count: result.sentCount }));
      }
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("common.unexpectedError"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="min-w-0">
        <Heading as="h1">{t("sms.title")}</Heading>
        <Text muted className="mt-2 max-w-3xl">
          {t("sms.subtitle")}
        </Text>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
        <section className="space-y-4 rounded-xl border border-border bg-surface p-4 sm:p-6">
          <SmsAudienceFilters
            search={search}
            onSearchChange={setSearch}
            audience={audience}
            onAudienceChange={setAudience}
            recipientMode={recipientMode}
            onRecipientModeChange={setRecipientMode}
          />

          {recipientMode === "subscribers" || recipientMode === "customers" ? (
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Text muted className="text-sm">
                  {t("sms.table.sectionSubtitle", {
                    count: filteredRows.length,
                    selected: selectedIds.size,
                  })}
                </Text>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleAll(true)}>
                    {t("sms.table.selectAll")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedIds(new Set())}
                    disabled={selectedIds.size === 0}
                  >
                    {t("sms.table.clearSelection")}
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <LoadingState layout="table" variant="section" />
              ) : isError ? (
                <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center">
                  <Text muted>
                    {error instanceof ApiError ? error.message : t("common.unexpectedError")}
                  </Text>
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
                    {t("common.retry")}
                  </Button>
                </div>
              ) : (
                <SmsRecipientTable
                  rows={filteredRows}
                  selectedIds={selectedIds}
                  onToggleRow={toggleRow}
                  onToggleAll={toggleAll}
                />
              )}
            </>
          ) : null}
        </section>

        <SmsComposePanel
          recipientMode={recipientMode}
          message={message}
          onMessageChange={(value) => {
            setMessage(value);
            setActiveTemplate("blank");
          }}
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
          customPhone={customPhone}
          onCustomPhoneChange={setCustomPhone}
          recipientCount={selectedRecipients.length}
          onSend={handleSend}
          isSending={sendMutation.isPending}
          canSend={canManage}
        />
      </div>
    </div>
  );
}
