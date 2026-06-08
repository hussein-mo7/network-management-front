/** Responsive tables — no forced min-width; fits parent container. */
export const dataTableClass = "w-full text-sm";

/** Person/list tables — balanced columns, subscriber capped. */
export const dataTableFixedClass = "w-full table-fixed text-sm";

export const dataTableWrapClass =
  "w-full overflow-hidden rounded-xl border border-border";

export const dataTableHeadRowClass = "border-b border-border bg-muted/40";

export const dataTableHeadCellClass =
  "px-3 py-2.5 text-start align-middle text-xs font-semibold text-muted-foreground";

export const dataTableCellClass = "min-w-0 px-3 py-2.5 align-middle text-start";

export const dataTableBodyRowClass =
  "border-b border-border last:border-0 transition-colors hover:bg-muted/20";
