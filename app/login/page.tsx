"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { handleServerLogin } from "@/app/login/actions";
export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(handleServerLogin, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      <form
        action={formAction}
        style={{
          width: "100%",
          maxWidth: "320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <Image
            src="/Logo.png"
            alt="Logo"
            width={160}
            height={160}
            style={{ objectFit: "contain" }}
          />
        </div>

        {state?.error && (
          <div
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#ef4444",
              borderRadius: "6px",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            {state.error}
          </div>
        )}

        <div style={{ width: "100%" }}>
          <input
            type="text"
            name="email"
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid #2a2a2a",
              backgroundColor: "#1a1a1a",
              color: "#ffffff",
              fontSize: "14px",
              outline: "none",
            }}
            placeholder="Username"
          />
        </div>

        <div style={{ width: "100%", position: "relative", display: "flex", alignItems: "center" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            style={{
              width: "100%",
              padding: "12px 50px 12px 14px",
              borderRadius: "8px",
              border: "1px solid #2a2a2a",
              backgroundColor: "#1a1a1a",
              color: "#ffffff",
              fontSize: "14px",
              outline: "none",
            }}
            placeholder="Password (min 6 digits)"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: "14px",
              background: "none",
              border: "none",
              color: "#888888",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#5856d6",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "14px",
            cursor: isPending ? "not-allowed" : "pointer",
            transition: "background 0.2s ease",
            marginTop: "4px",
          }}
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}