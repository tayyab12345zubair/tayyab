"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return { error: "Invalid email or password" };
    }

    const data = await response.json();
    const token = data.token || data.accessToken;

    if (!token) {
      return { error: "Authentication token missing from response" };
    }

    // Set the token securely in an HttpOnly cookie (inaccessible to client-side JS)
    const cookieStore = await cookies();
    cookieStore.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
  } catch (err) {
    return { error: "An unexpected error occurred during login." };
  }

  redirect("/dashboard");
}