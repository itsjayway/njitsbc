import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest, profileEditAuthority } from "../authConfig";
import classes from "../utils/classes";
import Button from "./Button";

const msalInstance = new PublicClientApplication(msalConfig);

await msalInstance.initialize();

interface ProfileEditProps {
  disabled?: boolean;
  className?: string;
}

export default function ProfileEdit({ disabled = false, className = "" }: ProfileEditProps) {
  const handleProfileEdit = async () => {
    await msalInstance.loginPopup({
      ...loginRequest,
      authority: profileEditAuthority,
    });
  };

  return (
    <Button
      className={classes(
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-njit-navy hover:bg-njit-navy-dark",
        className
      )}
      onClick={handleProfileEdit}
      disabled={disabled}
      content="Customize"
    ></Button>
  );
}
