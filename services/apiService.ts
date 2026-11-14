// services/apiService.ts

export const API_BASE_URL = "https://webapistaging-bxbefmgmbgh0fyg3.uaenorth-01.azurewebsites.net";

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResult {
  successful: boolean;
  token?: string;
  id?: number | string;
  userId?: number | string;
  mbm?: string | number;
  Mbm?: string | number;
  message?: string;
  error?: string;
}

export interface CompanyRelation {
  pcode?: string;
  enabled?: boolean;
  rCode?: string;
  City?: string;
  UName?: string;
  PName?: string;
  Limit?: number;
  Active?: boolean;
  [key: string]: unknown;
}

/**
 * Get standardized authorization headers for API requests.
 */
export function getAuthHeaders(token: string) {
  return {
    "Authorization": `Bearer ${token}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
  };
}

/**
 * Dedicated service function for external login API call.
 */
export async function authenticateUser(payload: LoginPayload, signal?: AbortSignal): Promise<LoginResult> {
  const res = await fetch(`${API_BASE_URL}/api/Login/LoginNewDdts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
    signal,
  });

  if (!res.ok) {
    throw new Error("Invalid credentials or API server error");
  }

  return res.json();
}

/**
 * Dedicated service function for fetching company list securely using centralized base URL and headers.
 */
export async function fetchCompanyList(userId: number | string, token: string, signal?: AbortSignal): Promise<CompanyRelation[]> {
  const res = await fetch(`${API_BASE_URL}/api/Company/GetCompanyList/${userId}/true`, {
    method: "GET",
    headers: getAuthHeaders(token),
    cache: "no-store",
    signal,
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return Array.isArray(data) ? data : (data?.ResultObj || []);
}