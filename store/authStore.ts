// store/authStore.ts
class AuthStore {
  private userId: number | null = null;
  private mbm: string | null = null;
  private token: string | null = null;

  setUserData(id: number | null, mbm: string, token: string | null) {
    this.userId = id;
    this.mbm = mbm;
    this.token = token;
  }

  setToken(newToken: string | null) {
    this.token = newToken;
  }

  getUserId() { return this.userId; }
  getMbm() { return this.mbm; }
  getToken() { return this.token; }

  clear() {
    this.userId = null;
    this.mbm = null;
    this.token = null;
  }
}

export const authStore = new AuthStore();