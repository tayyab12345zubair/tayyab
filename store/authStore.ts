// store/authStore.ts

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

export const authStore = {
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  },

  getSelectedCompany(): CompanyRelation | null {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("selected_company");
    return data ? JSON.parse(data) : null;
  },

  setSelectedCompany(company: CompanyRelation) {
    if (typeof window !== "undefined") {
      localStorage.setItem("selected_company", JSON.stringify(company));
    }
  },

  clearSession() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("selected_company");
      localStorage.clear();
    }
  },
};