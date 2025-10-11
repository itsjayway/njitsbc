import React from "react";
import Login from "./Login";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import ProfileEdit from "./ProfileEdit";
import classes from "../utils/classes";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user } = useUser();
  return (
    <nav className="flex flex-col md:flex-row p-4 bg-njit-red-dark justify-between" >
      <h1
        className="text-2xl lg:text-4xl font-brick cursor-pointer text-center lg:text-start"
        onClick={() => navigate("/")}
      >
        {isAuthenticated ? `${user.displayName}@` : ""}
        NJITSBC
      </h1>
      <div
        className={classes(
          "flex flex-col items-center",
          "md:flex-row md:space-x-2 md:items-end"
        )}
      >
        {isAuthenticated && (
          <>
            {isAdmin && (
              <Button
                content="Approve Clips"
                onClick={() => navigate("/approval")}
                className="bg-njit-navy text-gray-200 w-full text-nowrap"
              />)}
            <ProfileEdit className="w-full" disabled={true} />
          </>
        )}

        <Login buttonClassName="bg-red-500 text-gray-800 w-full" />
      </div>
    </nav>
  );
}
