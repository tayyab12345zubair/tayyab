"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface DashboardHeaderData {
  accountCode: string;
  balance: number;
  tag: string;
  regId: string;
  accountTitle: string;
  saleLimit: number;
}

interface ActionButton {
  name: string;
  desc?: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [headerData] = useState<DashboardHeaderData>({
    accountCode: "R777 - TT",
    balance: 41300,
    tag: "TTTT",
    regId: "alii560",
    accountTitle: "TT - ALI",
    saleLimit: 50000,
  });

  const [currentDateTime, setCurrentDateTime] = useState({
    date: "",
    time: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  function handleLogout() {
    router.push("/login");
  }

  function toggleTheme() {
    setCurrentTheme((prev) => (prev === "dark" ? "light" : "dark"));
    setIsSidebarOpen(false);
  }

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
      }}
    >
      {/* ================= FIXED / LOCKED HEADER WRAPPER ================= */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 900,
          width: "100%",
          backgroundColor: t.wrapperBg,
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
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => setIsSidebarOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px",
              }}
              aria-label="Open Sidebar"
              title="Menu"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="2.5"
              >
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>

            <div
              style={{
                backgroundColor: "#10b981",
                borderRadius: "4px",
                padding: "3px 5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>

            <div style={{ lineHeight: "1.2" }}>
              <div style={{ fontSize: "14px", fontWeight: "bold", color: "#f8fafc" }}>
                {headerData.accountCode}
              </div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#34d399" }}>
                Bal: {headerData.balance.toLocaleString()}
              </div>
            </div>
          </div>

          <div
            style={{
              background: "transparent",
              color: "#fbbf24",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            <span style={{ color: "#ef4444" }}>⚔</span>
            <span>{headerData.tag}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ textAlign: "right", lineHeight: "1.3" }}>
              <div
                style={{
                  background: "transparent",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {currentDateTime.date || "25/10/2026"}
              </div>
              <div
                style={{
                  background: "transparent",
                  color: "#38bdf8",
                  fontSize: "12px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                }}
              >
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
                padding: "5px 7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s ease",
              }}
              aria-label="Logout"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </header>

        {/* USER PROFILE / INFO BAR */}
        <div style={{ padding: "10px 16px", backgroundColor: "transparent" }}>
          <section
            style={{
              backgroundColor: t.infoBarBg,
              color: t.textPrimary,
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              borderRadius: "12px",
              border: `1px solid ${t.infoBarBorder}`,
              boxShadow: t.profileShadow,
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
                width={42}
                height={42}
                style={{ objectFit: "contain" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <div style={{ fontSize: "15px", fontWeight: "bold" }}>
                Reg ID: <span>{headerData.regId}</span>
              </div>
              <div style={{ fontSize: "12px", color: t.textSecondary, fontWeight: "500" }}>
                A/C: {headerData.accountTitle}
              </div>
              <div style={{ fontSize: "13px", color: "#34d399", fontWeight: "600" }}>
                Sale Limit: {headerData.saleLimit.toLocaleString()}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main
        style={{
          padding: "20px",
          paddingTop: "180px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {selectedAction ? (
          <div
            style={{
              backgroundColor: t.cardBg,
              border: `1px solid ${t.cardBorder}`,
              borderRadius: "20px",
              padding: "40px 20px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() => setSelectedAction(null)}
              style={{
                marginBottom: "24px",
                padding: "8px 16px",
                backgroundColor: "#10b981",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              ← Back to Dashboard
            </button>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "8px", color: t.textPrimary }}>
              {selectedAction}
            </h2>
            <p style={{ fontSize: "16px", color: t.textSecondary, fontWeight: "500" }}>
              Coming Soon...
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: t.textPrimary }}>
              Quick Actions
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "14px",
                marginBottom: "24px",
              }}
            >
              {actionButtons.map((btn, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAction(btn.name)}
                  style={{
                    backgroundColor: t.cardBg,
                    border: `1px solid ${t.cardBorder}`,
                    borderRadius: "20px",
                    padding: "36px",
                    textAlign: "left",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "all 0.2s ease",
                    color: t.textPrimary,
                  }}
                >
                  <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "4px" }}>
                    {btn.name}
                  </div>
                  {btn.desc && (
                    <div style={{ fontSize: "12px", color: t.textSecondary }}>
                      {btn.desc}
                    </div>
                  )}
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
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            style={{
              width: "260px",
              height: "100%",
              backgroundColor: t.sidebarBg,
              color: t.sidebarText,
              borderRight: `1px solid ${t.cardBorder}`,
              padding: "20px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxShadow: "5px 0 25px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "16px", fontWeight: "bold", color: t.sidebarText }}>
                Menu
              </span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: t.textSecondary,
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                onClick={toggleTheme}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: currentTheme === "dark" ? "rgba(255,255,255,0.08)" : "#f4f4f5",
                  border: `1px solid ${t.cardBorder}`,
                  borderRadius: "8px",
                  color: t.sidebarText,
                  fontSize: "14px",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontWeight: "500",
                }}
              >
                {currentTheme === "dark" ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
                <span>{currentTheme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}