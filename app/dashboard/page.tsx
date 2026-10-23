"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Sample interface for API response structure
interface DashboardHeaderData {
  accountCode: string;
  balance: number;
  tag: string;
  regId: string;
  accountTitle: string;
  saleLimit: number;
}

export default function DashboardPage() {
  // 1. API Controlled States
  const [headerData, setHeaderData] = useState<DashboardHeaderData>({
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

  // 2. Real-time Clock Update
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-GB"); // DD/MM/YYYY
      const timeStr = now.toLocaleTimeString("en-GB", { hour12: false }); // HH:MM:SS
      setCurrentDateTime({ date: dateStr, time: timeStr });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. Simulated API Call (Replace with your actual fetch logic)
  useEffect(() => {
    // Example: fetch('/api/user/header-data').then(res => res.json()).then(data => setHeaderData(data));
  }, []);

  return (
    <div style={{ width: "100%", fontFamily: "sans-serif" }}>
      {/* ================= TOP HEADER BAR ================= */}
      <header
        style={{
          backgroundColor: "#D8BC8C", // Theme golden/tan color
          color: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: "1px solid #c5a878",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        {/* Left Section: Menu & Account Details */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Menu Button Left */}
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
            }}
            aria-label="Toggle Navigation"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1f2937"
              strokeWidth="2.5"
            >
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Lock Icon */}
          <div
            style={{
              background: "#10b981",
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

          {/* Account Code & Live Balance */}
          <div style={{ lineHeight: "1.2" }}>
            <div style={{ fontSize: "15px", fontWeight: "bold" }}>
              {headerData.accountCode}
            </div>
            <div style={{ fontSize: "14px", fontWeight: "700" }}>
              Bal: {headerData.balance.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Center Tag / Status Badge */}
        <div
          style={{
            backgroundColor: "#22252a",
            color: "#D8BC8C",
            padding: "4px 8px",
            borderRadius: "4px",
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

        {/* Right Section: Live Date, Time & Menu */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Dynamic Live Date & Time */}
          <div style={{ textAlign: "right", lineHeight: "1.2" }}>
            <div
              style={{
                backgroundColor: "#22252a",
                color: "#ffffff",
                padding: "2px 6px",
                borderRadius: "3px",
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "2px",
              }}
            >
              {currentDateTime.date || "16/10/2026"}
            </div>
            <div
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "2px 6px",
                borderRadius: "3px",
                fontSize: "11px",
                fontFamily: "monospace",
              }}
            >
              {currentDateTime.time || "10:08:12"}
            </div>
          </div>

          {/* Menu Button Right */}
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
            }}
            aria-label="Options"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1f2937"
              strokeWidth="2.5"
            >
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* ================= USER PROFILE / INFO BAR ================= */}
      <section
        style={{
          backgroundColor: "#2D323C", // Dark grey bar theme
          color: "#ffffff",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          borderBottom: "1px solid #1a1d24",
        }}
      >
        {/* Profile Avatar / Logo */}
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "6px",
            backgroundColor: "#ffffff",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.2)",
            flexShrink: 0,
          }}
        >
          <Image
            src="/Logo.png"
            alt="Account Logo"
            width={55}
            height={55}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Account API Data */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{ fontSize: "18px", fontWeight: "bold", color: "#e5e7eb" }}>
            Reg ID: <span style={{ color: "#ffffff" }}>{headerData.regId}</span>
          </div>
          <div style={{ fontSize: "14px", color: "#9ca3af", fontWeight: "500" }}>
            A/C: {headerData.accountTitle}
          </div>
          <div style={{ fontSize: "15px", color: "#cbd5e1", fontWeight: "600" }}>
            Sale Limit: {headerData.saleLimit.toLocaleString()}
          </div>
        </div>
      </section>

      {/* Main Dashboard Content Placeholder */}
      <main style={{ padding: "20px" }}>
        {/* Baki Dashboard Ka Content Yahan Aaye Ga */}
      </main>
    </div>
  );
}