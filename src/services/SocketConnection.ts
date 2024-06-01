import { io } from 'socket.io-client';

import EnvVars from '@/constants/EnvVars';

import type { Socket } from 'socket.io-client';

class SocketConnection {
  private _socket: Socket;
  private _url = EnvVars.RESTAPI_SERVER_URL;

  constructor(token: string) {
    this._socket = io(this._url, {
      transports: ['polling'],
      extraHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  createNewConnection(token: string) {
    if (this._socket.connected) return;

    this._socket = io(this._url, {
      transports: ['polling'],
      extraHeaders: {
        authorization: `Bearer ${token}`,
      },
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

  get socket() {
    return this._socket;
  }
}

export default SocketConnection;
