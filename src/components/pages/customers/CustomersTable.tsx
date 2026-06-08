import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CustomerKindBadge } from "@/components/pages/customers/CustomerKindBadge";
import { Button } from "@/components/ui/buttons";
import {
  dataTableBodyRowClass,
  dataTableCellClass,
  dataTableFixedClass,
  dataTableHeadCellClass,
  dataTableHeadRowClass,
  dataTableWrapClass,
  LtrText,
  TableSubscriberCell,
} from "@/components/ui/data";
import { getCustomerKind } from "@/lib/customerUtils";
import { buildSpeedLabel, getSubscriberInitials } from "@/lib/subscriberUtils";
import type { Customer } from "@/types/customer";
import { cn } from "@/lib/cn";

interface CustomersTableProps {
  rows: Customer[];
  selectedIds: Set<number>;
  onToggleRow: (id: number) => void;
  onToggleAll: (checked: boolean) => void;
  onEdit?: (row: Customer) => void;
  onDelete?: (row: Customer) => void;
  showCheckboxes?: boolean;
  className?: string;
}

function profilePath(lineId: string): string {
  return `/customers/${encodeURIComponent(lineId)}`;
}

export function CustomersTable({
  rows,
  selectedIds,
  onToggleRow,
  onToggleAll,
  onEdit,
  onDelete,
  showCheckboxes = false,
  className,
}: CustomersTableProps) {
  const { t } = useTranslation();
  const allSelected = rows.length > 0 && rows.every((r) => selectedIds.has(r.id));
  const showActions = Boolean(onEdit || onDelete);

  const columnWidths = [
    ...(showCheckboxes ? ["w-[4%]"] : []),
    "w-[22%]",
    "w-[9%]",
    "w-[11%]",
    "w-[14%]",
    "w-[13%]",
    "w-[9%]",
    "w-[9%]",
    ...(showActions ? ["w-[11%]"] : ["w-[4%]"]),
  ];

  if (rows.length === 0) {
    return (
      <div
        className={cn(
          "border border-dashed border-border px-6 py-14 text-center text-sm text-muted-foreground",
          className,
        )}
      >
        <p className="text-foreground">{t("customers.table.empty")}</p>
        <p className="mt-1 text-xs">{t("customers.table.emptyHint")}</p>
      </div>
    );
  }

  return (
    <div className={cn(dataTableWrapClass, className)}>
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
                  aria-label={t("customers.table.selectAll")}
                  className="rounded border-border"
                />
              </th>
            ) : null}
            <th className={dataTableHeadCellClass}>{t("customers.table.fullName")}</th>
            <th className={dataTableHeadCellClass}>{t("customers.table.lineId")}</th>
            <th className={dataTableHeadCellClass}>{t("customers.table.type")}</th>
            <th className={dataTableHeadCellClass}>{t("customers.table.username")}</th>
            <th className={dataTableHeadCellClass}>{t("customers.table.phone")}</th>
            <th className={cn("whitespace-nowrap", dataTableHeadCellClass)}>
              {t("customers.table.speed")}
            </th>
            <th className={cn("text-end", dataTableHeadCellClass)}>
              {t("customers.table.balance")}
            </th>
            {showActions ? (
              <th className={cn("text-end", dataTableHeadCellClass)}>
                {t("customers.table.actions")}
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const kind = getCustomerKind(row);
            const initials = getSubscriberInitials(row.fullName);

            return (
              <tr
                key={row.id}
                className={cn(dataTableBodyRowClass, selectedIds.has(row.id) && "bg-muted/40")}
              >
                {showCheckboxes ? (
                  <td className="px-4 py-3 text-center align-middle">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(row.id)}
                      onChange={() => onToggleRow(row.id)}
                      aria-label={row.lineId}
                      className="rounded border-border"
                    />
                  </td>
                ) : null}
                <td className={cn("max-w-0", dataTableCellClass)}>
                  <Link to={profilePath(row.lineId)} className="block min-w-0 hover:underline">
                    <TableSubscriberCell name={row.fullName} initials={initials} />
                  </Link>
                </td>
                <td className={dataTableCellClass}>
                  <LtrText className="font-mono text-xs text-muted-foreground">{row.lineId}</LtrText>
                </td>
                <td className={dataTableCellClass}>
                  <CustomerKindBadge kind={kind} />
                </td>
                <td className={dataTableCellClass}>
                  {row.username ? (
                    <LtrText className="font-mono text-xs">{row.username}</LtrText>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className={dataTableCellClass}>
                  {row.phone ? (
                    <LtrText className="text-sm">{row.phone}</LtrText>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className={cn("whitespace-nowrap text-muted-foreground", dataTableCellClass)}>
                  {buildSpeedLabel(row.speedMbps)}
                </td>
                <td
                  className={cn(
                    dataTableCellClass,
                    "whitespace-nowrap text-end tabular-nums",
                    row.balance < 0 ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {row.balance}
                </td>
                {showActions ? (
                  <td className={cn(dataTableCellClass, "text-end")}>
                    <div className="inline-flex gap-0.5">
                      {onEdit ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(row)}
                          aria-label={t("common.edit")}
                        >
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
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
