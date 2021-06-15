import { io, Socket } from "socket.io-client";
import { AppLog } from "utils/Util";
import Env from "envs/env";

export const SocketHelper = (function () {
  let socket: Socket | any;

  function startConnection(token: string): Promise<Socket> {
    return new Promise((resolve, reject) => {
      if (socket !== undefined || (!socket?.connected ?? false)) {
        socket = io("https://" + Env.SOCKET_URL + ":" + Env.SOCKET_PORT, {
          hostname: Env.SOCKET_URL + ":" + Env.SOCKET_PORT,
          transports: ["websocket"],
          auth: {
            token: token,
            subdomain: "ohiouniversity"
          }
        });

        socket.on("connect", () => {
          AppLog.log(() => "Socket connected!");
          resolve(socket);
        });

        socket.on("disconnect", () => {
          AppLog.log(() => "Socket disConnected!");
          reject();
        });

        socket.on("close", () => {
          AppLog.log(() => "Socket closed!");
        });

        socket.io.on("error", (err: Error) => {
          AppLog.log(() => "Socket error " + JSON.stringify(err));
          reject();
        });

        socket.on("respond", (data: any) => {
          AppLog.log(() => "Socket responded!" + JSON.stringify(data));
        });
      } else {
        resolve(socket);
      }
    });
  }

  return {
    getInstance: function (token: string): Promise<Socket> {
      if (!socket?.connected ?? false) {
        AppLog.log(() => "create new socket instance!!");
        return startConnection(token);
      }
      AppLog.log(() => "socket instance already created!!");
      return socket;
    }
  };
})();
