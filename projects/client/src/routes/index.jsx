import { Route, createRoutesFromElements } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { ForgotPasswordPage } from "../pages/forgot-password";
import { ResetPasswordPage } from "../pages/reset-password-page";
import { ProfileSettingPage } from "../pages/profile-setting";


const Routes = <>
    <Route path="/login" element={<LoginPage />} />;
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password/:Token" element={<ResetPasswordPage />} />
    <Route path="/profile-setting" element={<ProfileSettingPage />} />

</> 

export const routes = createRoutesFromElements(Routes);
