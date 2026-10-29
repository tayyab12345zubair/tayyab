Project Description

The Client Admin Dashboard is a enterprise-grade Next.js application designed to connect with an Azure-hosted backend API and SignalR Hub (/RefreshHub). The core focus is absolute security, strict route interception, real-time sync, and a clean user experience with toggleable dark/light themes.

2. Status Summary

✅ What Is Done

Authentication Store (store/authStore.ts): In-memory storage for active tokens, user IDs, and metadata.

Centralized API Wrapper (services/apiService.ts): Generic HTTP request handler with automatic Bearer header injection, case-insensitive response handling, and 401 Unauthorized interception.

Real-time SignalR Integration (services/websocketService.ts): Auto-reconnecting WebSocket connection calling LogIn hub method upon connection.

Route Security (middleware.ts & app/page.tsx): Root auto-redirect to /login and server-side middleware route guards blocking unauthorized visits to /dashboard.

Global Context Security (app/layout.tsx): Right-click (contextmenu) disabled across client pages.

⚠️ Current Technical Debt & Issues Identified

Theme System Disconnect:

Visual components currently use inline hex styles (e.g., backgroundColor: "#121212"), bypassing CSS variables (var(--bg), var(--surface)).

globals.css contains unused custom classes while @import "tailwindcss"; is omitted.

ThemeToggle.tsx is not rendered inside any page layout or route.

Flash of Unstyled Content (FOUC): Theme preference is currently read client-side (localStorage) instead of via cookies during SSR paint.

ESLint Violations:

ThemeToggle.tsx triggers react-hooks/set-state-in-effect.

apiService.ts contains any usage for payload body parameters.

📋 What Needs To Be Done (Immediate Backlog)

Priority 1: Theme & CSS Wiring (Refactoring)

Option A (Preferred): Remove Tailwind CSS overhead if unused, remove turbopack.rules block from next.config.ts, and replace inline hex styles with existing globals.css variables/classes.

Option B: Fully commit to Tailwind by injecting @import "tailwindcss"; into globals.css, defining @theme tokens, and replacing custom classes.

Cookie-Based Theme Persistence: Transition theme state management from localStorage to cookies so data-theme can be set on the <html> root before server paint.

Render ThemeToggle: Import and mount ThemeToggle.tsx inside the primary header/layout. Fix the react-hooks/set-state-in-effect ESLint warning.

Priority 2: API & Cookie Synchronization

Ensure login responses save token to browser cookies in addition to authStore so middleware.ts can read tokens server-side.

Clean up remaining linter warnings across services/.

⚙️ How It Works (System Mechanics)

1. Authentication & Route Guard Flow

[User Request] ──> [Next.js Middleware] ──> Token in Cookie?
                         │                           │
                         ├── NO ──> Redirect to /login
                         └── YES ──> Render Page


2. API Communication & 401 Interception

[apiService.ts] ──> fetch(URL, Bearer Token)
                          │
                          ├── 200 OK ──> Parse & Return Data
                          └── 401 Unauthorized ──> Clear Auth Store ──> Redirect to /login


3. SignalR WebSockets

[websocketService.ts] ──> `${NEXT_PUBLIC_API_BASE_URL}/RefreshHub`
                               │
                               └── On Connect ──> Invoke "LogIn" with User ID


📐 Project Rules & Conventions

To maintain code consistency across multiple agents and developers, adhere strictly to the following rules:

Branching & Git Workflow:

NO direct commits to main!

Every feature or fix must be executed in a dedicated branch (e.g., feature/theme-wiring, fix/eslint-errors).

Every branch must be merged via a structured Pull Request (PR) written in English.

Pull Request (PR) Requirements:

Include a clear title and description outlining What was changed, Why, and Files touched.

List testing steps for reviewers.

Styling & Theme Rules:

No hardcoded literal hex colors in JSX/TSX inline styles.

Use CSS variables (var(--...)) or utility tokens.

Code Quality & Type Safety:

Avoid any types; prefer strict interfaces (types/) or unknown.

Ensure npm run lint passes cleanly before requesting PR review.