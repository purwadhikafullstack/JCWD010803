import { Route, createRoutesFromElements } from "react-router-dom";
import { ProfileSettingPage } from "../pages/profile-setting-page";
import { ForgotPasswordPage } from "../pages/forgot-password";
import { ResetPasswordPage } from "../pages/reset-password-page";
import { LoginUserPage } from "../pages/login-page";
import Register from "../pages/Register";


const Routes = <>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<LoginUserPage />} />;
    <Route path="/profile-setting" element={<ProfileSettingPage />} />;
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password/:Token" element={<ResetPasswordPage />} />
</> 

export const routes = createRoutesFromElements(Routes);



