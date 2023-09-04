import { Route, createRoutesFromElements } from "react-router-dom";
import { LoginPage } from "../pages/login";


const Routes = <>
    <Route path="/login" element={<LoginPage />} />;
</> 

export const routes = createRoutesFromElements(Routes);
