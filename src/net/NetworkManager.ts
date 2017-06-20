class NetworkManager {

    private socket: SocketIOClient.Socket;
    static ip: string = "localhost:3330";

    /**
     * Initializes the socket connection
     * @return {void} [description]
     */
    public init() {
        this.socket = io(NetworkManager.ip);
    }

    /**
     * Sends a packet to the socket connection
     * @param  {string} packet [description]
     * @param  {any}    object [description]
     * @return {void}        [description]
     */
    public send(packet:string, object: any) {
        this.socket.emit(packet, object)
    }

    /**
     * Gets the socket connection
     * @return {SocketIOClient.Socket} [description]
     */
    public getSocket(): SocketIOClient.Socket {
        return this.socket;
    }

}
