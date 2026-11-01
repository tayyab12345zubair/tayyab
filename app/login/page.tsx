"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { apiRequest, fetchPermissionsAndCompanies } from "@/services/apiService";
import { wsService } from "@/services/websocketService";
import { LoginModel, LoginResult } from "@/types/auth";
import { authStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const payload: LoginModel = {
        email,
        password,
        rememberMe: false,
      };

      const result = await apiRequest<LoginResult & { userId?: number; id?: number; subId?: number }>(
        "/api/Login/LoginNewDdts",
        "POST",
        payload
      );

      if (result && result.successful && result.token) {
        document.cookie = `auth_token=${result.token}; path=/; secure; samesite=lax`;
        authStore.setToken(result.token);

        // Extract ID (result.id is 576)
        const userId = result.id || result.userId || result.subId || 1;

        // Fetch Hardcoded Users Permissions & Company List
        const { companyRes } = await fetchPermissionsAndCompanies(userId);

        // Safe check using optional chaining and double check for array/data existence
        const companies = companyRes?.ResultObj;

        if (!companies || !Array.isArray(companies) || companies.length === 0) {
          setErrorMsg("No Parties Found");
          setIsLoading(false);
          return;
        }

        // Save first company & proceed directly to dashboard
        const selectedCompany = companies[0];
        authStore.setSelectedCompany(selectedCompany);

        wsService.connect();
        router.push("/dashboard");
      } else {
        setErrorMsg(result?.error || "Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      // Parse backend validation error if available
      try {
        const errJson = JSON.parse(err.message);
        if (errJson && errJson.errors) {
          const firstKey = Object.keys(errJson.errors)[0];
          setErrorMsg(errJson.errors[firstKey][0] || "Validation error occurred.");
        } else {
          setErrorMsg(errJson.title || "An error occurred during login.");
        }
      } catch {
        setErrorMsg(err.message || "An error occurred during login. Please try again.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

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
        onSubmit={handleLoginSubmit}
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

        {errorMsg && (
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
            {errorMsg}
          </div>
        )}

        <div style={{ width: "100%" }}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#5856d6",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "14px",
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "background 0.2s ease",
            marginTop: "4px",
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}