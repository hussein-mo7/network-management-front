import { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  SmsAudienceFilters,
  SmsComposePanel,
  SmsLogsTable,
  SmsRecipientTable,
  SmsSectionNav,
  SmsTemplatesPanel,
} from "@/components/pages/sms";
import { Button } from "@/components/ui/buttons";
import { LoadingState } from "@/components/ui/feedback";
import { Heading, Text } from "@/components/ui/typography";
import {
  useSendSmsMutation,
  useSmsLogsQuery,
  useSmsRecipientsQuery,
  useSmsTemplatesQuery,
} from "@/hooks/useSms";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { smsPath, type SmsSection } from "@/lib/routePaths";
import type { SmsAudienceFilter, SmsRecipientMode, SmsTemplate } from "@/types/sms";
import { ApiError } from "@/types/api";

const SMS_SECTIONS: SmsSection[] = ["send", "logs", "templates"];

export function SmsPage() {
  const { t } = useTranslation();
  const { canManage } = useRoleAccess();
  const { section: sectionParam } = useParams<{ section?: string }>();
  const section: SmsSection =
    sectionParam && SMS_SECTIONS.includes(sectionParam as SmsSection)
      ? (sectionParam as SmsSection)
      : "send";

  if (sectionParam && !SMS_SECTIONS.includes(sectionParam as SmsSection)) {
    return <Navigate to={smsPath("send")} replace />;
  }

  const [recipientMode, setRecipientMode] = useState<SmsRecipientMode>("subscribers");
  const [audience, setAudience] = useState<SmsAudienceFilter>("expires1Day");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [message, setMessage] = useState("");
  const [activeTemplateId, setActiveTemplateId] = useState<number | null>(null);
  const [customPhone, setCustomPhone] = useState("");
  const [logsPage, setLogsPage] = useState(1);

  const listAudience: SmsAudienceFilter =
    recipientMode === "customers" ? "customers" : audience;

  const templatesQuery = useSmsTemplatesQuery();
  const templates = templatesQuery.data ?? [];

  const {
    data: filteredRows = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useSmsRecipientsQuery(listAudience, search, section === "send" && recipientMode !== "custom");

  const logsQuery = useSmsLogsQuery(logsPage);
  const sendMutation = useSendSmsMutation();

  useEffect(() => {
    setSelectedIds(new Set());
  }, [audience, search, recipientMode]);

  useEffect(() => {
    if (!templates.length || activeTemplateId != null) return;
    setActiveTemplateId(templates[0].id);
    setMessage(templates[0].body);
  }, [templates, activeTemplateId]);

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

  const handleTemplateChange = (template: SmsTemplate) => {
    setActiveTemplateId(template.id);
    setMessage(template.body);
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
          templateId: activeTemplateId ?? undefined,
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
        templateId: activeTemplateId ?? undefined,
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

      <SmsSectionNav />

      {section === "send" ? (
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
            onMessageChange={setMessage}
            templates={templates}
            activeTemplateId={activeTemplateId}
            onTemplateChange={handleTemplateChange}
            customPhone={customPhone}
            onCustomPhoneChange={setCustomPhone}
            recipientCount={selectedRecipients.length}
            onSend={handleSend}
            isSending={sendMutation.isPending}
            canSend={canManage}
          />
        </div>
      ) : null}

      {section === "logs" ? (
        <section className="space-y-4 rounded-xl border border-border bg-surface p-4 sm:p-6">
          <Text muted className="text-sm">{t("sms.logs.subtitle")}</Text>
          {logsQuery.isLoading ? (
            <LoadingState layout="table" variant="section" />
          ) : logsQuery.isError ? (
            <div className="text-center">
              <Text muted>{t("common.unexpectedError")}</Text>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => logsQuery.refetch()}>
                {t("common.retry")}
              </Button>
            </div>
          ) : (
            <>
              <SmsLogsTable rows={logsQuery.data?.items ?? []} />
              {(logsQuery.data?.total ?? 0) > (logsQuery.data?.limit ?? 50) ? (
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={logsPage <= 1}
                    onClick={() => setLogsPage((p) => Math.max(1, p - 1))}
                  >
                    {t("sms.logs.previous")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={logsPage * (logsQuery.data?.limit ?? 50) >= (logsQuery.data?.total ?? 0)}
                    onClick={() => setLogsPage((p) => p + 1)}
                  >
                    {t("sms.logs.next")}
                  </Button>
                </div>
              ) : null}
            </>
          )}
        </section>
      ) : null}

      {section === "templates" ? (
        <section className="rounded-xl border border-border bg-surface p-4 sm:p-6">
          <SmsTemplatesPanel
            templates={templates}
            canManage={canManage}
            isLoading={templatesQuery.isLoading}
          />
        </section>
      ) : null}
    </div>
  );
}
