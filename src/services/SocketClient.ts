import { io } from 'socket.io-client';

import EnvVars from '@/constants/EnvVars';

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
}

export default SocketClient;
