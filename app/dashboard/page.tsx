"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { authStore } from "@/store/authStore";

interface ActionButton {
  name: string;
  desc?: string;
}

export default function DashboardPage() {
  // Initial state directly from store to avoid setState in effect
 // Srf state variable rakhain, setter hata dein agar zaroorat nahi
const [companyData] = useState(() => {
  if (typeof window !== "undefined") {
    return authStore.getSelectedCompany();
  }
  return null;
});
  const [currentDateTime, setCurrentDateTime] = useState({
    date: "",
    time: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-GB");
      const timeStr = now.toLocaleTimeString("en-GB", { hour12: false });
      setCurrentDateTime({ date: dateStr, time: timeStr });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  async function handleLogout(e: React.MouseEvent) {
    e.preventDefault();
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore network errors on logout
    }

    authStore.clearSession();

    document.cookie = "app_session=; Max-Age=0; path=/;";
    document.cookie = "session=; Max-Age=0; path=/;";

    window.location.replace("/login");
  }

  function toggleTheme() {
    setCurrentTheme((prev) => (prev === "dark" ? "light" : "dark"));
    setIsSidebarOpen(false);
  }

  // Baqi poora code waisa hi rahega (Header, main content, sidebar, etc.)
  const themeStyles = {
    dark: {
      bg: "#121212",
      textPrimary: "#ffffff",
      textSecondary: "#888888",
      cardBg: "#1a1a1a",
      cardBorder: "#2a2a2a",
      sidebarBg: "#152e24",
      sidebarText: "#ffffff",
      infoBarBg: "#29292b",
      infoBarBorder: "#19191a",
      wrapperBg: "#121212",
      profileShadow: "0 4px 16px rgba(255, 255, 255, 0.08)",
    },
    light: {
      bg: "#f4f4f5",
      textPrimary: "#000000",
      textSecondary: "#52525b",
      cardBg: "#ffffff",
      cardBorder: "#e4e4e7",
      sidebarBg: "#ffffff",
      sidebarText: "#000000",
      infoBarBg: "#ffffff",
      infoBarBorder: "#e4e4e7",
      wrapperBg: "transparent",
      profileShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
    },
  };

  const t = themeStyles[currentTheme];

  const actionButtons: ActionButton[] = [
    { name: "Button A" },
    { name: "Button B" },
    { name: "Button C" },
    { name: "Button D" },
    { name: "Button E" },
    { name: "Button F" },
    { name: "Button G" },
    { name: "Button H" },
    { name: "Button I" },
    { name: "Button J" },
    { name: "Button K" },
    { name: "Button L" },
    { name: "Button M" },
    { name: "Button N" },
    { name: "Button O" },
    { name: "Button P" },
    { name: "Button Q" },
    { name: "Button R" },
    { name: "Button S" },
    { name: "Button T" },
    { name: "Button U" },
    { name: "Button V" },
    { name: "Button W" },
    { name: "Button X" },
    { name: "Button Y" },
    { name: "Button Z" },
    { name: "Button 1" },
    { name: "Button 2" },
    { name: "Button 3" },
    { name: "Button 4" },
    { name: "Button 5" },
    { name: "Button 6" },
  ];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: t.bg,
        color: t.textPrimary,
        fontFamily: "sans-serif",
        position: "relative",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {/* ================= FIXED HEADER ================= */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 900,
          width: "100%",
          backgroundColor: t.wrapperBg,
          boxSizing: "border-box",
        }}
      >
        <header
          style={{
            backgroundColor: "#1b3a2f",
            color: "#e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            borderBottom: "1px solid #285444",
            fontSize: "13px",
            fontWeight: "600",
            gap: "8px",
            boxSizing: "border-box",
          }}
        >
          {/* Left section */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsSidebarOpen(true);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Open Sidebar"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2.5">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>

            <div style={{ backgroundColor: "#10b981", borderRadius: "4px", padding: "3px 5px", display: "flex" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>

            <div style={{ lineHeight: "1.2" }}>
              <div style={{ fontSize: "13px", fontWeight: "bold", color: "#f8fafc" }}>
                {companyData?.rCode || "R777 - TT"}
              </div>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "#34d399" }}>
                City: {companyData?.City || "N/A"}
              </div>
            </div>
          </div>

          {/* Middle Tag */}
          <div style={{ color: "#fbbf24", fontSize: "12px", fontWeight: "bold", whiteSpace: "nowrap" }}>
            <span style={{ color: "#ef4444" }}>⚔</span> {companyData?.UName || "TTTT"}
          </div>

          {/* Right Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <div style={{ textAlign: "right", lineHeight: "1.2" }}>
              <div style={{ color: "#ffffff", fontSize: "11px", fontWeight: "bold" }}>
                {currentDateTime.date || "25/10/2026"}
              </div>
              <div style={{ color: "#38bdf8", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace" }}>
                {currentDateTime.time || "16:04:19"}
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "6px",
                cursor: "pointer",
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </header>

        {/* USER PROFILE / INFO BAR (Dynamic Company Data) */}
        {selectedAction === null && (
          <div style={{ padding: "8px 12px", backgroundColor: "transparent", boxSizing: "border-box" }}>
            <section
              style={{
                backgroundColor: t.infoBarBg,
                color: t.textPrimary,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "12px",
                border: `1px solid ${t.infoBarBorder}`,
                boxShadow: t.profileShadow,
                maxWidth: "800px",
                margin: "0 auto",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "6px",
                  backgroundColor: currentTheme === "dark" ? "#101f19" : "#f4f4f5",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${t.infoBarBorder}`,
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/Logo.png"
                  alt="Account Logo"
                  width={40}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "2px", width: "100%", overflow: "hidden" }}>
                <div style={{ fontSize: "14px", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Party Name: <span>{companyData?.PName || "Loading..."}</span>
                </div>
                <div style={{ fontSize: "12px", color: t.textSecondary, fontWeight: "500", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  User Name: {companyData?.UName || "N/A"}
                </div>
                <div style={{ fontSize: "13px", color: "#34d399", fontWeight: "600" }}>
                  Limit: {companyData?.Limit ? companyData.Limit.toLocaleString() : "0"}
                </div>
                <div style={{ fontSize: "12px", color: t.textSecondary, fontWeight: "500" }}>
                  Status: {companyData?.Active ? "Active" : "Inactive"}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main
        style={{
          padding: "16px 12px",
          paddingTop: selectedAction === null ? "180px" : "65px",
          maxWidth: "800px",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {selectedAction ? (
          <div
            style={{
              backgroundColor: t.cardBg,
              border: `1px solid ${t.cardBorder}`,
              borderRadius: "16px",
              padding: "24px 16px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              marginTop: "10px",
              boxSizing: "border-box",
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelectedAction(null);
              }}
              style={{
                marginBottom: "20px",
                padding: "8px 16px",
                backgroundColor: "#10b981",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              ← Back to Dashboard
            </button>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px", color: t.textPrimary }}>
              {selectedAction}
            </h2>
            <p style={{ fontSize: "14px", color: t.textSecondary, fontWeight: "500" }}>
              Coming Soon...
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "12px", color: t.textPrimary }}>
              Quick Actions
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              {actionButtons.map((btn, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedAction(btn.name);
                  }}
                  style={{
                    backgroundColor: t.cardBg,
                    border: `1px solid ${t.cardBorder}`,
                    borderRadius: "14px",
                    padding: "22px 16px",
                    textAlign: "left",
                    cursor: "pointer",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
                    transition: "all 0.2s ease",
                    color: t.textPrimary,
                    boxSizing: "border-box",
                    width: "100%",
                  }}
                >
                  <div style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "4px" }}>
                    {btn.name}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </main>

      {/* ================= SIDEBAR DRAWER ================= */}
      {isSidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1000,
            display: "flex",
          }}
          onClick={(e) => {
            e.preventDefault();
            setIsSidebarOpen(false);
          }}
        >
          <div
            style={{
              width: "240px",
              maxWidth: "80%",
              height: "100%",
              backgroundColor: t.sidebarBg,
              color: t.sidebarText,
              borderRight: `1px solid ${t.cardBorder}`,
              padding: "16px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "5px 0 25px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "16px", fontWeight: "bold", color: t.sidebarText }}>
                Menu
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsSidebarOpen(false);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: t.textSecondary,
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleTheme();
                }}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  backgroundColor: currentTheme === "dark" ? "rgba(255,255,255,0.08)" : "#f4f4f5",
                  border: `1px solid ${t.cardBorder}`,
                  borderRadius: "8px",
                  color: t.sidebarText,
                  fontSize: "13px",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontWeight: "500",
                }}
              >
                <span>{currentTheme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}