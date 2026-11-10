"use server";

import dns from "dns";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

// Force Node.js to prefer IPv4 to prevent ECONNRESET / fetch failures with Azure
dns.setDefaultResultOrder("ipv4first");

export async function handleServerLogin(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const baseUrl = (
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://webapistaging-bxbefmgmbgh0fyg3.uaenorth-01.azurewebsites.net"
  ).replace(/\/$/, "");

  try {
    const loginEndpoint = `${baseUrl}/api/Login/LoginNewDdts`;
    console.log("Attempting Login Fetch to:", loginEndpoint);

    // 1. External Login API Call
    const loginRes = await fetch(loginEndpoint, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email, password, rememberMe: false }),
      cache: "no-store",
    });

    if (!loginRes.ok) {
      const errorText = await loginRes.text().catch(() => "");
      console.error(`Login API failed with status ${loginRes.status}:`, errorText);
      return { error: `Backend Auth Error (Status: ${loginRes.status})` };
    }

    const result = await loginRes.json();

    if (!result || !result.successful || !result.token) {
      return { error: result?.error || "Login failed. Please check your credentials." };
    }

    const token = result.token;
    const userId = result.id || result.userId || 576;
    const Mbm = result.mbm || result.Mbm;

    // 2. Fetch Company List
    const companyEndpoint = `${baseUrl}/api/Company/GetCompanyList/${userId}/true`;
    console.log("Fetching Company List from:", companyEndpoint);

    const companyRes = await fetch(companyEndpoint, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cache: "no-store",
    }).then((res) => res.json());

    console.log("COMPANY API FULL RESPONSE:", JSON.stringify(companyRes, null, 2));

    let companies = [];
    if (Array.isArray(companyRes)) {
      companies = companyRes;
    } else if (companyRes?.ResultObj && Array.isArray(companyRes.ResultObj)) {
      companies = companyRes.ResultObj;
    } else if (companyRes?.data && Array.isArray(companyRes.data)) {
      companies = companyRes.data;
    } else if (companyRes?.value && Array.isArray(companyRes.value)) {
      companies = companyRes.value;
    } else if (companyRes && typeof companyRes === "object") {
      companies = [companyRes];
    }

    if (!companies || companies.length === 0) {
      return { error: "No Parties Found" };
    }

    // 3. Create Session Cookie
    await createSession({
      token,
      userId,
      Mbm,
      selectedCompany: companies[0],
    });

  } catch (err: unknown) {
    console.error("EXACT FETCH ERROR IN SERVER ACTION:", err);
    
    if (err instanceof Error && err.message === "NEXT_REDIRECT") {
      throw err;
    }

    const message = err instanceof Error ? err.message : "Failed to connect to Azure API.";
    return { error: `Network Connection Error: ${message}` };
  }

  redirect("/dashboard");
}