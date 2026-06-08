import { useTranslation } from "react-i18next";
import { SearchField } from "@/components/ui/data";

interface OnlineUsersFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function OnlineUsersFilters({ search, onSearchChange }: OnlineUsersFiltersProps) {
  const { t } = useTranslation();

  return (
    <SearchField
      value={search}
      onChange={onSearchChange}
      placeholder={t("onlineUsers.filters.searchPlaceholder")}
      ariaLabel={t("onlineUsers.filters.search")}
    />
  );
}
