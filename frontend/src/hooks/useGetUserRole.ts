import { useState, useEffect } from "react";
import type UserInfo from "../interfaces/UserInfoInterface";

async function getUserInfo(email: string): Promise<UserInfo> {
  let role = "guest";
  let displayName = "";
  try {
    const resp = await fetch(
      `http://localhost:7071/api/getUserRole?email=${encodeURIComponent(email)}`
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

export default function useGetUserRole(systemUsername: string): UserInfo {
  const [user, setUser] = useState<UserInfo>({
    role: "guest",
    displayName: "",
    email: "",
  });

  useEffect(() => {
    if (systemUsername)
      getUserInfo(systemUsername).then(({ role, displayName, email }) => {
        setUser({ role, displayName, email });
      });
  }, [systemUsername]);

  return user;
}
