/** Maps route paths to i18n keys used for `document.title` */
const ROUTE_TITLE_KEYS: Array<{ match: (path: string) => boolean; titleKey: string }> = [
  { match: (path) => path === "/", titleKey: "home.title" },
  { match: (path) => path === "/login", titleKey: "pageTitles.login" },
  { match: (path) => path === "/forgot-password", titleKey: "auth.forgotPassword.title" },
  { match: (path) => path === "/reset-password", titleKey: "auth.resetPassword.title" },
  { match: (path) => path === "/statistics", titleKey: "nav.items.statistics" },
  { match: (path) => path.startsWith("/subscribers"), titleKey: "nav.items.subscribers" },
  { match: (path) => path === "/online-users", titleKey: "nav.items.onlineUsers" },
  { match: (path) => path === "/expiring", titleKey: "pages.expiring" },
  { match: (path) => path === "/stopped", titleKey: "nav.items.stopped" },
  { match: (path) => path === "/speeds", titleKey: "speeds.title" },
  { match: (path) => path === "/available-usernames", titleKey: "availableUsernames.title" },
  { match: (path) => path === "/support", titleKey: "nav.items.support" },
  { match: (path) => path === "/finance", titleKey: "nav.items.finance" },
  { match: (path) => path === "/users", titleKey: "pages.users" },
  { match: (path) => path === "/logs", titleKey: "nav.items.logs" },
];

const DEFAULT_TITLE_KEY = "nav.dashboard";

export function resolvePageTitleKey(pathname: string): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  const entry = ROUTE_TITLE_KEYS.find(({ match }) => match(path));
  return entry?.titleKey ?? DEFAULT_TITLE_KEY;
}

export function formatDocumentTitle(pageTitle: string, appName = "WeWiFi"): string {
  return `${pageTitle} — ${appName}`;
}
