import { ExternalLink, PauseCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { customerOwesMoney } from "@/lib/customerUtils";
import { formatMoney } from "@/lib/formatMoney";
import { getSubscriberInitials } from "@/lib/subscriberUtils";
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
  TableSubscriberCell,
} from "@/components/ui/data";
import { subscriberProfilePath } from "@/lib/routePaths";
import type { Customer } from "@/types/customer";
import { cn } from "@/lib/cn";
import { format, parseISO } from "date-fns";

function profilePath(lineId: string): string {
  return subscriberProfilePath(lineId, "username");
}

function formatStoppedAt(value: string): string {
  try {
    return format(parseISO(value), "yyyy-MM-dd");
  } catch {
    return value;
  }
}

interface StoppedTableProps {
  rows: Customer[];
  className?: string;
}

export function StoppedTable({ rows, className }: StoppedTableProps) {
  const { t, i18n } = useTranslation();

  if (rows.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center border border-dashed border-border px-6 py-14 text-center",
          className,
        )}
      >
        <PauseCircle className="h-8 w-8 text-muted-foreground/60" strokeWidth={1.5} />
        <p className="mt-3 text-sm text-foreground">{t("stopped.table.empty")}</p>
        <p className="mt-1 max-w-sm text-xs text-muted-foreground">{t("stopped.table.emptyHint")}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-3 lg:hidden">
        {rows.map((row) => (
          <StoppedMobileCard key={row.id} row={row} lang={i18n.language} />
        ))}
      </div>

      <div className={cn("hidden lg:block", dataTableWrapClass)}>
        <table className={cn(dataTableFixedClass, dataTableScrollMinClass)}>
          <colgroup>
            <col className="w-[24%]" />
            <col className="w-[9%]" />
            <col className="w-[13%]" />
            <col className="w-[11%]" />
            <col className="w-[13%]" />
            <col className="w-[10%]" />
          </colgroup>
          <thead>
            <tr className={dataTableHeadRowClass}>
              <th className={dataTableHeadCellClass}>{t("stopped.table.subscriber")}</th>
              <th className={dataTableHeadCellClass}>{t("stopped.table.lineId")}</th>
              <th className={dataTableHeadCellClass}>{t("stopped.table.phone")}</th>
              <th className={cn("text-end", dataTableHeadCellClass)}>
                {t("stopped.table.balance")}
              </th>
              <th className={dataTableHeadCellClass}>{t("stopped.table.stoppedAt")}</th>
              <th className={dataTableActionsHeadCellClass}>
                {t("stopped.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <StoppedDesktopRow key={row.id} row={row} lang={i18n.language} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BalanceCell({ balance, lang }: { balance: number; lang: string }) {
  const owes = customerOwesMoney({ balance });
  return (
    <span className={cn("tabular-nums font-medium", owes && "text-danger")}>
      {formatMoney(balance, lang)}
    </span>
  );
}

function StoppedDesktopRow({ row, lang }: { row: Customer; lang: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const initials = getSubscriberInitials(row.fullName);
  const owes = customerOwesMoney(row);

  const openProfile = () => navigate(profilePath(row.lineId));

  return (
    <tr className={cn("group", dataTableBodyRowClass)}>
      <td className={cn("cursor-pointer max-w-0", dataTableCellClass)} onClick={openProfile}>
        <TableSubscriberCell
          name={row.fullName}
          subtitle={
            owes
              ? `${row.facilityType} · ${t("stopped.table.owesBalance")}`
              : row.facilityType
          }
          initials={initials}
        />
      </td>
      <td className={cn("cursor-pointer", dataTableCellClass)} onClick={openProfile}>
        <LtrText className="font-mono text-xs text-muted-foreground">{row.lineId}</LtrText>
      </td>
      <td className={cn("cursor-pointer", dataTableCellClass)} onClick={openProfile}>
        {row.phone ? (
          <LtrText className="text-sm">{row.phone}</LtrText>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </td>
      <td className={cn("cursor-pointer text-end", dataTableCellClass)} onClick={openProfile}>
        <BalanceCell balance={row.balance} lang={lang} />
      </td>
      <td
        className={cn("cursor-pointer whitespace-nowrap text-muted-foreground", dataTableCellClass)}
        onClick={openProfile}
      >
        {formatStoppedAt(row.updatedAt)}
      </td>
      <td className={dataTableActionsCellClass} onClick={(e) => e.stopPropagation()}>
        <Link
          to={profilePath(row.lineId)}
          className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={t("stopped.table.openProfile")}
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </td>
    </tr>
  );
}

function StoppedMobileCard({ row, lang }: { row: Customer; lang: string }) {
  const { t } = useTranslation();
  const initials = getSubscriberInitials(row.fullName);
  const owes = customerOwesMoney(row);

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-background">
      <Link to={profilePath(row.lineId)} className="block p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted/30 text-xs font-medium text-muted-foreground">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-foreground">{row.fullName}</p>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">{row.lineId}</p>
            {owes ? (
              <p className="mt-1 text-xs text-danger">{t("stopped.table.owesBalance")}</p>
            ) : (
              <p className="mt-1 text-xs text-muted-foreground">{t("stopped.table.balanceCleared")}</p>
            )}
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs font-medium text-muted-foreground">{t("stopped.table.phone")}</dt>
            <dd className="mt-1" dir="ltr">
              {row.phone ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-muted-foreground">{t("stopped.table.stoppedAt")}</dt>
            <dd className="mt-1 text-muted-foreground">{formatStoppedAt(row.updatedAt)}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs font-medium text-muted-foreground">{t("stopped.table.balance")}</dt>
            <dd className="mt-1">
              <BalanceCell balance={row.balance} lang={lang} />
            </dd>
          </div>
        </dl>
      </Link>

      <div className="flex items-center justify-end border-t border-border bg-muted/20 px-4 py-2.5">
        <Link
          to={profilePath(row.lineId)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline"
        >
          {t("stopped.table.openProfile")}
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
