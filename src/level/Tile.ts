class Tile {
    public x: number;
    public y: number;
    public sprite: PIXI.Sprite;
    private map: Map;

    constructor(x: number, y: number, texture: PIXI.Texture, map: Map) {
        this.x = x;
        this.y = y;
        this.sprite = new PIXI.Sprite(texture);
        this.map = map;
    }

    public init() {
        this.sprite.x = this.x * this.map.mapWidth;
        this.sprite.y = this.y * this.map.mapHeight;
    }
}
