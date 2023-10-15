import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { ThemeProvider } from "@material-tailwind/react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
        <App />
      </Provider>
  </React.StrictMode>
);
