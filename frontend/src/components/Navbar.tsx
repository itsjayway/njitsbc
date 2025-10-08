import React from "react";
import Login from "./Login";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user } = useUser();
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-njit-red-dark border-b border-gray-800 sm:flex-row flex-col gap-4">
      <h1
        className="text-4xl font-brick cursor-pointer"
        onClick={() => navigate("/")}
      >
        {isAuthenticated ? `${user.displayName}@` : ""}
        NJITSBC
      </h1>
      <div className="flex space-x-4">
        {isAdmin && (
          <Button
            content="Approve Clips"
            onClick={() => navigate("/approval")}
            className="bg-njit-navy text-gray-200"
          />
        )}
        <Login showProfileEdit={true} />
      </div>
    </nav>
  );
}
