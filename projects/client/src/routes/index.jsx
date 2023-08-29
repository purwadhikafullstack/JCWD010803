import { Route, createRoutesFromElements } from "react-router-dom";
import HomepageView from "../views/Home";

const Routes = <Route path="/" element={<HomepageView />} />;

export const routes = createRoutesFromElements(Routes);
