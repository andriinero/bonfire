import { io } from 'socket.io-client';

import EnvVars from '@/constants/EnvVars';

import type { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

class SocketConnection {
  private _socket: Socket;
  private _url = EnvVars.API_SERVER_URL;

  constructor(token: string) {
    const opts: Partial<ManagerOptions & SocketOptions> = {
      transports: ['polling'],
      extraHeaders: { authorization: `Bearer ${token}` },
      autoConnect: false,
    };

    this._socket = io(this._url, opts);
  }

  createNewConnection(token: string) {
    if (this._socket.connected) return;

    this._socket = io(this._url, {
      transports: ['polling'],
      extraHeaders: { authorization: `Bearer ${token}` },
    });
  }

  connect() {
    if (this._socket.connected) return;

    this.socket.connect();
  }

  disconnect() {
    if (this._socket.disconnected) return;

    this._socket.disconnect();
  }

  on(eventName: string, listener: () => void) {
    if (this._socket.connected) return;

    this._socket.on(eventName, listener);
  }

  off(eventName: string, listener: () => void) {
    if (this._socket.connected) return;

    this._socket.off(eventName, listener);
  }

  get socket() {
    return this._socket;
  }
}

export default SocketConnection;
