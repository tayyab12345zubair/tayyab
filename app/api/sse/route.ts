import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const baseUrl = "https://webapistaging-bxbefmgmbgh0fyg3.uaenorth-01.azurewebsites.net";

    // Timeout controller for Azure Staging API (6 seconds limit)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    let loginRes;
    try {
      loginRes = await fetch(`${baseUrl}/api/Login/LoginNewDdts`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password, rememberMe: false }),
        cache: "no-store",
        signal: controller.signal,
      });
    } catch {
      clearTimeout(timeoutId);
      return NextResponse.json(
        { error: "Azure API server is taking too long to respond or unreachable." }, 
        { status: 504 }
      );
    }

    clearTimeout(timeoutId);

    if (!loginRes.ok) {
      return NextResponse.json({ error: "Invalid credentials or API server error" }, { status: 401 });
    }

    const result = await loginRes.json();
    
    if (!result || !result.successful || !result.token) {
      return NextResponse.json({ error: result?.message || "Authentication failed from server" }, { status: 400 });
    }

    const token = result.token;
    const userId = result.id || result.userId || 576;
    const Mbm = result.mbm || result.Mbm;

    // Fast company fetch with a short 2-second timeout so login never hangs
    let selectedCompany = { pcode: "PAK", enabled: true };
    try {
      const companyController = new AbortController();
      const companyTimeout = setTimeout(() => companyController.abort(), 2000);

      const companyRes = await fetch(`${baseUrl}/api/Company/GetCompanyList/${userId}/true`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
        cache: "no-store",
        signal: companyController.signal,
      }).then((res) => res.json()).catch(() => []);

      clearTimeout(companyTimeout);

      const companies = Array.isArray(companyRes) ? companyRes : (companyRes?.ResultObj || []);
      if (companies.length > 0) {
        selectedCompany = companies[0]; // Fix: Assigning the first company properly here
      }
    } catch {
      // Fallback to default company if fetch takes too long
    }

    // Securely store JWT token inside httpOnly session cookie
    await createSession({
      token,
      userId,
      Mbm,
      selectedCompany,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Login connection failed: ${message}` }, { status: 500 });
  }
}