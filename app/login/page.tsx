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
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Background Logo with Low Opacity */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "450px",
          height: "450px",
          opacity: 0.209, // Background logo opacity
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Image
          src="/Logo.png"
          alt="Background Watermark Logo"
          fill
          priority
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Topbar: Only Client App Title */}
      <header
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "0.5px",
            color: "inherit",
          }}
        >
          Client <span style={{ color: "#3b82f6" }}>App</span>
        </span>
      </header>

      {/* Main Canvas Area */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          margin: "20px 0",
        }}
      >
        {/* Transparent Glassmorphism Login Box */}
        <div
          style={{
            width: "100%",
            maxWidth: "320px",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "28px 20px",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "6px" }}>
            Welcome Back
          </h1>
          <p
            style={{
              fontSize: "12px",
              opacity: 0.7,
              marginBottom: "20px",
            }}
          >
            Enter your credentials to continue.
          </p>

          <form
            onSubmit={handleLogin}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Short Username Input */}
            <div style={{ width: "100%", maxWidth: "240px" }}>
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
                  padding: "9px 12px",
                  fontSize: "13px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  background: "rgba(255, 255, 255, 0.04)",
                  color: "inherit",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Short Password Input */}
            <div
              style={{
                width: "100%",
                maxWidth: "240px",
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
                  padding: "9px 45px 9px 12px",
                  fontSize: "13px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  background: "rgba(255, 255, 255, 0.04)",
                  color: "inherit",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  background: "transparent",
                  border: "none",
                  fontSize: "11px",
                  color: "inherit",
                  cursor: "pointer",
                  opacity: 0.7,
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && (
              <p
                role="alert"
                style={{ color: "#ef4444", fontSize: "12px", margin: "4px 0" }}
              >
                {error}
              </p>
            )}

            {/* Compact Arrow Submit Button */}
            <button
              type="submit"
              aria-label="Login"
              title="Login"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "8px",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
                transition: "transform 0.2s ease",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>

          <p
            style={{
              fontSize: "11px",
              opacity: 0.5,
              marginTop: "16px",
            }}
          >
            Secure access to your account
          </p>
        </div>
      </section>
    </main>
  );
}