import { io, Socket } from "socket.io-client";
import { AppLog } from "utils/Util";

let socket: Socket | any;

export const SocketHelper = {
  startConnection: (token: string): Promise<Socket> => {
    return new Promise((resolve, reject) => {
      if (socket !== undefined || (!socket?.connected ?? false)) {
        socket = io("wss://mcr-dev.cygnis.dev:8443", {
          hostname: "mcr-dev.cygnis.dev:8443",
          transports: ["websocket"],
          auth: {
            token: token,
            subdomain: "ohiouniversity"
          }
        });

        socket.on("connect", () => {
          AppLog.log("Socket connected!");
          resolve(socket);
        });

        socket.on("disconnect", () => {
          AppLog.log("Socket disConnected!");
          reject();
        });

        socket.on("close", () => {
          AppLog.log("Socket closed!");
        });

        socket.io.on("error", (err: Error) => {
          AppLog.log("Socket error " + JSON.stringify(err));
        });

        socket.on("respond", (data: any) => {
          AppLog.log("Socket responded!" + JSON.stringify(data));
        });
      } else {
        resolve(socket);
      }
    });
  }
};
