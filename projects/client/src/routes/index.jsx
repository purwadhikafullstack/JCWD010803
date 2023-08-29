import { Route, createRoutesFromElements } from "react-router-dom";

import SignInSide from "../components/tenant/login-page";

const Routes = <Route path="/" element={<SignInSide />} />;

export const routes = createRoutesFromElements(Routes);
