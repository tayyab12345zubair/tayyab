"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

    router.push("/dashboard");
  }

  return (
    <main
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "320px",
        }}
      >
        {/* Glowing Logo */}
        <div
          style={{
            marginBottom: "30px",
            filter: "drop-shadow(0 0 15px rgba(212, 175, 55, 0.3))",
            textAlign: "center",
          }}
        >
          <Image
            src="/Logo.png"
            alt="Logo"
            width={210}
            height={230}
            priority
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Form ke andar saari cheezein center align karne ke liye
            gap: "12px",
          }}
        >
          {/* Username Input */}
          <div style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Username"
              aria-label="Username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: "14px",
                borderRadius: "6px",
                border: "1px solid #2a2a2a",
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Password Input */}
          <div
            style={{
              width: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              aria-label="Password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 55px 12px 14px",
                fontSize: "14px",
                borderRadius: "6px",
                border: "1px solid #2a2a2a",
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "14px",
                background: "transparent",
                border: "none",
                fontSize: "13px",
                color: "#888888",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && (
            <p
              role="alert"
              style={{ color: "#ef4444", fontSize: "12px", margin: "4px 0", textAlign: "center" }}
            >
              {error}
            </p>
          )}

          {/* Centered Login Button (Slightly narrower and perfectly centered) */}
          <button
            type="submit"
            style={{
              width: "45%", // Button ko chota aur center karne ke liye width kam ki hai
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: "#5856d6",
              color: "#ffffff",
              border: "none",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "8px",
              transition: "background-color 0.2s ease",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}