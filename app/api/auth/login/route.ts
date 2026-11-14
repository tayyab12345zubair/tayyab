import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";
import { authenticateUser, fetchCompanyList } from "@/services/apiService";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Timeout controller for login (6 seconds limit)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    let result;
    try {
      result = await authenticateUser({ email, password, rememberMe: false }, controller.signal);
    } catch {
      clearTimeout(timeoutId);
      return NextResponse.json(
        { error: "Azure API server is taking too long to respond or unreachable." }, 
        { status: 504 }
      );
    }

    clearTimeout(timeoutId);

    if (!result || !result.successful || !result.token) {
      return NextResponse.json({ error: result?.message || result?.error || "Authentication failed" }, { status: 400 });
    }

    const token = result.token;
    const userId = result.id || result.userId;

    if (!userId) {
      return NextResponse.json({ error: "User ID missing from authentication response" }, { status: 400 });
    }

    const Mbm = result.mbm || result.Mbm;

    // Fast company fetch with a short 2-second timeout
    let selectedCompany = { pcode: "PAK", enabled: true };
    try {
      const companyController = new AbortController();
      const companyTimeout = setTimeout(() => companyController.abort(), 2000);

      const companies = await fetchCompanyList(userId, token, companyController.signal);
      clearTimeout(companyTimeout);

      if (companies.length > 0) {
        selectedCompany = companies[0];
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