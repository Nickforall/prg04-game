/// <reference path="./Tile.ts"/>

class Map {
    private map: Array<Tile>;
    private game: Game;

    public mapWidth: number = 16;
    public mapHeight: number = 16;

    constructor(game: Game) {
        this.map = [];
        this.game = game;
    }

    /**
     * Fills the map with an amazing grassland
     * @return {void}
     */
    public populate() {
        console.log("populating map...")

        for(var i = 0; i < this.mapWidth; i++) {
            for(var j = 0; j < this.mapHeight; j++) {
                let tile = new Tile(i, j, this.game.textures.getByName("grass1"), this);
                tile.init();

                this.map.push(tile);
            }
        }
    }

    /**
     * Adds all tiles to the stage
     * @return {void}
     */
    public render() {
        console.log("rendering map...")

        for (let tile of this.map) {
            console.log("adding tile to stage")
            this.game.stage.addChild(tile.sprite)
        }
    }
}
