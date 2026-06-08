import { ExternalLink, Pencil, Trash2, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SubscriberStatusBadge } from "@/components/pages/subscribers/SubscriberStatusBadge";
import { Button } from "@/components/ui/buttons";
import {
  dataTableBodyRowClass,
  dataTableCellClass,
  dataTableFixedClass,
  dataTableHeadCellClass,
  dataTableHeadRowClass,
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
  getSubscriberLifecycleStatus,
} from "@/lib/subscriberUtils";
import type { Subscriber } from "@/types/subscriber";
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

function profilePath(subscriberId: number): string {
  return `/subscribers/${subscriberId}`;
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
    ...(showCheckboxes ? ["w-[4%]"] : []),
    "w-[20%]",
    "w-[8%]",
    "w-[13%]",
    ...(canViewPasswords ? ["w-[10%]"] : []),
    "w-[8%]",
    "w-[13%]",
    "w-[9%]",
    showCheckboxes ? "w-[11%]" : "w-[15%]",
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
        <table className={dataTableFixedClass}>
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
              {canViewPasswords ? (
                <th className={cn("pe-4", dataTableHeadCellClass)}>
                  {t("subscribers.table.password")}
                </th>
              ) : null}
              <th className={cn("ps-2 whitespace-nowrap", dataTableHeadCellClass)}>
                {t("subscribers.table.speed")}
              </th>
              <th className={dataTableHeadCellClass}>{t("subscribers.table.disconnect")}</th>
              <th className={dataTableHeadCellClass}>{t("subscribers.table.status")}</th>
              <th className={cn("text-end", dataTableHeadCellClass)}>
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
  const navigate = useNavigate();
  const listStatus =
    getSubscriberLifecycleStatus(row) === "no_subscription" ? "no_subscription" : "active";
  const daysLeft = getDaysUntilDisconnect(row);
  const initials = getSubscriberInitials(row.fullName);

  const openProfile = () => navigate(profilePath(row.id));

  return (
    <tr
      className={cn("group", dataTableBodyRowClass, selected && "bg-muted/40")}
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
      <td className={cn("cursor-pointer max-w-0", dataTableCellClass)} onClick={openProfile}>
        <TableSubscriberCell
          name={row.fullName}
          subtitle={row.facilityType}
          initials={initials}
        />
      </td>
      <td className={cn("cursor-pointer", dataTableCellClass)} onClick={openProfile}>
        <LtrText className="font-mono text-xs text-muted-foreground">{row.lineId}</LtrText>
      </td>
      <td className={cn("cursor-pointer overflow-hidden", dataTableCellClass)} onClick={openProfile}>
        {row.username ? (
          <LtrText className="font-mono text-xs font-medium">{row.username}</LtrText>
        ) : (
          <span className="text-xs text-muted-foreground">{t("subscribers.profile.noUsername")}</span>
        )}
      </td>
      {showPasswordColumn ? (
        <td className={cn("pe-4", dataTableCellClass)} onClick={(e) => e.stopPropagation()}>
          {row.password ? <MaskedPasswordCell value={row.password} /> : "—"}
        </td>
      ) : null}
      <td
        className={cn("cursor-pointer whitespace-nowrap ps-2 text-muted-foreground", dataTableCellClass)}
        onClick={openProfile}
      >
        {buildSpeedLabel(row.speedMbps)}
      </td>
      <td className={cn("cursor-pointer text-muted-foreground", dataTableCellClass)} onClick={openProfile}>
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
      <td className={cn("cursor-pointer", dataTableCellClass)} onClick={openProfile}>
        <SubscriberStatusBadge status={listStatus} />
      </td>
      <td className={cn(dataTableCellClass, "text-end")} onClick={(e) => e.stopPropagation()}>
        <RowActions row={row} onEdit={onEdit} onDelete={onDelete} />
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
        const listStatus =
          getSubscriberLifecycleStatus(row) === "no_subscription" ? "no_subscription" : "active";
        const daysLeft = getDaysUntilDisconnect(row);
        const initials = getSubscriberInitials(row.fullName);

        return (
          <article
            key={row.id}
            className={cn(
              "border border-border bg-background",
              selectedIds.has(row.id) && "bg-muted/30",
            )}
          >
            <div className="flex items-start gap-3 p-4 pb-0">
              {showCheckboxes ? (
                <input
                  type="checkbox"
                  checked={selectedIds.has(row.id)}
                  onChange={() => onToggleRow(row.id)}
                  className="mt-3 rounded border-border"
                  aria-label={row.lineId}
                />
              ) : null}
              <Link to={profilePath(row.id)} className="min-w-0 flex-1">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted/30 text-xs font-medium text-muted-foreground">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{row.fullName}</p>
                      <p className="text-xs text-muted-foreground">{row.facilityType}</p>
                    </div>
                    <SubscriberStatusBadge status={listStatus} />
                  </div>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">{row.lineId}</p>
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-border/80 pt-4 text-sm pb-4">
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">
                    {t("subscribers.table.username")}
                  </dt>
                  <dd className="mt-1 font-medium" dir="ltr">
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
                  <dd className="mt-1" dir="ltr">
                    {row.phone ?? "—"}
                  </dd>
                </div>
              </dl>
              </Link>
            </div>

            {(onEdit || onDelete) && (
              <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-2">
                <Link
                  to={profilePath(row.id)}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  {t("subscribers.actions.openProfile")}
                </Link>
                <RowActions row={row} onEdit={onEdit} onDelete={onDelete} />
              </div>
            )}
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
        to={profilePath(row.id)}
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
