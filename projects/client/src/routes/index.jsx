import { Route, createRoutesFromElements } from "react-router-dom";
import Register from "../pages/Register";

const Routes = (
  <>
    <Route path="/register" element={<Register />} />
  </>
);

export const routes = createRoutesFromElements(Routes);
