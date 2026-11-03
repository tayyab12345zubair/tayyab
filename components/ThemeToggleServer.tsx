import { cookies } from "next/headers";
import ThemeToggleClient from "./ThemeToggleClient";

export default async function ThemeToggle() {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value || "dark";

  return <ThemeToggleClient initialTheme={themeCookie} />;
}