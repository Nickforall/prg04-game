class Tile extends GameObject {
    public sprite: PIXI.Sprite;
    private map: Map;
    public isWalkable: boolean;

    constructor(x: number, y: number, texture: PIXI.Texture, map: Map) {
        super(x, y);

        this.sprite = new PIXI.Sprite(texture);
        this.map = map;
        this.isWalkable = true;
    }

    /**
     * Determine whether one can walk on a tile
     * @param  {boolean} is [description]
     * @return {[type]}     [description]
     */
    public setWalkable(is: boolean) {
        this.isWalkable = is;
        // debug
        console.log("tile isn't walkable ", this.x, this.y);
    }

    /**
     * Set the texture of this tile
     * @param  {PIXI.Texture} texture [description]
     * @return {[type]}               [description]
     */
    public setTexture(texture: PIXI.Texture) {
        this.map.game.stage.removeChild(this.sprite);
        this.sprite = new PIXI.Sprite(texture);
        this.init();
    }

    /**
     * Initializes this tile
     * @return {[type]} [description]
     */
    public init() {
        this.sprite.x = this.x * Map.tileSize;
        this.sprite.y = this.y * Map.tileSize;
        this.map.game.stage.addChild(this.sprite)
    }
}
