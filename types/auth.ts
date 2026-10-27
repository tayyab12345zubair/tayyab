export interface LoginModel {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResult {
  successful: boolean;
  error: string | null;
  token: string | null;
  ID: number | null;
  UnID: string;
}