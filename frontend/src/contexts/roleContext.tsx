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
  const displayName: string = typeof accounts[0]?.name === "string" ? accounts[0].name : "";
  const localAccountId: string = typeof accounts[0]?.localAccountId === "string" ? accounts[0].localAccountId : "";
  const user = useGetUserRole(localAccountId, email, displayName);
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
