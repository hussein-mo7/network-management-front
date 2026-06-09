import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardHeader } from "@/components/ui/cards";
import { Heading, Text } from "@/components/ui/typography";
import { usePermissions } from "@/hooks/usePermissions";

const HOME_CARDS = [
  {
    titleKey: "home.cards.customers.title",
    descriptionKey: "home.cards.customers.description",
    to: "/customers",
    permission: "subscribers.view",
  },
  {
    titleKey: "home.cards.subscribers.title",
    descriptionKey: "home.cards.subscribers.description",
    to: "/subscribers",
    permission: "subscribers.view",
  },
  {
    titleKey: "home.cards.onlineUsers.title",
    descriptionKey: "home.cards.onlineUsers.description",
    to: "/online-users",
    permission: "online_users.view",
  },
  {
    titleKey: "home.cards.expiring.title",
    descriptionKey: "home.cards.expiring.description",
    to: "/expiring",
    permission: "expired.view",
  },
  {
    titleKey: "home.cards.availableUsernames.title",
    descriptionKey: "home.cards.availableUsernames.description",
    to: "/available-usernames",
    permission: "available_usernames.view",
  },
  {
    titleKey: "home.cards.statistics.title",
    descriptionKey: "home.cards.statistics.description",
    to: "/statistics",
    permission: "dashboard.view",
  },
  {
    titleKey: "home.cards.finance.title",
    descriptionKey: "home.cards.finance.description",
    to: "/finance",
    permission: "finance.view",
  },
  {
    titleKey: "home.cards.settings.title",
    descriptionKey: "home.cards.settings.description",
    to: "/settings",
    permission: "settings.view",
  },
] as const;

export function HomePage() {
  const { t } = useTranslation();
  const { can } = usePermissions();

  const cards = HOME_CARDS.filter((card) => can(card.permission));

  return (
    <div className="space-y-6">
      <div>
        <Heading as="h1">{t("home.title")}</Heading>
        <Text muted className="mt-2">
          {t("home.subtitle")}
        </Text>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ titleKey, descriptionKey, to }) => (
          <Link key={to} to={to} className="block h-full">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader title={t(titleKey)} description={t(descriptionKey)} />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
