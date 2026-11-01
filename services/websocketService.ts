import * as signalR from "@microsoft/signalr";
import { authStore } from "@/store/authStore";

class WebSocketService {
  private connection: signalR.HubConnection | null = null;

  public connect() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    if (this.connection) return;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${baseUrl}/RefreshHub`, {
        accessTokenFactory: () => authStore.getToken() ?? "",
      })
      .withAutomaticReconnect([0, 2000, 2000, 2000, 5000, 5000, 10000, 15000, 30000])
      .build();

    this.connection.start().catch((err) => console.error("SignalR Connection Error: ", err));
  }

  public disconnect() {
    if (this.connection) {
      this.connection.stop();
      this.connection = null;
    }
  }
}

export const wsService = new WebSocketService();