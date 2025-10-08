import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

export function useRegisterUser() {
  const { accounts } = useMsal();

  useEffect(() => {
    if (accounts.length === 0) return;
    const account = accounts[0];

    const hasRegistered = localStorage.getItem("user_registered");
    if (hasRegistered) return;

    const register = async () => {
      await fetch("http://localhost:7071/api/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: account.localAccountId,
          displayName: account.name,
          email: account.idTokenClaims?.email || account.username,
        }),
      });

      localStorage.setItem("user_registered", "true");
    };

    register();
  }, [accounts]);
}
