import { format } from "date-fns";
import type { TFunction } from "i18next";
import type { SupportTicket } from "@/types/supportTicket";

function isMobileDevice(): boolean {
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

/** Opens an external URL in a new tab without losing the user-gesture chain. */
function openExternalUrl(url: string): void {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

/** Set in `.env` — WhatsApp group invite (mobile opens group in app). */
export function getWhatsAppGroupInviteUrl(): string | null {
  const raw = import.meta.env.VITE_WHATSAPP_GROUP_INVITE_URL?.trim();
  if (!raw) return null;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `https://${raw}`;
}

/** Optional label shown in hints — e.g. WePaltel_Project */
export function getWhatsAppGroupName(): string | null {
  const raw = import.meta.env.VITE_WHATSAPP_GROUP_NAME?.trim();
  return raw || null;
}

export function buildSupportTicketWhatsAppMessage(ticket: SupportTicket, t: TFunction): string {
  const created = format(new Date(ticket.createdAt), "yyyy-MM-dd HH:mm");

  return [
    "━━━━━━━━━━━━━━━━━━━━",
    `🎫 *${t("support.whatsapp.messageHeader")}*`,
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    `📋 *${t("support.table.ticket")}*`,
    ticket.ticketNumber,
    "",
    `📌 *${t("support.table.title")}*`,
    ticket.title,
    "",
    `📝 *${t("support.form.description")}*`,
    ticket.description,
    "",
    `👤 *${t("support.table.subscriber")}*`,
    ticket.subscriberName,
    "",
    `📞 *${t("support.form.subscriberPhone")}*`,
    ticket.subscriberPhone,
    "",
    `📡 *${t("support.table.channel")}:* ${t(`support.channel.${ticket.channel}`)}`,
    `⚡ *${t("support.table.priority")}:* ${t(`support.priority.${ticket.priority}`)}`,
    `🔖 *${t("support.table.status")}:* ${t(`support.status.${ticket.status}`)}`,
    `👨‍💼 *${t("support.form.assignedTo")}:* ${ticket.assignedTo}`,
    `🕐 *${t("support.table.createdAt")}:* ${created}`,
    "",
    "━━━━━━━━━━━━━━━━━━━━",
  ].join("\n");
}

function buildComposeUrl(text: string): string {
  const encoded = encodeURIComponent(text);
  return isMobileDevice()
    ? `https://wa.me/?text=${encoded}`
    : `https://web.whatsapp.com/send?text=${encoded}`;
}

export type WhatsAppShareMode = "group" | "compose";

/**
 * Shares a ticket to WhatsApp.
 *
 * Desktop: opens WhatsApp Web compose with the message pre-filled — pick your
 * support group from recent chats (avoids the group-invite login page).
 *
 * Mobile: opens the configured group invite link when set; message is copied to paste.
 */
export function openSupportTicketWhatsApp(
  ticket: SupportTicket,
  t: TFunction,
): WhatsAppShareMode {
  const text = buildSupportTicketWhatsAppMessage(ticket, t);
  const groupUrl = getWhatsAppGroupInviteUrl();
  const mobile = isMobileDevice();

  let mode: WhatsAppShareMode = "compose";

  if (groupUrl && mobile) {
    openExternalUrl(groupUrl);
    mode = "group";
  } else {
    openExternalUrl(buildComposeUrl(text));
    mode = "compose";
  }

  void navigator.clipboard.writeText(text).catch(() => {});

  return mode;
}
