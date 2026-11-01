class AuthStore {
  private token: string | null = null;
  private selectedCompany: any | null = null;
  private permissions: any | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token") || null;
    }
  }

  public getToken(): string | null {
    if (!this.token && typeof window !== "undefined") {
      const match = document.cookie.match(new RegExp('(^| )auth_token=([^;]+)'));
      if (match) this.token = match[2];
    }
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  }

  public setSelectedCompany(company: any) {
    this.selectedCompany = company;
  }

  public getSelectedCompany() {
    return this.selectedCompany;
  }

  public setPermissions(perms: any) {
    this.permissions = perms;
  }

  public getPermissions() {
    return this.permissions;
  }

  public clearSession() {
    this.token = null;
    this.selectedCompany = null;
    this.permissions = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      document.cookie = "auth_token=; path=/; max-age=0";
    }
  }
}

export const authStore = new AuthStore();