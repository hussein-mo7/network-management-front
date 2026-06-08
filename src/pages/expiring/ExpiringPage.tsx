import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExpiringFilters, ExpiringTable } from "@/components/pages/expiring";
import { Button } from "@/components/ui/buttons";
import { LoadingState } from "@/components/ui/feedback";
import { Heading, Text } from "@/components/ui/typography";
import { useExpiringSubscribersQuery } from "@/hooks/useSubscribers";
import {
  filterExpiringSubscriptions,
  type ExpiringUrgencyFilter,
} from "@/lib/expiringUtils";
import { ApiError } from "@/types/api";

export function ExpiringPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [urgency, setUrgency] = useState<ExpiringUrgencyFilter>("all");

  const { data: apiRows = [], isLoading, isError, error, refetch } = useExpiringSubscribersQuery(search);

  const rows = useMemo(
    () => filterExpiringSubscriptions(apiRows, { search, urgency }),
    [apiRows, search, urgency],
  );

  return (
    <div className="space-y-6">
      <div className="min-w-0">
        <Heading as="h1">{t("expiring.title")}</Heading>
        <Text muted className="mt-2 max-w-2xl">
          {t("expiring.subtitle")}
        </Text>
      </div>

      <section className="rounded-xl border border-border bg-surface">
        <div className="border-b border-border px-4 py-4 sm:px-6">
          <ExpiringFilters
            search={search}
            onSearchChange={setSearch}
            urgency={urgency}
            onUrgencyChange={setUrgency}
          />
        </div>

        <div className="px-4 py-4 sm:px-6">
          <Text muted className="mb-4 text-sm">
            {t("expiring.table.sectionSubtitle", { count: rows.length })}
          </Text>

          {isLoading ? (
            <LoadingState layout="table" variant="section" />
          ) : isError ? (
            <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center">
              <Text muted>
                {error instanceof ApiError ? error.message : t("common.unexpectedError")}
              </Text>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
                {t("common.retry")}
              </Button>
            </div>
          ) : (
            <ExpiringTable rows={rows} />
          )}
        </div>
      </section>
    </div>
  );
}
