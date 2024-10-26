import { io } from 'socket.io-client';

import EnvVars from '@/constants/EnvVars';

import type { SocketHandler } from '@/features/socket/socketSlice';
import type { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

class SocketClient {
  private static _instance: SocketClient;
  private static _socket: Socket;
  private static _url = EnvVars.API_SERVER_URL;

  private constructor() {}

  public static get instance() {
    if (!SocketClient._instance) return new SocketClient();

    return SocketClient._instance;
  }

  public get socket() {
    return SocketClient._socket;
  }

  public createConnection(token: string) {
    if (SocketClient._socket?.connected) return;

    const opts: Partial<ManagerOptions & SocketOptions> = {
      transports: ['polling'],
      extraHeaders: { authorization: `Bearer ${token}` },
      autoConnect: true,
    };

    SocketClient._socket = io(SocketClient._url, opts);
  }

  public connect() {
    if (SocketClient._socket.connected) return;

    this.socket.connect();
  }

  public disconnect() {
    if (SocketClient._socket.disconnected) return;

    SocketClient._socket.disconnect();
  }

  public on(eventName: string, listener: SocketHandler) {
    if (SocketClient._socket.connected) return;

    SocketClient._socket.on(eventName, listener);
  }

  public off(eventName: string, listener: SocketHandler) {
    if (SocketClient._socket.connected) return;

    SocketClient._socket.off(eventName, listener);
  }
}

export default SocketClient;
