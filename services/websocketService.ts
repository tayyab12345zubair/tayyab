import * as signalR from "@microsoft/signalr";
import { authStore } from "@/store/authStore";

class WebSocketService {
  private connection: signalR.HubConnection | null = null;

  connect() {
    const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!rawBaseUrl) return;

    // Remove trailing slash if present to avoid double slashes
    const baseUrl = rawBaseUrl.replace(/\/$/, "");

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${baseUrl}/RefreshHub`)
      .withAutomaticReconnect()
      .build();

    this.connection.start()
      .then(() => {
        console.log("WebSocket Connected successfully.");
        this.sendLoginSignal();
      })
      .catch(err => console.error("WebSocket Connection Error: ", err));

    this.connection.onreconnected(() => {
      console.log("WebSocket Reconnected.");
      this.sendLoginSignal();
    });
  }

  private sendLoginSignal() {
    const userId = authStore.getUserId();
    if (this.connection && userId !== null) {
      this.connection.invoke("LogIn", userId.toString())
        .catch(err => console.error("Error invoking LogIn on hub: ", err));
    }
  }

  disconnect() {
    if (this.connection) {
      this.connection.stop();
      this.connection = null;
    }
  }
}

export const wsService = new WebSocketService();