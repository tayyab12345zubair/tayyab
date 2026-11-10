import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.SESSION_SECRET || "default_super_secret_key_change_in_production_32bytes"
);

export interface SessionData {
  token: string;
  userId: number | string;
  Mbm?: string | number;
  tokenExpiry?: string;
  selectedCompany: Record<string, unknown>; // 'any' ki jagah yeh use karein
}

// Session ko encrypt karke opaque JWT cookie mein store karna
export async function createSession(data: SessionData) {
  const encryptedSession = await new SignJWT({ ...data })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Session lifespan
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set({
    name: "app_session",
    value: encryptedSession,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

// Server-side session ko retrieve aur decrypt karna
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("app_session")?.value;

  if (!sessionCookie) return null;

  try {
    const { payload } = await jwtVerify(sessionCookie, SECRET_KEY);
    return payload as unknown as SessionData;
  } catch {
    return null;
  }
}

// Session destroy karna (Logout)
export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("app_session");
}