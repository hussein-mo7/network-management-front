import { useAuth } from "@/hooks/useAuth";
import { isAdminRole, isViewerRole } from "@/lib/roles";

export function useRoleAccess() {
  const { user } = useAuth();
  const roleName = user?.role_name;

  return {
    roleName,
    isAdmin: isAdminRole(roleName),
    isViewer: isViewerRole(roleName),
    /** Admin-only write actions (create, edit, delete, import) */
    canManage: isAdminRole(roleName),
    /** Admin-only: reveal subscriber / pool passwords */
    canViewPasswords: isAdminRole(roleName),
  };
}
