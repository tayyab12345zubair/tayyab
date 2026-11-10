"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      // Hit server logout API to clear HttpOnly cookie
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore network error and force redirect anyway
    }
// eslint-disable-next-line @next/next/no-location-assign-relative-destination
window.location.href = "/login";    window.location.href = "/login";
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      title="Logout"
      style={{
        background: "rgba(239, 68, 68, 0.2)",
        border: "1px solid rgba(239, 68, 68, 0.5)",
        borderRadius: "6px",
        cursor: "pointer",
        padding: "6px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        position: "relative",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
    </button>
  );
}