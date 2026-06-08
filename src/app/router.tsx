import { Navigate, Route, Routes } from "react-router-dom";
import { Can, GuestRoute, ProtectedRoute } from "@/app/routing";
import { DashboardLayout } from "@/components/layout";
import { ForgotPasswordPage, LoginPage, ResetPasswordPage } from "@/pages/auth";
import { HomePage } from "@/pages/home";
import { AvailableUsernamesPage } from "@/pages/available-usernames";
import { SpeedsPage } from "@/pages/speeds";
import { SupportPage } from "@/pages/support";
import { PlaceholderPage } from "@/pages/_shared/PlaceholderPage";
import { AddCustomerPage, CustomerProfilePage, CustomersPage } from "@/pages/customers";
import { ExpiringPage } from "@/pages/expiring/ExpiringPage";
import { FinancePage } from "@/pages/finance/FinancePage";
import { SmsPage } from "@/pages/sms";
import { StoppedPage } from "@/pages/stopped";
import { StatisticsPage } from "@/pages/statistics/StatisticsPage";
import { SubscriberProfilePage, SubscribersPage } from "@/pages/subscribers";

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
                <StatisticsPage />
              </Can>
            }
          />
          <Route
            path="customers"
            element={
              <Can permission="subscribers.view">
                <CustomersPage />
              </Can>
            }
          />
          <Route
            path="customers/new"
            element={
              <Can permission="subscribers.create">
                <AddCustomerPage />
              </Can>
            }
          />
          <Route
            path="customers/:lineId"
            element={
              <Can permission="subscribers.view">
                <CustomerProfilePage />
              </Can>
            }
          />
          <Route
            path="subscribers"
            element={
              <Can permission="subscribers.view">
                <SubscribersPage />
              </Can>
            }
          />
          <Route
            path="subscribers/new"
            element={<Navigate to="/customers/new" replace />}
          />
          <Route
            path="subscribers/:subscriberId"
            element={
              <Can permission="subscribers.view">
                <SubscriberProfilePage />
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
                <ExpiringPage />
              </Can>
            }
          />
          <Route
            path="stopped"
            element={
              <Can permission="disabled.view">
                <StoppedPage />
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
          <Route
            path="sms"
            element={
              <Can permission="sms.view">
                <SmsPage />
              </Can>
            }
          />
          <Route path="support" element={<SupportPage />} />
          <Route path="finance" element={<FinancePage />} />
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
