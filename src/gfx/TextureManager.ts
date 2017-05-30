class TextureManager {
    private textureList: any;

    static textureWidth = 16;
    static textureHeight = 16;

    constructor() {
        this.textureList = {};
    }

    public loadTilesheet() : void {
        this.textureList["grass1"] = PIXI.Texture.fromImage('./resources/grass1.png');
    }

    public getByName(str: string) : PIXI.Texture {
        return this.textureList[str];
    }
}
