import "server-only";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function serverApiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${session.token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (response.status === 401) {
    redirect("/login");
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API request failed with status ${response.status}`);
  }

  return response.json();
}