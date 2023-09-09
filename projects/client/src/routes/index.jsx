import { Route, createRoutesFromElements } from "react-router-dom";
import LandingPage from "../pages/landing-page";



const Routes = <Route path="/" element={<LandingPage />} />;


export const routes = createRoutesFromElements(Routes);
