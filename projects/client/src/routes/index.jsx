import { Route, createRoutesFromElements } from "react-router-dom";
import { ForgotPasswordPage } from "../pages/forgot-password";
import { ResetPasswordPage } from "../pages/reset-password-page";
import { LoginUser } from "../views/auth/login-user";


const Routes = <>
    <Route path="/login" element={ <LoginUser /> } />;
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password/:Token" element={<ResetPasswordPage />} />

</> 

export const routes = createRoutesFromElements(Routes);
