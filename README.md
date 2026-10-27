# Secure Next.js Dashboard & Login Application

A secure, high-performance, and responsive Next.js (App Router) dashboard and authentication application built with TypeScript, featuring real-time SignalR web socket integration, strict client-side security measures, and automated API error handling.

---

## 🚀 Main Features & File Directory

### 1. Authentication & API Integration
- **Features**: Secure communication with the backend API (`/api/Login/LoginNewDdts`), JSON content formatting, Bearer token handling, case-insensitive response parsing, and automatic `401 Unauthorized` handling that clears user data and redirects back to the login page.
- **Key Files**:
  - `services/apiService.ts` - Handles HTTP requests, authorization headers, and status code interceptions.
  - `store/authStore.ts` - In-memory store managing secure user-scoped parameters (`ID`, `Mbm`/`UnID`, and `Token`).
  - `types/auth.ts` - TypeScript interfaces for login payloads and server responses.

### 2. Real-Time WebSocket Connectivity (SignalR)
- **Features**: Establishes a live connection to the backend hub (`/RefreshHub`), supports automatic reconnections, and emits user login tracking signals (`LogIn`) using the user's ID.
- **Key Files**:
  - `services/websocketService.ts` - Manages SignalR connection lifecycle and event listeners.

### 3. Theme Management (Dark / Light Mode)
- **Features**: Dynamic theme toggling supporting smooth user interface adjustments between dark and light color modes, controlled directly via the dashboard layout.
- **Key Files**:
  - `app/dashboard/page.tsx` - Contains the active state configuration for `currentTheme` and the layout styling object.

### 4. Global Security & Protection
- **Features**: Disables the default browser `contextmenu` (right-click) globally across the application to enhance content security.
- **Key Files**:
  - `app/layout.tsx` - Implements the global event listeners and layout wrappers.

### 5. Custom Clean Login Interface
- **Features**: A minimalist, high-impact login screen featuring a centered logo, username input field, password input field with a toggleable **Show/Hide** visibility button, and a clean action button.
- **Key Files**:
  - `app/login/page.tsx` - Custom login UI component and form state handler.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript / JavaScript
- **Real-Time Communication**: `@microsoft/signalr`
- **Styling**: Inline Styles / Responsive Design Approach

---

## 📦 Getting Started

### Prerequisites
Make sure you have **Node.js** (v18 or higher) installed on your system.

### Installation & Setup

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone [https://github.com/MFarooqTahir/XTNJP.git](https://github.com/MFarooqTahir/XTNJP.git)
   cd XTNJP