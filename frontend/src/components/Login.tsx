import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from "./Button";
import ProfileEdit from "./ProfileEdit";
import { useRegisterUser } from "../hooks/useRegisterUser";

interface LoginProps {
  showProfileEdit?: boolean;
  buttonClassName?: string;
  text?: string;
}

export default function Login({
  showProfileEdit = false,
  buttonClassName = "bg-njit-red-dark",
  text: buttonText = "Login",
}: LoginProps) {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  useRegisterUser();

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
      <div className="flex items-center gap-4">
        {showProfileEdit && <ProfileEdit disabled={true} />}
        <Button
          content="Logout"
          onClick={handleLogout}
          className={buttonClassName}
        />
      </div>
    );
  }

  return (
    <Button
      content={buttonText}
      onClick={handleLogin}
      className={buttonClassName}
    />
  );
}
