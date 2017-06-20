class NetworkManager {

    private socket: SocketIOClient.Socket;
    static ip: string = "localhost:3330";

    public init() {
        this.socket = io(NetworkManager.ip);
    }

    public send(packet:string, object: any) {
        this.socket.emit(packet, object)
    }

    public getSocket() {
        return this.socket;
    }

}
