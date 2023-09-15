import LandingPage from "../pages/landing-page";
import Register from "../pages/Register";
import { Route, createRoutesFromElements } from "react-router-dom";
import LoginTenant from "../pages/login-tenant";
import { ProfileSettingPage } from "../pages/profile-setting-page";
import { ForgotPasswordPage } from "../pages/forgot-password";
import { ResetPasswordPage } from "../pages/reset-password-page";
import { LoginUserPage } from "../pages/login-page";
import DashboardTenants from "../pages/dashboard-tenants";




const Routes = <>
    <Route path="/" element={<LandingPage/>} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<LoginUserPage />} />;
    <Route path="/login-tenant" element={<LoginTenant />} />;
    <Route path="/dashboard" element={<DashboardTenants/>} />;
    <Route path="/profile-setting" element={<ProfileSettingPage />} />;
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password/:Token" element={<ResetPasswordPage />} />


</> 

export const routes = createRoutesFromElements(Routes);



