import { ADMIN_PERMISSIONS, VIEWER_PERMISSIONS } from "@/lib/roles";
import type { AuthSession, AuthUser } from "@/types/auth";

export interface BackendAuthUser {
  id: number;
  name: string;
  username: string;
  email: string;
  roleId: number;
  role: string;
  status?: "active" | "inactive" | null;
}

function permissionsForRole(roleName: string): string[] {
  if (roleName === "viewer") {
    return [...VIEWER_PERMISSIONS];
  }
  return [...ADMIN_PERMISSIONS];
}

export function mapBackendUserToSession(user: BackendAuthUser): AuthSession {
  const roleName = user.role ?? "admin";

  const mappedUser: AuthUser = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    role_id: user.roleId,
    role_name: roleName,
    status: user.status ?? "active",
  };

  return {
    user: mappedUser,
    permissions: permissionsForRole(roleName),
  };
}

/** @deprecated Use mapBackendUserToSession — JWT is no longer stored on the client */
export function mapBackendLoginToSession(
  _token: string,
  user: Omit<BackendAuthUser, "role"> & { role?: string },
): AuthSession {
  return mapBackendUserToSession({
    ...user,
    role: user.role ?? "admin",
  });
}
