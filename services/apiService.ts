import { authStore } from "@/store/authStore";

export interface ResultSet<TResultType> {
  Status: string;
  ResultObj: TResultType;
}

export interface HardCodedUsers {
  R777Id: number;
  HardCodedSubUsersTable: Record<number, number[]> | Map<number, Set<number>>;
}

export interface CDRelation {
  ID: number;
  CompanyID: number;
  DeviceID: number;
  Limit: number;
  UName: string;
  rCode: string;
  Active: boolean;
  PName: string;
  City: string;
  PicLight: number[];
  PicDark: number[];
  Pcode: string;
  Enabled: boolean;
  rBlocked: boolean;
  Block: boolean;
}

export async function apiRequest<T>(
  endpoint: string,
  method: string = "GET",
  body?: unknown
): Promise<T | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const token = authStore.getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}/${endpoint.replace(/^\/+/, "")}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    if (typeof authStore.clearSession === "function") {
      authStore.clearSession();
    }
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchPermissionsAndCompanies(userId: number | string) {
  try {
    const permRes = await apiRequest<HardCodedUsers>("api/Permissions/GetHardCodedUsers", "GET");
    if (permRes) {
      authStore.setPermissions(permRes);
    }
  } catch (e) {
    console.warn("Could not fetch hardcoded users permissions:", e);
  }

  const validUserId = userId || 576;

  // Real API call with single slash for correct backend route binding
  const companyRes = await apiRequest<ResultSet<CDRelation[] | null>>(
    `api/Company/GetCompanyList/${validUserId}/true`,
    "GET"
  );

  return { companyRes };
}