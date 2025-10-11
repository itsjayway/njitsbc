import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from "./Button";

interface LoginProps {
  showProfileEdit?: boolean;
  className?: string;
  text?: string;
}

export default function Login({
  className = "bg-njit-red-dark",
  text: buttonText = "Login",
}: LoginProps) {
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

  if (isAuthenticated) {
    return (
      <Button
        content="Logout"
        onClick={handleLogout}
        className={className}
      />
    );
  }

  return (
    <Button
      content={buttonText}
      onClick={handleLogin}
      className={className}
    />
  );
}
