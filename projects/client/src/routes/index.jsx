import LandingPage from "../pages/landing-page";
import Register from "../pages/Register";
import { useSelector } from "react-redux";
import { Navigate, Route, createRoutesFromElements, useOutlet } from "react-router-dom";
import RegisterTenant from "../components/tenant/register-tenant/register-tenant";
import LoginTenant from "../pages/login-tenant";
import { ProfileSettingPage } from "../pages/profile-setting-page";
import { ForgotPasswordPage } from "../pages/forgot-password";
import { ResetPasswordPage } from "../pages/reset-password-page";
import { LoginUserPage } from "../pages/login-page";

import { SortPropertiesPage } from "../pages/sort-properties-page";
import Verification from "../pages/verify-page";
import DashboardTenants from "../pages/dashboard-tenants";
import { OrderListPage } from "../pages/order-list-page";
import { RoomListTenant } from "../pages/room-list-tenant";
import { AddPropertyPage } from "../pages/add-property-page";
import { DetailPropertyPage } from "../pages/detail-property-page";
import { DetailRoomPage } from "../pages/detail-room-page";
import { TransactionPage } from "../pages/transaction-page";
import SalesReportPage from "../pages/sales-report-page";
import { CalendarProperties } from "../pages/calendar-properties";

// export const AdminLayout = () => {
//   const outlet = useOutlet()
//   return <div>{outlet}</div>
// }

// const AdminRoutes = () => {
//   const data = useSelector((state => state.user.value))
//   // const data = useSelector((state) => state.user.value);
//   return data.roleId == 1 ? <AdminLayout /> : <Navigate to="/" replace />
// }

const Routes = (
  <>
    <Route path="/" element={<LandingPage />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<LoginUserPage />} />
    <Route path="/profile-setting" element={<ProfileSettingPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/verify" element={<Verification />} />
    <Route path="/book" element={<TransactionPage />} />
    <Route path="/property/:id" element={<DetailPropertyPage />} />
    <Route path="/room/:id" element={<DetailRoomPage />} />
    <Route path="/properties" element={<SortPropertiesPage />} />
    <Route path="/reset-password/:Token" element={<ResetPasswordPage />} />

    {/* <Route element={<AdminRoutes />} errorElement={errorPage}> */}
      <Route path="/login-tenant" element={<LoginTenant />} />
      <Route path="/register-tenant" element={<RegisterTenant />} />
     
    {/* <Route element={<AdminRoutes />}> */}
      <Route path="/dashboard" element={<DashboardTenants />} />
      <Route path="/dashboard/order-list" element={<OrderListPage />} />
      <Route path="/dashboard/sales-report" element={<SalesReportPage />} />
      <Route path="/dashboard/rooms/:propertyId" element={<RoomListTenant />} />
      <Route path="/dashboard/add-property" element={<AddPropertyPage />} />
      <Route path="/dashboard/calendar" element={<CalendarProperties />} />
    
    {/* </Route> */}
  </>
);

export const routes = createRoutesFromElements(Routes);



