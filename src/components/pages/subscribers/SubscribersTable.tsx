import { ExternalLink, Pencil, Trash2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SubscriberStatusBadge } from "@/components/pages/subscribers/SubscriberStatusBadge";
import { Button } from "@/components/ui/buttons";
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
  MaskedPasswordCell,
  TableSubscriberCell,
} from "@/components/ui/data";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import {
  buildSpeedLabel,
  getDaysUntilDisconnect,
  getSubscriberInitials,
  getSubscriberListStatus,
} from "@/lib/subscriberUtils";
import type { Subscriber } from "@/types/subscriber";
import { subscriberProfilePath } from "@/lib/routePaths";
import { cn } from "@/lib/cn";
import { format, parseISO } from "date-fns";

interface SubscribersTableProps {
  rows: Subscriber[];
  selectedIds: Set<number>;
  onToggleRow: (id: number) => void;
  onToggleAll: (checked: boolean) => void;
  onEdit?: (row: Subscriber) => void;
  onDelete?: (row: Subscriber) => void;
  showCheckboxes?: boolean;
  className?: string;
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  try {
    return format(parseISO(value), "yyyy-MM-dd");
  } catch {
    return value;
  }
}

function profilePath(lineId: string): string {
  return subscriberProfilePath(lineId, "stats");
}

export function SubscribersTable({
  rows,
  selectedIds,
  onToggleRow,
  onToggleAll,
  onEdit,
  onDelete,
  showCheckboxes = false,
  className,
}: SubscribersTableProps) {
  const { t } = useTranslation();
  const { canViewPasswords } = useRoleAccess();
  const allSelected = rows.length > 0 && rows.every((r) => selectedIds.has(r.id));

  const columnWidths = [
    ...(showCheckboxes ? ["w-[3%]"] : []),
    "w-[15%]",
    "w-[7%]",
    "w-[10%]",
    "w-[9%]",
    ...(canViewPasswords ? ["w-[8%]"] : []),
    "w-[8%]",
    "w-[7%]",
    "w-[10%]",
    "w-[7%]",
    showCheckboxes ? "w-[9%]" : "w-[11%]",
  ];

  if (rows.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center border border-dashed border-border px-6 py-14 text-center",
          className,
        )}
      >
        <Users className="h-8 w-8 text-muted-foreground/60" strokeWidth={1.5} />
        <p className="mt-3 text-sm text-foreground">{t("subscribers.table.empty")}</p>
        <p className="mt-1 max-w-sm text-xs text-muted-foreground">{t("subscribers.table.emptyHint")}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <SubscribersMobileList
        rows={rows}
        selectedIds={selectedIds}
        onToggleRow={onToggleRow}
        showCheckboxes={showCheckboxes}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <div className={cn("hidden lg:block", dataTableWrapClass)}>
        <table className={cn(dataTableFixedClass, dataTableScrollMinClass, "min-w-[1080px]")}>
          <colgroup>
            {columnWidths.map((width, index) => (
              <col key={index} className={width} />
            ))}
          </colgroup>
          <thead>
            <tr className={dataTableHeadRowClass}>
              {showCheckboxes ? (
                <th className="px-3 py-2.5 text-center align-middle">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => onToggleAll(e.target.checked)}
                    aria-label={t("subscribers.table.selectAll")}
                    className="rounded border-border"
                  />
                </th>
              ) : null}
              <th className={dataTableHeadCellClass}>{t("subscribers.table.subscriber")}</th>
              <th className={dataTableHeadCellClass}>{t("subscribers.table.lineId")}</th>
              <th className={dataTableHeadCellClass}>{t("subscribers.table.username")}</th>
              <th className={dataTableHeadCellClass}>{t("subscribers.table.phone")}</th>
              {canViewPasswords ? (
                <th className={cn("pe-4", dataTableHeadCellClass)}>
                  {t("subscribers.table.password")}
                </th>
              ) : null}
              <th className={cn("ps-2 whitespace-nowrap", dataTableHeadCellClass)}>
                {t("subscribers.table.speed")}
              </th>
              <th className={cn("whitespace-nowrap", dataTableHeadCellClass)}>
                {t("subscribers.table.firstContact")}
              </th>
              <th className={dataTableHeadCellClass}>{t("subscribers.table.disconnect")}</th>
              <th className={dataTableHeadCellClass}>{t("subscribers.table.status")}</th>
              <th className={dataTableActionsHeadCellClass}>
                {t("subscribers.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <SubscriberDesktopRow
                key={row.id}
                row={row}
                selected={selectedIds.has(row.id)}
                showCheckboxes={showCheckboxes}
                onToggleRow={onToggleRow}
                onEdit={onEdit}
                onDelete={onDelete}
                showPasswordColumn={canViewPasswords}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SubscriberDesktopRow({
  row,
  selected,
  showCheckboxes,
  onToggleRow,
  onEdit,
  onDelete,
  showPasswordColumn = false,
}: {
  row: Subscriber;
  selected: boolean;
  showCheckboxes: boolean;
  onToggleRow: (id: number) => void;
  onEdit?: (row: Subscriber) => void;
  onDelete?: (row: Subscriber) => void;
  showPasswordColumn?: boolean;
}) {
  const { t } = useTranslation();
  const listStatus = getSubscriberListStatus(row);
  const daysLeft = getDaysUntilDisconnect(row);
  const initials = getSubscriberInitials(row.fullName);

  return (
    <tr
      className={cn(
        "group",
        dataTableBodyRowClass,
        selected && "bg-muted/40",
        row.isPaused && "bg-accent/[0.03]",
      )}
    >
      {showCheckboxes ? (
        <td className="px-4 py-3 text-center align-middle" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleRow(row.id)}
            aria-label={row.lineId}
            className="rounded border-border"
          />
        </td>
      ) : null}
      <td className={cn("max-w-0", dataTableCellClass)}>
        <TableSubscriberCell
          name={row.fullName}
          subtitle={row.facilityType}
          initials={initials}
        />
      </td>
      <td className={dataTableCellClass}>
        <LtrText className="select-all font-mono text-xs text-muted-foreground">{row.lineId}</LtrText>
      </td>
      <td className={cn("overflow-hidden", dataTableCellClass)}>
        {row.username ? (
          <LtrText className="select-all font-mono text-xs font-medium">{row.username}</LtrText>
        ) : (
          <span className="text-xs text-muted-foreground">{t("subscribers.profile.noUsername")}</span>
        )}
      </td>
      <td className={dataTableCellClass}>
        {row.phone ? (
          <LtrText className="select-all text-xs text-muted-foreground">{row.phone}</LtrText>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </td>
      {showPasswordColumn ? (
        <td className={cn("pe-4", dataTableCellClass)} onClick={(e) => e.stopPropagation()}>
          {row.password ? <MaskedPasswordCell value={row.password} /> : "—"}
        </td>
      ) : null}
      <td className={cn("whitespace-nowrap ps-2 text-muted-foreground", dataTableCellClass)}>
        {buildSpeedLabel(row.speedMbps)}
      </td>
      <td className={cn("whitespace-nowrap text-muted-foreground", dataTableCellClass)}>
        {formatDate(row.firstContactDate)}
      </td>
      <td className={cn("text-muted-foreground", dataTableCellClass)}>
        <span className="whitespace-nowrap text-xs">
          {formatDate(row.disconnectionDate)}
          {daysLeft !== null && daysLeft <= 7 ? (
            <span className="text-foreground">
              {" · "}
              {t("subscribers.table.daysLeft", { count: daysLeft })}
            </span>
          ) : null}
        </span>
      </td>
      <td className={dataTableCellClass}>
        <SubscriberStatusBadge status={listStatus} />
      </td>
      <td className={dataTableActionsCellClass} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center">
          <RowActions row={row} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </td>
    </tr>
  );
}

function SubscribersMobileList({
  rows,
  selectedIds,
  onToggleRow,
  showCheckboxes,
  onEdit,
  onDelete,
}: {
  rows: Subscriber[];
  selectedIds: Set<number>;
  onToggleRow: (id: number) => void;
  showCheckboxes: boolean;
  onEdit?: (row: Subscriber) => void;
  onDelete?: (row: Subscriber) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3 lg:hidden">
      {rows.map((row) => {
        const listStatus = getSubscriberListStatus(row);
        const daysLeft = getDaysUntilDisconnect(row);
        const initials = getSubscriberInitials(row.fullName);

        return (
          <article
            key={row.id}
            className={cn(
              "overflow-hidden rounded-xl border border-border bg-background",
              selectedIds.has(row.id) && "bg-muted/30",
              row.isPaused && "border-accent/40 bg-accent/[0.04]",
            )}
          >
            <div className="flex items-start gap-3 p-4">
              {showCheckboxes ? (
                <input
                  type="checkbox"
                  checked={selectedIds.has(row.id)}
                  onChange={() => onToggleRow(row.id)}
                  className="mt-3 rounded border-border"
                  aria-label={row.lineId}
                />
              ) : null}
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted/30 text-xs font-medium text-muted-foreground">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{row.fullName}</p>
                        <p className="text-xs text-muted-foreground">{row.facilityType}</p>
                      </div>
                      <SubscriberStatusBadge status={listStatus} />
                    </div>
                    <p className="mt-2 select-all font-mono text-xs text-muted-foreground">{row.lineId}</p>
                  </div>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-border/80 pt-4 text-sm">
                  <div>
                    <dt className="text-xs font-medium text-muted-foreground">
                      {t("subscribers.table.username")}
                    </dt>
                    <dd className="mt-1 select-all font-medium" dir="ltr">
                      {row.username ?? "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-muted-foreground">
                      {t("subscribers.table.speed")}
                    </dt>
                    <dd className="mt-1">{buildSpeedLabel(row.speedMbps)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-muted-foreground">
                      {t("subscribers.table.firstContact")}
                    </dt>
                    <dd className="mt-1 text-muted-foreground">{formatDate(row.firstContactDate)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-muted-foreground">
                      {t("subscribers.table.disconnect")}
                    </dt>
                    <dd className="mt-1 text-muted-foreground">
                      {formatDate(row.disconnectionDate)}
                      {daysLeft !== null && daysLeft <= 7 ? (
                        <span className="text-foreground"> ({daysLeft}d)</span>
                      ) : null}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-muted-foreground">
                      {t("subscribers.table.phone")}
                    </dt>
                    <dd className="mt-1 select-all" dir="ltr">
                      {row.phone ?? "—"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-2">
              <Link
                to={profilePath(row.lineId)}
                className="text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                {t("subscribers.actions.openProfile")}
              </Link>
              <RowActions row={row} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function RowActions({
  row,
  onEdit,
  onDelete,
}: {
  row: Subscriber;
  onEdit?: (row: Subscriber) => void;
  onDelete?: (row: Subscriber) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="inline-flex justify-end gap-0.5 opacity-80 transition-opacity group-hover:opacity-100">
      <Link
        to={profilePath(row.lineId)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label={t("subscribers.actions.openProfile")}
      >
        <ExternalLink className="h-4 w-4" />
      </Link>
      {onEdit ? (
        <Button variant="ghost" size="icon" onClick={() => onEdit(row)} aria-label={t("common.edit")}>
          <Pencil className="h-4 w-4" />
        </Button>
      ) : null}
      {onDelete ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(row)}
          aria-label={t("common.delete")}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );
}
