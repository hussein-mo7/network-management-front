import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";

interface RequirePermissionProps {
  permission?: string;
  anyOf?: string[];
  children: ReactNode;
}

/** Redirects to home when the user lacks the required permission. */
export function RequirePermission({ permission, anyOf, children }: RequirePermissionProps) {
  const { can, canAny } = usePermissions();

  if (permission && !can(permission)) {
    return <Navigate to="/" replace />;
  }

  if (anyOf && anyOf.length > 0 && !canAny(anyOf)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
