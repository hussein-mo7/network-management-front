import type { AuthSession, LoginPayload } from "@/types/auth";
import { ADMIN_PERMISSIONS, ADMIN_ROLE, VIEWER_PERMISSIONS, VIEWER_ROLE } from "@/lib/roles";

export function createDevSession(payload: LoginPayload): AuthSession {
  const isViewer = payload.username.trim().toLowerCase() === "viewer";

  return {
    user: {
      id: 1,
      name: isViewer ? "Viewer User" : "Development Manager",
      username: payload.username || "admin",
      email: isViewer ? "viewer@wewifi.local" : "admin@wewifi.local",
      role_id: isViewer ? 2 : 1,
      role_name: isViewer ? VIEWER_ROLE : ADMIN_ROLE,
      role_display_name: isViewer ? "Viewer" : "Admin",
      status: "active",
    },
    permissions: [...(isViewer ? VIEWER_PERMISSIONS : ADMIN_PERMISSIONS)],
  };
}

export function isDevAuthMode(): boolean {
  return import.meta.env.VITE_SKIP_AUTH_CHECK === "true";
}
