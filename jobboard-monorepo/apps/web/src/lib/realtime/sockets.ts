import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (jwtToken: string) => {
  if (!socket) {
    socket = io("http://localhost:3002", {
      extraHeaders: {
        Authorization: jwtToken,
      },
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
