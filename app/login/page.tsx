"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string || "").trim();
    const password = (formData.get("password") as string || "").trim();

    // 1. Validation: Username must be lowercase letters and numbers only
    const usernameRegex = /^[a-z0-9]+$/;
    if (!usernameRegex.test(email)) {
      setError("Username must contain only small letters and numbers (no capitals or spaces).");
      return;
    }

    // 2. Validation: Password must be numeric only
    const numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(password)) {
      setError("Password must contain numbers only.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Successful login, redirect to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error occurred");
      setLoading(false);
    }
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#121212", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px", padding: "24px", boxSizing: "border-box" }}>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <Image src="/Logo.png" alt="Logo" width={100} height={160} priority />
        </div>

        {error && (
          <div style={{ padding: "10px", marginBottom: "16px", backgroundColor: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "8px", color: "#ef4444", fontSize: "13px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "16px" }}>
          <input
            type="text"
            name="email"
            required
            placeholder="Username (small letters & numbers only)"
            autoCapitalize="none"
            autoComplete="off"
            spellCheck="false"
            onInput={(e) => {
              const target = e.currentTarget;
              // Automatically convert capitals to small letters and remove non-alphanumeric chars
              target.value = target.value.toLowerCase().replace(/[^a-z0-9]/g, "");
            }}
            style={{ 
              width: "100%", 
              padding: "12px 14px", 
              borderRadius: "8px", 
              border: "1px solid #2a2a2a", 
              backgroundColor: "#1a1a1a", 
              color: "#ffffff", 
              boxSizing: "border-box",
              textTransform: "lowercase" 
            }}
          />
        </div>

        <div style={{ marginBottom: "24px", position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Password (numeric only)"
            inputMode="numeric"
            onInput={(e) => {
              const target = e.currentTarget;
              // Automatically strip non-numeric characters for password
              target.value = target.value.replace(/[^0-9]/g, "");
            }}
            style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #2a2a2a", backgroundColor: "#1a1a1a", color: "#ffffff", boxSizing: "border-box" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#888888", cursor: "pointer", fontSize: "12px" }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "12px", backgroundColor: "#10b981", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}