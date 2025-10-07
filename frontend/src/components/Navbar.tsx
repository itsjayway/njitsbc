import React from "react";
import Login from "./Login";
import { useMsal } from "@azure/msal-react";

export default function Navbar() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;
  const username = instance.getActiveAccount()?.name || "User";
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-njit-red-dark border-b border-gray-800 sm:flex-row flex-col gap-4">
      <h1 className="text-4xl font-brick">
        {isAuthenticated ? `${username}@` : ""}
        NJITSBC
      </h1>
      <div className="space-x-4">
        <Login showProfileEdit={true} />
      </div>
    </nav>
  );
}
