import { authStore } from "@/store/authStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiRequest<T>(endpoint: string, method: string = "GET", body?: any): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  const token = authStore.getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (response.status === 401) {
    // 401 Unauthorized handling: clear store and redirect to login
    authStore.clear();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  const responseText = await response.text();
  
  // Case-insensitive deserialization support via JSON.parse
  const data = responseText ? JSON.parse(responseText) : null;
  return data as T;
}