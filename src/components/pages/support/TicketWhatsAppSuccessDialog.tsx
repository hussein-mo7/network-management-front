import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { WhatsAppIcon } from "@/components/pages/support/WhatsAppIcon";
import { Button } from "@/components/ui/buttons";
import { Modal } from "@/components/ui/modals";
import { Text } from "@/components/ui/typography";
import {
  buildSupportTicketWhatsAppMessage,
  getWhatsAppGroupInviteUrl,
  getWhatsAppGroupName,
  openSupportTicketWhatsApp,
} from "@/lib/supportWhatsApp";
import { toast } from "sonner";
import type { SupportTicket } from "@/types/supportTicket";

interface TicketWhatsAppSuccessDialogProps {
  ticket: SupportTicket | null;
  onClose: () => void;
}

export function TicketWhatsAppSuccessDialog({ ticket, onClose }: TicketWhatsAppSuccessDialogProps) {
  const { t } = useTranslation();

  if (!ticket) return null;

  const preview = buildSupportTicketWhatsAppMessage(ticket, t);
  const groupName = getWhatsAppGroupName();
  const hasGroupLink = Boolean(getWhatsAppGroupInviteUrl());

  return (
    <Modal
      open={Boolean(ticket)}
      onClose={onClose}
      title={t("support.whatsapp.successTitle")}
      className="sm:max-w-lg"
    >
      <div className="space-y-5 text-center sm:text-start">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-7 w-7" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <Text muted className="text-sm">
              {t("support.whatsapp.successSubtitle", { ticket: ticket.ticketNumber })}
            </Text>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-4 text-start">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {t("support.whatsapp.previewLabel")}
          </p>
          <pre
            dir="auto"
            className="mt-2 max-h-48 overflow-y-auto whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-foreground"
          >
            {preview}
          </pre>
        </div>

        <Text muted className="text-xs">
          {hasGroupLink && groupName
            ? t("support.whatsapp.openHintComposeGroup", { group: groupName })
            : hasGroupLink
              ? t("support.whatsapp.openHintGroup")
              : t("support.whatsapp.openHint")}
        </Text>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            className="gap-2 bg-[#25D366] text-white hover:bg-[#20BD5A]"
            onClick={() => {
              const mode = openSupportTicketWhatsApp(ticket, t);
              if (mode === "group") {
                toast.success(t("support.whatsapp.copiedAndOpened"));
              } else if (groupName) {
                toast.success(t("support.whatsapp.composeWithGroup", { group: groupName }));
              } else {
                toast.success(t("support.whatsapp.composeOpened"));
              }
              onClose();
            }}
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t("support.whatsapp.sendToGroup")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
