import { useTranslation } from "react-i18next";

import { FilterChipBar, SearchField } from "@/components/ui/data";

import { cn } from "@/lib/cn";

import type { SmsAudienceFilter, SmsRecipientMode } from "@/types/sms";



const AUDIENCE_FILTERS: SmsAudienceFilter[] = [

  "all",

  "expires1Day",

  "expires2Days",

  "expiresSoon",

  "expired",

  "stopped",

  "withDebt",

];



interface SmsAudienceFiltersProps {

  search: string;

  onSearchChange: (value: string) => void;

  audience: SmsAudienceFilter;

  onAudienceChange: (value: SmsAudienceFilter) => void;

  recipientMode: SmsRecipientMode;

  onRecipientModeChange: (mode: SmsRecipientMode) => void;

  className?: string;

}



export function SmsAudienceFilters({

  search,

  onSearchChange,

  audience,

  onAudienceChange,

  recipientMode,

  onRecipientModeChange,

  className,

}: SmsAudienceFiltersProps) {

  const { t } = useTranslation();



  return (

    <div className={cn("space-y-4", className)}>

      <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-muted/20 p-1">

        {(["subscribers", "customers", "custom"] as SmsRecipientMode[]).map((mode) => (

          <button

            key={mode}

            type="button"

            onClick={() => onRecipientModeChange(mode)}

            className={cn(

              "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors sm:flex-none",

              recipientMode === mode

                ? "bg-foreground text-background"

                : "text-muted-foreground hover:bg-muted hover:text-foreground",

            )}

          >

            {t(`sms.recipientMode.${mode}`)}

          </button>

        ))}

      </div>



      {recipientMode === "subscribers" || recipientMode === "customers" ? (
        <>
          <SearchField
            value={search}
            onChange={onSearchChange}
            placeholder={t("subscribers.filters.searchPlaceholder")}
            ariaLabel={t("subscribers.filters.search")}
          />

          {recipientMode === "subscribers" ? (
            <FilterChipBar
              label={t("sms.filters.label")}
              value={audience}
              onChange={(id) => onAudienceChange(id as SmsAudienceFilter)}
              options={AUDIENCE_FILTERS.map((key) => ({
                id: key,
                label: t(`sms.filters.${key}`),
              }))}
            />
          ) : (
            <p className="text-sm text-muted-foreground">{t("sms.filters.customersHint")}</p>
          )}
        </>
      ) : null}

    </div>

  );

}


