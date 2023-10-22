import React, { Component, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Crisp } from "crisp-sdk-web";
import ReactDOM from "react-dom";
import "./global.css";
import "./index.css";
import App from "./App";

const router = createBrowserRouter(routes);

class MyApp extends Component {
  componentDidMount() {
    Crisp.configure("b5c55ecc-3330-4ec8-969d-7298423ac555");
  }

  render() {
    return (
      <React.StrictMode>
        <Provider store={store}>
          <RouterProvider router={router}/>
            <App />
        </Provider>
      </React.StrictMode>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<MyApp />);
