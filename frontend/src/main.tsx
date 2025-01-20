import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import globalStore from "./store/globalStore.ts";
import { router } from "./router/router.tsx";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CookiesProvider>
    <Provider store={globalStore}>
      <div id="main-container">
        <RouterProvider router={router} />
      </div>
    </Provider>
  </CookiesProvider>
);
