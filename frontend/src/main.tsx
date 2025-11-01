import React from "react";
import ReactDOM from "react-dom/client";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import App from "./App";
import "./index.css";
import { UserProvider } from "./contexts/roleContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5 * 60, // 5min
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MsalProvider instance={msalInstance}>
        <UserProvider>
          <App />
        </UserProvider>
      </MsalProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
