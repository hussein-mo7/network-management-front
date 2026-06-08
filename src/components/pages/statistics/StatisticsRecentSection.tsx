import type { ReactNode } from "react";
import { format, parseISO } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { customerProfilePath, subscriberProfilePath } from "@/lib/routePaths";
import { Heading, Text } from "@/components/ui/typography";
import { LtrText } from "@/components/ui/data";
import {
  dataTableBodyRowClass,
  dataTableCellClass,
  dataTableClass,
  dataTableHeadCellClass,
  dataTableHeadRowClass,
  dataTableWrapClass,
} from "@/components/ui/data";
import type { RecentSubscriberRow, UsernameChangeRow } from "@/types/statistics";

interface StatisticsRecentSectionProps {
  newSubscribers: RecentSubscriberRow[];
  usernameChanges: UsernameChangeRow[];
}

function formatDateTime(iso: string, lang: string): string {
  const locale = lang.startsWith("ar") ? ar : enUS;
  try {
    return format(parseISO(iso), "dd/MM/yyyy HH:mm", { locale });
  } catch {
    return iso;
  }
}

export function StatisticsRecentSection({
  newSubscribers,
  usernameChanges,
}: StatisticsRecentSectionProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <RecentTable
        title={t("statistics.recent.newSubscribersTitle")}
        subtitle={t("statistics.recent.newSubscribersSub")}
        empty={t("statistics.recent.emptyNew")}
        headers={[
          t("statistics.recent.name"),
          t("statistics.recent.lineId"),
          t("statistics.recent.phone"),
          t("statistics.recent.addedAt"),
        ]}
        rows={newSubscribers.map((row) => ({
          key: row.lineId,
          to: customerProfilePath(row.lineId),
          cells: [
            row.fullName,
            <LtrText key="line">{row.lineId}</LtrText>,
            <LtrText key="phone">{row.phone ?? "—"}</LtrText>,
            formatDateTime(row.createdAt, lang),
          ],
        }))}
      />

      <RecentTable
        title={t("statistics.recent.usernameChangesTitle")}
        subtitle={t("statistics.recent.usernameChangesSub")}
        empty={t("statistics.recent.emptyChanges")}
        headers={[
          t("statistics.recent.name"),
          t("statistics.recent.oldUsername"),
          t("statistics.recent.currentUsername"),
          t("statistics.recent.changedAt"),
        ]}
        rows={usernameChanges.map((row) => ({
          key: String(row.id),
          to: row.lineId ? subscriberProfilePath(row.lineId, "stats") : "#",
          cells: [
            row.fullName,
            <LtrText key="old">{row.oldUsername}</LtrText>,
            <LtrText key="cur">{row.currentUsername}</LtrText>,
            formatDateTime(row.changedAt, lang),
          ],
        }))}
      />
    </div>
  );
}

function RecentTable({
  title,
  subtitle,
  empty,
  headers,
  rows,
}: {
  title: string;
  subtitle: string;
  empty: string;
  headers: string[];
  rows: Array<{ key: string; to: string; cells: ReactNode[] }>;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="border-b border-border px-4 py-4 sm:px-6">
        <Heading as="h2" className="text-lg">
          {title}
        </Heading>
        <Text muted className="mt-1 text-sm">
          {subtitle}
        </Text>
      </div>

      {rows.length === 0 ? (
        <p className="px-6 py-10 text-center text-sm text-muted-foreground">{empty}</p>
      ) : (
        <div className={dataTableWrapClass}>
          <table className={dataTableClass}>
            <thead>
              <tr className={dataTableHeadRowClass}>
                {headers.map((h) => (
                  <th key={h} className={dataTableHeadCellClass}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className={dataTableBodyRowClass}>
                  {row.cells.map((cell, idx) => (
                    <td key={`${row.key}-${idx}`} className={dataTableCellClass}>
                      {idx === 0 ? (
                        <Link to={row.to} className="font-medium text-primary hover:underline">
                          {cell}
                        </Link>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
