/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

type LoginState = {
  success?: boolean;
  message?: string;
  error?: boolean;
  data?: any;
};

export async function loginAction(
  prevState: any,
  formData: FormData
): Promise<LoginState> {
  console.log({ formData });
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // jika backend set cookie, ini penting
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Login gagal",
        error: true,
        data: null,
      };
    }

    console.log("user", data.data.user);
    const token = data.data.token;

    // Set cookie secara manual
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      maxAge: 60 * 60 * 24,
    });

    if (data.data.user.role === "admin") {
      cookieStore.set({
        name: "role",
        value: "admin",
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        maxAge: 60 * 60 * 24,
      });
    }

    return {
      success: true,
      message: data.message || "Login Berhasil",
      error: false,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Login gagal",
      error: true,
      data: null,
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  console.log(cookieStore.get("token"));

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieStore.get("token")?.value}`,
        },
      }
    );
    const data = await response.json();

    console.log("logout data action", data);
    if (data.success) {
      // Hapus semua cookies
      cookieStore.delete("token");
      cookieStore.delete("role");
    }

    return {
      success: true,
      message: "Logout Berhasil",
      error: false,
      data,
    };
  } catch (error) {
    console.error("Logout failed:", error);
    return {
      success: false,
      message: "Logout gagal",
      error: true,
      data: null,
    };
  }
}
