import { Route, createRoutesFromElements } from "react-router-dom";
import Register from "../pages/Register";
import { LoginUserPage } from "../pages/login-page";


const Routes = <>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<LoginUserPage />} />;
</> 

export const routes = createRoutesFromElements(Routes);
