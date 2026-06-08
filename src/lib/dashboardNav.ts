import {
  BarChart3,
  ClipboardList,
  Coins,
  Gauge,
  Headphones,
  Home,
  MessageSquare,
  Tags,
  UserCog,
  Users,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface DashboardNavItem {
  labelKey: `nav.items.${string}`;
  to: string;
  icon: LucideIcon;
  permission?: string;
}

export const dashboardNavItems: DashboardNavItem[] = [
  { labelKey: "nav.items.home", to: "/", icon: Home, permission: "dashboard.view" },
  { labelKey: "nav.items.statistics", to: "/statistics", icon: BarChart3, permission: "dashboard.view" },
  { labelKey: "nav.items.customers", to: "/customers", icon: Users, permission: "subscribers.view" },
  { labelKey: "nav.items.subscribers", to: "/subscribers", icon: Users, permission: "subscribers.view" },
  { labelKey: "nav.items.onlineUsers", to: "/online-users", icon: Wifi, permission: "online_users.view" },
  { labelKey: "nav.items.expiring", to: "/expiring", icon: ClipboardList, permission: "expired.view" },
  { labelKey: "nav.items.stopped", to: "/stopped", icon: Users, permission: "disabled.view" },
  { labelKey: "nav.items.speeds", to: "/speeds", icon: Gauge, permission: "speeds.view" },
  {
    labelKey: "nav.items.availableUsernames",
    to: "/available-usernames",
    icon: Tags,
    permission: "available_usernames.view",
  },
  { labelKey: "nav.items.sms", to: "/sms", icon: MessageSquare, permission: "sms.view" },
  { labelKey: "nav.items.support", to: "/support", icon: Headphones },
  { labelKey: "nav.items.finance", to: "/finance", icon: Coins },
  { labelKey: "nav.items.users", to: "/users", icon: UserCog, permission: "users.view" },
  { labelKey: "nav.items.logs", to: "/logs", icon: ClipboardList, permission: "logs.view" },
];
