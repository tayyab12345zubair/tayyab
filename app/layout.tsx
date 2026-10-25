import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "High-fidelity Admin Dashboard",
};

// Yeh mobile screen resolution aur iPhone zoom issue ko fix karega
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}