import io from "socket.io-client";

export class SocketClient {
  private io: any;
  // socket.io client side connection

  public socketListen(ENDPOINT: any) {
    this.io = io.connect(ENDPOINT);
  }

  public getSocket(): any {
    return this.io;
  }

  public emitMessage(data: string): void {
    this.io.emit("message", data);
  }
}
