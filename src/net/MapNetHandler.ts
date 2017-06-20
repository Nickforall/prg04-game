class MapNetHandler {
    private map: Map;

    constructor(map: Map) {
        this.map = map;
    }

    public addHandlers(socket: SocketIOClient.Socket) {
        socket.on("playerJoin", (data: any) => this.handlePlayerJoin(data));
        socket.on("playerMove", (data: any) => this.handlePlayerMove(data));
        socket.on("playerListSync", (data: any) => this.handlePlayerListSync(data));
        socket.on("playerLeft", (data: any) => this.handlePlayerLeave(data));
        socket.on("playerChat", (data: any) => this.handlePlayerChat(data));
    }

    public handlePlayerChat(data: any) {
        let p: Player = this.map.players[data.id];
        if(!p) return;

        p.chat(data.txt);
    }

    public handlePlayerJoin(data: any) {
        this.map.addPlayer(data.x, data.y, false, data.skin, data.id);
    }

    public handlePlayerMove(data: any) {
        let p: Player = this.map.players[data.id];

        if(!p) return;
        p.updatePos(data.x, data.y);
    }

    public handlePlayerLeave(data: any) {
        let p: Player = this.map.players[data.id];
        if(!p) return;

        this.map.game.stage.removeChild(p.sprite);
        this.map.players[data.id] = undefined;
    }

    public handlePlayerListSync(data: any) {
        for (let key in data) {
            let p = data[key];
            this.map.addPlayer(p.x, p.y, false, p.skin, p.id);
        }
    }
}
