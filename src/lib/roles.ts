import type { UserRole } from "@/types/auth";

export const ADMIN_ROLE: UserRole = "admin";
export const VIEWER_ROLE: UserRole = "viewer";

/** Read-only permissions for viewer role */
export const VIEWER_PERMISSIONS = [
  "dashboard.view",
  "subscription_statistics.view",
  "subscribers.view",
  "expired.view",
  "available_usernames.view",
  "online_users.view",
] as const;

/** Full permissions for admin role */
export const ADMIN_PERMISSIONS = [
  ...VIEWER_PERMISSIONS,
  "dashboard.view",
  "subscription_statistics.view",
  "disabled.view",
  "speeds.view",
  "settings.view",
  "finance.view",
  "support.view",
  "subscribers.create",
  "subscribers.update",
  "subscribers.delete",
  "subscribers.import",
  "subscribers.export",
  "expired.update",
  "disabled.restore",
  "available_usernames.create",
  "available_usernames.import",
  "available_usernames.export",
  "available_usernames.delete",
  "sms.view",
  "sms.send",
  "logs.view",
  "users.view",
  "users.create",
  "users.update",
  "speeds.manage",
] as const;

const ADMIN_ROLE_NAMES = new Set(["admin", "super_admin", "system_admin"]);

export function isAdminRole(role?: string): role is typeof ADMIN_ROLE {
  return role !== undefined && ADMIN_ROLE_NAMES.has(role);
}

export function isViewerRole(role?: string): role is typeof VIEWER_ROLE {
  return role === VIEWER_ROLE;
}
