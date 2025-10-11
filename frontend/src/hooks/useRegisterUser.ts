import { useMsal } from "@azure/msal-react";

export async function useRegisterUser() {
  const { accounts } = useMsal();

  if (accounts.length === 0) return;
  const account = accounts[0];

  await fetch("http://localhost:7071/api/registerUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: account.localAccountId,
      displayName: account.name,
      email: account.idTokenClaims?.email || account.username,
    }),
  });
}
