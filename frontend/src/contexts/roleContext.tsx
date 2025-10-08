import React, { createContext } from "react";
import { useMsal } from "@azure/msal-react";
import useGetUserRole from "../hooks/useGetUserRole";
import type UserInfo from "../interfaces/UserInfoInterface";

interface UserContextType {
  user: UserInfo;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isMember: boolean;
  role: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { accounts } = useMsal();

  const isAuthenticated = accounts.length > 0;
  const email: string = typeof accounts[0]?.idTokenClaims?.email === "string" ? accounts[0].idTokenClaims.email : "";
  const user = useGetUserRole(email);
  const { role } = user;
  const isAdmin = role === "admin";
  const isMember = role === "member";

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isMember,
        role,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
