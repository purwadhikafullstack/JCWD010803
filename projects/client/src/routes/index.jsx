import { Route, createRoutesFromElements } from "react-router-dom";
import { LoginUserPage } from "../pages/login-page";
import { ProfileSettingPage } from "../pages/profile-setting-page";


const Routes = <>
    <Route path="/login" element={<LoginUserPage />} />;
    <Route path="/profile-setting" element={<ProfileSettingPage />} />;
</> 

export const routes = createRoutesFromElements(Routes);
