import { Route, createRoutesFromElements } from "react-router-dom";
import { LoginUserPage } from "../pages/login-page";


const Routes = <>
    <Route path="/login" element={<LoginUserPage />} />;
</> 

export const routes = createRoutesFromElements(Routes);
