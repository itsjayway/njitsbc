import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from "./Button";
import ProfileEdit from "./ProfileEdit";

export default function Login() {
  const { instance, accounts } = useMsal();

  const isAuthenticated = accounts.length > 0;

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await instance.logoutPopup({
        mainWindowRedirectUri: window.location.origin,
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <ProfileEdit disabled={true} />
          <Button text="Logout" onClick={handleLogout} className="bg-njit-red hover:bg-red-800"/>
        </div>
      ) : (
        <Button text="Login" onClick={handleLogin} className="bg-njit-red-dark"/>
      )}
    </div>
  );
}
