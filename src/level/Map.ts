class Map {
    private map: Array<Tile>;
    public game: Game;
    private entities: Array<Entity>;

    static mapWidth: number = 36;
    static mapHeight: number = 18;
    static tileSize: number = 16;

    constructor(game: Game) {
        this.map = [];
        this.entities = [];
        this.game = game;
    }

    /**
     * Fills the map with an amazing grassland
     * @return {void}
     */
    public populate() {
        console.log("populating map...")

        //loop through each row an column until the map has been filled with tiles
        for(var x = 0; x < Map.mapWidth; x++) {
            for(var y = 0; y < Map.mapHeight; y++) {
                //create each tile and initialize it.
                let tile = new Tile(x, y, this.game.textures.getByName("grass1"), this);
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
    public addPlayer(x: number, y: number, local: boolean) {
        this.entities.push(new Player(x, y, local, this, this.game.textures.getByName("character1")))
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

    /**
     * Adds all tiles to the stage
     * @return {void}
     */
    public render() {
        console.log("rendering map...")
    }

    public tick(tickNumber: number) {
        this.entityTicks(tickNumber);
    }
}
