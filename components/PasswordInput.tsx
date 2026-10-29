"use client";

import { useState } from "react";

export default function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        required
        style={{ width: "100%", paddingRight: "50px", padding: "10px" }}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
}