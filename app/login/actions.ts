"use server";

import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function handleServerLogin(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  try {
    // 1. External Login API call
    const loginRes = await fetch(`${baseUrl}/api/Login/LoginNewDdts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, rememberMe: false }),
    });

    const result = await loginRes.json();

    if (!result || !result.successful || !result.token) {
      return { error: result?.error || "Login failed. Please check your credentials." };
    }

    const token = result.token;
    const userId = result.id || result.userId || 576;
    const Mbm = result.mbm || result.Mbm;

    // 2. Fetch Company list securely using backend token
    const companyRes = await fetch(`${baseUrl}/api/Company/GetCompanyList/${userId}/true`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    const companies = companyRes?.ResultObj;
    if (!companies || !Array.isArray(companies) || companies.length === 0) {
      return { error: "No Parties Found" };
    }

    // 3. Create encrypted server-side session (Opaque cookie sent to browser)
    await createSession({
      token,
      userId,
      Mbm,
      selectedCompany: companies[0],
    });

  } catch (err: unknown) {
    if (err instanceof Error && err.message === "NEXT_REDIRECT") {
      throw err;
    }
    const message = err instanceof Error ? err.message : "An error occurred during login.";
    return { error: message };
  }

  redirect("/dashboard");
}