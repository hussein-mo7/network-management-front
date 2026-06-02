import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  SupportChartsSection,
  SupportStatCards,
  SupportTicketsTable,
  TicketFormModal,
  type TicketFormValues,
} from "@/components/pages/support";
import { ConfirmDialog } from "@/components/ui/modals";
import { Button } from "@/components/ui/buttons";
import { Heading, Text } from "@/components/ui/typography";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import {
  buildTicketNumber,
  computeSupportStats,
  mockSupportTickets,
  type SupportTicket,
  type TicketStatus,
} from "@/lib/mocks/supportTickets.mock";
import { cn } from "@/lib/cn";

type TicketDialog =
  | { type: "add" }
  | { type: "edit"; ticket: SupportTicket }
  | { type: "delete"; ticket: SupportTicket };

type StatusFilter = TicketStatus | "all";

export function SupportPage() {
  const { t } = useTranslation();
  const { canManage } = useRoleAccess();
  const [tickets, setTickets] = useState<SupportTicket[]>(() => [...mockSupportTickets]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [dialog, setDialog] = useState<TicketDialog | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stats = useMemo(() => computeSupportStats(tickets), [tickets]);

  const filteredTickets = useMemo(() => {
    if (statusFilter === "all") return tickets;
    return tickets.filter((ticket) => ticket.status === statusFilter);
  }, [tickets, statusFilter]);

  const nextId = useMemo(
    () => (tickets.length > 0 ? Math.max(...tickets.map((ticket) => ticket.id)) + 1 : 1),
    [tickets],
  );

  const statusFilters: Array<{ value: StatusFilter; label: string }> = [
    { value: "all", label: t("common.all") },
    { value: "open", label: t("support.status.open") },
    { value: "in_progress", label: t("support.status.in_progress") },
    { value: "waiting_customer", label: t("support.status.waiting_customer") },
    { value: "resolved", label: t("support.status.resolved") },
  ];

  const handleCreate = async (values: TicketFormValues) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));

    const now = new Date().toISOString();
    setTickets((prev) => [
      {
        id: nextId,
        ticketNumber: buildTicketNumber(nextId),
        title: values.title.trim(),
        description: values.description.trim(),
        status: values.status,
        priority: values.priority,
        channel: values.channel,
        subscriberName: values.subscriberName.trim(),
        subscriberPhone: values.subscriberPhone.trim(),
        assignedTo: values.assignedTo.trim() || "Unassigned",
        createdAt: now,
        updatedAt: now,
        resolvedAt: values.status === "resolved" ? now : undefined,
      },
      ...prev,
    ]);

    toast.success(t("support.form.createSuccess"));
    setDialog(null);
    setIsSubmitting(false);
  };

  const handleUpdate = async (values: TicketFormValues) => {
    if (dialog?.type !== "edit") return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));

    const now = new Date().toISOString();
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === dialog.ticket.id
          ? {
              ...ticket,
              title: values.title.trim(),
              description: values.description.trim(),
              status: values.status,
              priority: values.priority,
              channel: values.channel,
              subscriberName: values.subscriberName.trim(),
              subscriberPhone: values.subscriberPhone.trim(),
              assignedTo: values.assignedTo.trim(),
              updatedAt: now,
              resolvedAt:
                values.status === "resolved"
                  ? ticket.resolvedAt ?? now
                  : undefined,
            }
          : ticket,
      ),
    );

    toast.success(t("support.form.updateSuccess"));
    setDialog(null);
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (dialog?.type !== "delete") return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));

    setTickets((prev) => prev.filter((ticket) => ticket.id !== dialog.ticket.id));
    toast.success(t("support.form.deleteSuccess"));
    setDialog(null);
    setIsSubmitting(false);
  };

  const deleteTicket = dialog?.type === "delete" ? dialog.ticket : null;

  return (
    <div className="space-y-6">
      <div className="space-y-4 lg:flex lg:items-start lg:justify-between lg:gap-6">
        <div className="min-w-0">
          <Heading as="h1">{t("support.title")}</Heading>
          <Text muted className="mt-2">
            {t("support.subtitle")}
          </Text>
        </div>

        {canManage ? (
          <Button size="sm" className="w-full sm:w-auto" onClick={() => setDialog({ type: "add" })}>
            <Plus className="h-4 w-4" />
            {t("support.actions.addTicket")}
          </Button>
        ) : null}
      </div>

      <SupportStatCards stats={stats} />
      <SupportChartsSection tickets={tickets} />

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Heading as="h2" className="text-lg">
              {t("support.table.sectionTitle")}
            </Heading>
            <Text muted className="mt-1 text-sm">
              {t("support.table.sectionSubtitle", { count: filteredTickets.length })}
            </Text>
          </div>

          <div className="flex flex-wrap gap-2">
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setStatusFilter(filter.value)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  statusFilter === filter.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <SupportTicketsTable
          rows={filteredTickets}
          onEdit={canManage ? (ticket) => setDialog({ type: "edit", ticket }) : undefined}
          onDelete={canManage ? (ticket) => setDialog({ type: "delete", ticket }) : undefined}
        />
      </section>

      <Text muted className="text-sm">
        {t("support.hint")}
      </Text>

      <TicketFormModal
        open={dialog?.type === "add"}
        mode="add"
        onClose={() => setDialog(null)}
        onSubmit={handleCreate}
        isSubmitting={isSubmitting}
      />

      <TicketFormModal
        open={dialog?.type === "edit"}
        mode="edit"
        initialTicket={dialog?.type === "edit" ? dialog.ticket : undefined}
        onClose={() => setDialog(null)}
        onSubmit={handleUpdate}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        open={dialog?.type === "delete"}
        onClose={() => setDialog(null)}
        onConfirm={handleDelete}
        title={t("support.form.deleteTitle")}
        message={t("support.form.deleteMessage", { ticket: deleteTicket?.ticketNumber ?? "" })}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        isLoading={isSubmitting}
      />
    </div>
  );
}
