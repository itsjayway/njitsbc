import React from "react";
import ReactDOM from "react-dom/client";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import App from "./App";
import "./index.css";
import { UserProvider } from "./contexts/roleContext";

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

msalInstance.handleRedirectPromise().then((response) => {
  if (response) {
    msalInstance.setActiveAccount(response.account);
  }
});

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    if (event.payload && "account" in event.payload && event.payload.account) {
      msalInstance.setActiveAccount(event.payload.account);
    }
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <UserProvider>
        <App />
      </UserProvider>
    </MsalProvider>
  </React.StrictMode>
);
