import type { ReactNode } from "react";
import { ExternalLink, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buttonBaseClassName, buttonSizes, buttonVariants } from "@/components/ui/buttons/buttonStyles";
import {
  dataTableActionsCellClass,
  dataTableActionsHeadCellClass,
  dataTableBodyRowClass,
  dataTableCellClass,
  dataTableFixedClass,
  dataTableHeadCellClass,
  dataTableHeadRowClass,
  dataTableScrollMinClass,
  dataTableWrapClass,
  LtrText,
} from "@/components/ui/data";
import { subscriberProfilePath } from "@/lib/routePaths";
import type { OnlineUser } from "@/types/onlineUser";
import { cn } from "@/lib/cn";

interface OnlineUsersTableProps {
  rows: OnlineUser[];
  hasSearch: boolean;
  className?: string;
}

const externalLinkClass =
  "text-primary underline-offset-2 transition-colors hover:text-primary/80 hover:underline";

export function OnlineUsersTable({ rows, hasSearch, className }: OnlineUsersTableProps) {
  const { t } = useTranslation();

  if (rows.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center border border-dashed border-border px-6 py-14 text-center",
          className,
        )}
      >
        <Wifi className="h-8 w-8 text-muted-foreground/60" strokeWidth={1.5} />
        <p className="mt-3 text-sm text-foreground">
          {hasSearch ? t("onlineUsers.table.noResults") : t("onlineUsers.table.empty")}
        </p>
        {!hasSearch ? (
          <p className="mt-1 max-w-sm text-xs text-muted-foreground">{t("onlineUsers.table.emptyHint")}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-3 lg:hidden">
        {rows.map((row, index) => (
          <OnlineUserMobileCard key={`${row.username}-${row.ipAddress}`} row={row} index={index + 1} />
        ))}
      </div>

      <div className={cn("hidden lg:block", dataTableWrapClass)}>
        <table className={cn(dataTableFixedClass, dataTableScrollMinClass)}>
          <colgroup>
            <col className="w-[4%]" />
            <col className="w-[14%]" />
            <col className="w-[16%]" />
            <col className="w-[12%]" />
            <col className="w-[14%]" />
            <col className="w-[8%]" />
            <col className="w-[10%]" />
            <col className="w-[8%]" />
            <col className="w-[10%]" />
            <col className="w-[4%]" />
          </colgroup>
          <thead>
            <tr className={dataTableHeadRowClass}>
              <th className={dataTableHeadCellClass}>{t("onlineUsers.table.index")}</th>
              <th className={dataTableHeadCellClass}>{t("onlineUsers.table.username")}</th>
              <th className={dataTableHeadCellClass}>{t("onlineUsers.table.fullName")}</th>
              <th className={dataTableHeadCellClass}>{t("onlineUsers.table.ipAddress")}</th>
              <th className={dataTableHeadCellClass}>{t("onlineUsers.table.callerId")}</th>
              <th className={dataTableHeadCellClass}>{t("onlineUsers.table.service")}</th>
              <th className={dataTableHeadCellClass}>{t("onlineUsers.table.uptime")}</th>
              <th className={dataTableHeadCellClass}>{t("onlineUsers.table.status")}</th>
              <th className={dataTableHeadCellClass}>{t("onlineUsers.table.updatedAt")}</th>
              <th className={dataTableActionsHeadCellClass} aria-hidden />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.username}-${row.ipAddress}`} className={dataTableBodyRowClass}>
                <td className={cn("text-muted-foreground", dataTableCellClass)}>{index + 1}</td>
                <td className={dataTableCellClass}>
                  <SubscriberProfileLink lineId={row.lineId} className="font-mono text-sm font-medium">
                    {row.username}
                  </SubscriberProfileLink>
                </td>
                <td className={dataTableCellClass}>
                  {row.fullName ? (
                    <SubscriberProfileLink lineId={row.lineId} className="text-sm">
                      {row.fullName}
                    </SubscriberProfileLink>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className={dataTableCellClass}>
                  {row.ipAddress ? (
                    <a
                      href={`http://${row.ipAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={externalLinkClass}
                    >
                      <LtrText className="font-mono text-sm">{row.ipAddress}</LtrText>
                    </a>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className={dataTableCellClass}>
                  <LtrText className="font-mono text-xs">{row.callerId || "—"}</LtrText>
                </td>
                <td className={dataTableCellClass}>
                  <LtrText className="text-sm uppercase">{row.service}</LtrText>
                </td>
                <td className={dataTableCellClass}>
                  <LtrText className="text-sm">{row.uptime || "—"}</LtrText>
                </td>
                <td className={dataTableCellClass}>
                  <OnlineStatusBadge />
                </td>
                <td className={dataTableCellClass}>
                  <LtrText className="text-xs text-muted-foreground">{row.lastUpdated}</LtrText>
                </td>
                <td className={dataTableActionsCellClass}>
                  {row.lineId ? (
                    <Link
                      to={subscriberProfilePath(row.lineId, "stats")}
                      className={cn(buttonBaseClassName, buttonVariants.ghost, buttonSizes.sm, "mx-auto h-8 w-8 p-0")}
                      title={t("onlineUsers.table.openProfile")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SubscriberProfileLink({
  lineId,
  children,
  className,
}: {
  lineId?: string | null;
  children: ReactNode;
  className?: string;
}) {
  if (!lineId) {
    return <span className={className}>{children}</span>;
  }

  return (
    <Link
      to={subscriberProfilePath(lineId, "stats")}
      className={cn("text-foreground hover:text-primary hover:underline", className)}
    >
      {children}
    </Link>
  );
}

function OnlineStatusBadge() {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
      {t("onlineUsers.table.online")}
    </span>
  );
}

function OnlineUserMobileCard({ row, index }: { row: OnlineUser; index: number }) {
  const { t } = useTranslation();

  return (
    <article className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">#{index}</p>
          <SubscriberProfileLink lineId={row.lineId} className="mt-1 block font-mono text-sm font-semibold">
            {row.username}
          </SubscriberProfileLink>
          {row.fullName ? (
            <SubscriberProfileLink lineId={row.lineId} className="mt-1 block text-sm">
              {row.fullName}
            </SubscriberProfileLink>
          ) : null}
        </div>
        <OnlineStatusBadge />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">{t("onlineUsers.table.ipAddress")}</dt>
          <dd className="mt-0.5">
            {row.ipAddress ? (
              <a href={`http://${row.ipAddress}`} target="_blank" rel="noopener noreferrer" className={externalLinkClass}>
                <LtrText className="font-mono text-xs">{row.ipAddress}</LtrText>
              </a>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">{t("onlineUsers.table.uptime")}</dt>
          <dd className="mt-0.5">
            <LtrText className="text-xs">{row.uptime || "—"}</LtrText>
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs text-muted-foreground">{t("onlineUsers.table.callerId")}</dt>
          <dd className="mt-0.5">
            <LtrText className="font-mono text-xs">{row.callerId || "—"}</LtrText>
          </dd>
        </div>
      </dl>

      {row.lineId ? (
        <Link
          to={subscriberProfilePath(row.lineId, "stats")}
          className={cn(
            buttonBaseClassName,
            buttonVariants.outline,
            buttonSizes.sm,
            "mt-4 w-full",
          )}
        >
          <ExternalLink className="h-4 w-4" />
          {t("onlineUsers.table.openProfile")}
        </Link>
      ) : null}
    </article>
  );
}
