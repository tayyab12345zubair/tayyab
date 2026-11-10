"use client";

import { useEffect, useState } from "react";

export default function ThemeToggleClient() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      style={{ padding: "6px 12px", background: "#222", color: "#fff", border: "1px solid #444", borderRadius: "6px", cursor: "pointer" }}
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}