import { useState, useEffect } from "react";
import type UserInfo from "../interfaces/UserInfoInterface";

async function getUserInfo(
  localAccountId: string,
  email: string,
  displayName: string
): Promise<UserInfo> {
  let role = "viewer";
  try {
    const resp = await fetch(
      `http://localhost:7071/api/getUserRole?localAccountId=${encodeURIComponent(
        localAccountId
      )}&displayName=${encodeURIComponent(
        displayName
      )}&email=${encodeURIComponent(email)}`
    );
    const data = await resp.json();
    role = data.role;
    displayName = data.display_name;
    email = data.email;
  } catch (err) {
    console.error("Error fetching role:", err);
  }
  return { role, displayName, email };
}

export default function useGetUserRole(
  localAccountId: string,
  email: string,
  displayName: string
): UserInfo {
  const [user, setUser] = useState<UserInfo>({
    role: "viewer",
    displayName: "",
    email: "",
  });

  useEffect(() => {
    if (localAccountId && email && displayName)
      getUserInfo(localAccountId, email, displayName).then(
        ({ role, displayName, email }) => {
          setUser({ role, displayName, email });
        }
      );
  }, [localAccountId, email, displayName]);

  return user;
}
