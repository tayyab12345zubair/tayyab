import type { Metadata } from "react";
import { cookies } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Client Admin Dashboard",
  description: "Secure Next.js dashboard with real-time updates",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "dark";

  return (
    <html lang="en" data-theme={theme}>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}