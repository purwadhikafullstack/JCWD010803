import LandingPage from "../pages/landing-page";
import Register from "../pages/Register";
import { Route, createRoutesFromElements } from "react-router-dom";
import RegisterTenant from "../components/tenant/register-tenant/register-tenant";
import LoginTenant from "../pages/login-tenant";
import { ProfileSettingPage } from "../pages/profile-setting-page";
import { ForgotPasswordPage } from "../pages/forgot-password";
import { ResetPasswordPage } from "../pages/reset-password-page";
import { LoginUserPage } from "../pages/login-page";
import { SortPropertiesPage } from "../pages/sort-properties-page";
import Verification from "../pages/verify-page";
import DashboardTenants from "../pages/dashboard-tenants";
import { RoomListTenant } from "../pages/room-list-tenant";
import { AddPropertyPage } from "../pages/add-property-page";


const Routes = (
  <>
    <Route path="/" element={<LandingPage />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<LoginUserPage />} />
    <Route path="/login-tenant" element={<LoginTenant />} />
    <Route path="/dashboard" element={<DashboardTenants />} />
    <Route path="/dashboard/rooms/:propertyId" element={<RoomListTenant />} />
    <Route path="/profile-setting" element={<ProfileSettingPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/register-tenant" element={<RegisterTenant />} />
    <Route path="/reset-password/:Token" element={<ResetPasswordPage />} />
    <Route path="/properties" element={<SortPropertiesPage />} />
    <Route path="/verify" element={<Verification />} />
    <Route path="/dashboard/add-property" element={<AddPropertyPage />} />
  </>
);

export const routes = createRoutesFromElements(Routes);
