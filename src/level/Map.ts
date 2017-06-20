class Map {
    private map: Array<Tile>;
    public game: Game;
    private entities: Array<Entity>;
    public players: any;
    private net: MapNetHandler;

    static mapWidth: number = 36;
    static mapHeight: number = 18;
    static tileSize: number = 16;

    constructor(game: Game) {
        this.map = [];
        this.entities = [];
        this.players = {};
        this.game = game;

        this.net = new MapNetHandler(this);
    }

    /**
     * Fills the map with an amazing grassland
     * @return {void}
     */
    public init() {
        console.log("populating map...");
        this.net.addHandlers(this.game.network.getSocket());

        //loop through each row and column until the map has been filled with tiles
        for(var x = 0; x < Map.mapWidth; x++) {
            for(var y = 0; y < Map.mapHeight; y++) {
                //create each tile and initialize it.
                var tex = "grass1";

                // street
                if(y == 7) tex = "streetTop";
                if(y == 8) tex = "streetMid";
                if(y == 9) tex = "streetBot";

                // put weed
                if(x > 14 && x < 28 && y > 10 && y < 17) tex = "weed";
                if(x > 2 && x < 7 && y > 10 && y < 17) tex = "weed";


                let tile = new Tile(x, y, this.game.textures.getByName(tex), this);

                tile.init();

                this.map.push(tile);
            }
        }
    }

    /**
     * Adds a player to the Map
     * @param  {number}  x     [description]
     * @param  {number}  y     [description]
     * @param  {boolean} local [description]
     * @return {void}
     */
    public addPlayer(x: number, y: number, local: boolean, id: number = 0) {
        let p = new Player(x, y, local, this, this.game.textures.getByName("character1"));

        if(local) this.game.network.getSocket().emit("newPlayer", {x: p.x, y: p.y});
        this.entities.push(p);

        if(!local) {
            this.players[id] = p;
        }
    }

    public addBuilding(x: number, y: number, textureName: string) {
        let sprite = new PIXI.Sprite(this.game.textures.getByName(textureName));

        console.log("Adding building at", x, ",", y)

        // All buildings are 3x4 for now
        for (var i = 0; i < 3; i++) {
            this.getTileAt(x, y + i).setWalkable(false);
            this.getTileAt(x + 1, y + i).setWalkable(false);
            this.getTileAt(x + 2, y + i).setWalkable(false);
            this.getTileAt(x + 3, y + i).setWalkable(false);
        }

        sprite.x = x * Map.tileSize;
        sprite.y = y * Map.tileSize;

        this.game.stage.addChild(sprite);
    }

    public getTileAt(x: number, y: number): Tile {
        let tile: Tile = this.map[y * Map.mapWidth + x];
        return tile;
    }

    public isWalkable(x: number, y: number) :boolean {
        return this.getTileAt(x, y).isWalkable;
    }

    /**
     * Handles all entities' ticks
     * @param  {number} number [description]
     * @return {void}
     */
    private entityTicks(number: number) {
        for(let entity of this.entities) {
            entity.tick(number);
        }
    }

    public tick(tickNumber: number) {
        this.entityTicks(tickNumber);
    }
}
