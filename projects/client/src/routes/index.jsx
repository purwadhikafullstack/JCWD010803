import LandingPage from "../pages/landing-page";
import Register from "../pages/Register";
import { Route, createRoutesFromElements } from "react-router-dom";
import RegisterTenant from "../components/tenant/register-tenant/register-tenant";
import { ProfileSettingPage } from "../pages/profile-setting-page";
import { ForgotPasswordPage } from "../pages/forgot-password";
import { ResetPasswordPage } from "../pages/reset-password-page";
import { LoginUserPage } from "../pages/login-page";
import Verification from "../pages/verify-page";


const Routes = (
  <>
    <Route path="/" element={<LandingPage />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<LoginUserPage />} />;
    <Route path="/profile-setting" element={<ProfileSettingPage />} />;
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/register-tenant" element={<RegisterTenant />} />
    <Route path="/reset-password/:Token" element={<ResetPasswordPage />} />
    <Route path="/verify" element={<Verification />} />
</> 
);

export const routes = createRoutesFromElements(Routes);
