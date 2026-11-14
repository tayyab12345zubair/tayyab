import { cookies } from "next/headers";
import ThemeToggleClient from "./ThemeToggleClient";

interface ThemeToggleProps {
  initialTheme?: string;
}

export default async function ThemeToggleServer({ initialTheme }: ThemeToggleProps) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value || initialTheme || "dark";

  return <ThemeToggleClient initialTheme={themeCookie} />;
}