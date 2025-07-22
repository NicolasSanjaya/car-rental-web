/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

type RegisterState = {
  success?: boolean;
  message?: string;
  error?: boolean;
  data?: any;
};

export async function registerAction(
  prevState: any,
  formData: FormData
): Promise<RegisterState> {
  const full_name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const register = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name,
          email,
          password,
        }),
      }
    );

    const data = await register.json();

    console.log("register data", data);

    if (!register.ok) {
      return {
        success: false,
        message: data.message || "Login gagal",
        error: true,
        data: null,
      };
    }
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
