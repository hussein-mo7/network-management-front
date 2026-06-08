import { format, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  dataTableBodyRowClass,
  dataTableCellClass,
  dataTableFixedClass,
  dataTableHeadCellClass,
  dataTableHeadRowClass,
  dataTableWrapClass,
  LtrText,
} from "@/components/ui/data";
import { cn } from "@/lib/cn";
import { subscriberProfilePath } from "@/lib/routePaths";
import type { SmsLog } from "@/types/sms";

interface SmsLogsTableProps {
  rows: SmsLog[];
}

function formatWhen(value: string): string {
  try {
    return format(parseISO(value), "yyyy-MM-dd HH:mm");
  } catch {
    return value;
  }
}

export function SmsLogsTable({ rows }: SmsLogsTableProps) {
  const { t } = useTranslation();

  if (rows.length === 0) {
    return (
      <div className="border border-dashed border-border px-6 py-14 text-center text-sm text-muted-foreground">
        {t("sms.logs.empty")}
      </div>
    );
  }

  return (
    <div className={dataTableWrapClass}>
      <table className={dataTableFixedClass}>
        <thead>
          <tr className={dataTableHeadRowClass}>
            <th className={dataTableHeadCellClass}>{t("sms.logs.sentAt")}</th>
            <th className={dataTableHeadCellClass}>{t("sms.logs.sentBy")}</th>
            <th className={dataTableHeadCellClass}>{t("sms.logs.recipient")}</th>
            <th className={dataTableHeadCellClass}>{t("sms.logs.phone")}</th>
            <th className={dataTableHeadCellClass}>{t("sms.logs.message")}</th>
            <th className={dataTableHeadCellClass}>{t("sms.logs.status")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className={dataTableBodyRowClass}>
              <td className={cn(dataTableCellClass, "whitespace-nowrap text-xs text-muted-foreground")}>
                {formatWhen(row.createdAt)}
              </td>
              <td className={dataTableCellClass}>
                <LtrText className="text-sm font-medium">
                  {row.sentByUsername ?? row.sentByName ?? "—"}
                </LtrText>
              </td>
              <td className={dataTableCellClass}>
                {row.subscriberLineId ? (
                  <Link
                    to={subscriberProfilePath(row.subscriberLineId, "stats")}
                    className="text-sm hover:underline"
                  >
                    {row.subscriberName ?? row.subscriberLineId}
                  </Link>
                ) : (
                  <span className="text-sm text-muted-foreground">{t("sms.logs.customRecipient")}</span>
                )}
              </td>
              <td className={dataTableCellClass}>
                <LtrText className="text-sm">{row.phone}</LtrText>
              </td>
              <td className={cn(dataTableCellClass, "max-w-[200px] truncate text-sm")} title={row.message}>
                {row.message}
              </td>
              <td className={dataTableCellClass}>
                <span
                  className={
                    row.status === "sent"
                      ? "text-xs font-medium text-success"
                      : "text-xs font-medium text-danger"
                  }
                >
                  {row.status === "sent" ? t("sms.logs.statusSent") : t("sms.logs.statusFailed")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
