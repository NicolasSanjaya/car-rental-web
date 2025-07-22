"use server";

import { cookies } from "next/headers";

export async function checkUserSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { user: null };
  }

  console.log("action token", token);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      return { user: null };
    }

    const result = await response.json();
    return { user: result.data.user, token };
  } catch (error) {
    console.error("Server action auth check failed:", error);
    return { user: null };
  }
}
