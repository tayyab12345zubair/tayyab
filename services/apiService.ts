// services/apiService.ts (Server/Client safe wrapper)
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (response.status === 401) {
    // Unauthorized: Redirect to login or handle session expiry
    if (typeof window !== "undefined") {
     // eslint-disable-next-line @next/next/no-location-assign-relative-destination
window.location.href = "/login";
    }
    throw new Error("Unauthorized session");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "API request failed");
  }

  return response.json();
}