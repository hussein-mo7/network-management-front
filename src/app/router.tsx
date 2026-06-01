import { Navigate, Route, Routes } from "react-router-dom";
import { Can, GuestRoute, ProtectedRoute } from "@/app/routing";
import { DashboardLayout } from "@/components/layout";
import { ForgotPasswordPage, LoginPage, ResetPasswordPage } from "@/pages/auth";
import { HomePage } from "@/pages/home";
import { AvailableUsernamesPage } from "@/pages/available-usernames";
import { SpeedsPage } from "@/pages/speeds";
import { PlaceholderPage } from "@/pages/_shared/PlaceholderPage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<HomePage />} />

          <Route
            path="statistics"
            element={
              <Can permission="dashboard.view">
                <PlaceholderPage titleKey="nav.items.statistics" />
              </Can>
            }
          />
          <Route
            path="subscribers/*"
            element={
              <Can permission="subscribers.view">
                <PlaceholderPage titleKey="nav.items.subscribers" />
              </Can>
            }
          />
          <Route
            path="online-users"
            element={
              <Can permission="online_users.view">
                <PlaceholderPage titleKey="nav.items.onlineUsers" />
              </Can>
            }
          />
          <Route
            path="expiring"
            element={
              <Can permission="expired.view">
                <PlaceholderPage titleKey="pages.expiring" />
              </Can>
            }
          />
          <Route
            path="stopped"
            element={
              <Can permission="disabled.view">
                <PlaceholderPage titleKey="nav.items.stopped" />
              </Can>
            }
          />
          <Route
            path="speeds"
            element={
              <Can permission="speeds.view">
                <SpeedsPage />
              </Can>
            }
          />
          <Route
            path="available-usernames"
            element={
              <Can permission="available_usernames.view">
                <AvailableUsernamesPage />
              </Can>
            }
          />
          <Route path="support" element={<PlaceholderPage titleKey="nav.items.support" />} />
          <Route path="finance" element={<PlaceholderPage titleKey="nav.items.finance" />} />
          <Route
            path="users"
            element={
              <Can permission="users.view">
                <PlaceholderPage titleKey="pages.users" />
              </Can>
            }
          />
          <Route
            path="logs"
            element={
              <Can permission="logs.view">
                <PlaceholderPage titleKey="nav.items.logs" />
              </Can>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
