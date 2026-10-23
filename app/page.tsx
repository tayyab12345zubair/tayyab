
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    // Demo only. Connect the authentication API later.
    router.push("/dashboard");
  }

  return (
    <main className="sketch-login">
      <header className="login-topbar">
        <span className="brand">
          Mohsin <span className="brand-mark">Chachhu</span>
        </span>
        <ThemeToggle />
      </header>

      <section className="login-canvas">
        <div className="login-logo-area">
          <div className="logo-placeholder">
            <span>LOGO</span>
          </div>
        </div>

        <div className="login-form-area">
          <div className="login-form-card">
            <h1>Welcome Back</h1>
            <p className="login-description">
              Enter your credentials to continue.
            </p>

            <form onSubmit={handleLogin}>
              <div className="sketch-input">
                <input
                  type="text"
                  placeholder="Username"
                  aria-label="Username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>

              <div className="sketch-input password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  aria-label="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {error && (
                <p className="login-error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="primary-button login-submit">
                Login
              </button>
            </form>

            <p className="login-footer">
              Secure access to your account
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
