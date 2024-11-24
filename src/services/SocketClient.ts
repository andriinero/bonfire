import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

import EnvVars from '@/constants/EnvVars';

import type { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

class SocketClient {
  private static _id: string;
  private static _instance: SocketClient;
  private static _socket: Socket;
  private static readonly _url = EnvVars.API_SERVER_URL;

  private constructor() {}

  public createConnection(token: string) {
    if (SocketClient?._socket?.connected) return;

    const opts: Partial<ManagerOptions & SocketOptions> = {
      transports: ['polling'],
      extraHeaders: { authorization: `Bearer ${token}` },
      autoConnect: true,
    };

    SocketClient._socket = io(SocketClient._url, opts);
  }

  public connect() {
    if (!SocketClient._socket || SocketClient._socket.connected) return;

    SocketClient._socket.connect();
  }

  public disconnect() {
    if (!SocketClient._socket || SocketClient._socket.disconnected) return;

    SocketClient._socket.disconnect();
  }

  public static get instance() {
    if (!SocketClient._instance) {
      SocketClient._id = uuidv4();
      SocketClient._instance = new SocketClient();
    }

    return SocketClient._instance;
  }

  public get id() {
    return SocketClient._id;
  }

  public get socket() {
    return SocketClient._socket;
  }

  public get isConnected() {
    return SocketClient?._socket.connected;
  }
}

export default SocketClient;
