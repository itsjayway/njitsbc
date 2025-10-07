import React from "react";
import ReactDOM from "react-dom/client";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import Landing from "./Landing";
import "./index.css";

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

// Wait for LOGIN_SUCCESS event to set the active account
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
      <Landing />
    </MsalProvider>
  </React.StrictMode>
);
