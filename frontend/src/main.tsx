import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import globalStore from "./store/globalStore.ts";
import { router } from "./router/router.tsx";
import { CookiesProvider } from "react-cookie";
import { MsalProvider } from "@azure/msal-react";

import { msalInstance } from "../msalConfig.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CookiesProvider>
    <Provider store={globalStore}>
      <MsalProvider instance={msalInstance}>
        <div id="main-container">
          <RouterProvider router={router} />
        </div>
      </MsalProvider>
    </Provider>
  </CookiesProvider>
);
