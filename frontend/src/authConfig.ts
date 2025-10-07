const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectUri =
  import.meta.env.VITE_REDIRECT_URI || "http://localhost:5173";

export const msalConfig = {
  auth: {
    clientId,
    authority: "https://njitsbc.ciamlogin.com/",
    knownAuthorities: ["njitsbc.ciamlogin.com"],
    redirectUri,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile"],
};

export const profileEditAuthority = "https://njitsbc.ciamlogin.com/njitsbc.onmicrosoft.com/tfp/ProfileEdit/v2.0";
