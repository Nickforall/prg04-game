class TextureManager {
    private textureList: any;

    static textureWidth = 16;
    static textureHeight = 16;

    constructor() {
        this.textureList = {};
    }

    public loadTilesheet() : void {
        this.addToList("empty");
        this.addToList("grass1");
        this.addToList("character1");
        this.addToList("building1");
        this.addToList("streetBot");
        this.addToList("streetMid");
        this.addToList("streetTop");
    }

    private addToList(name: string) {
        this.textureList[name] = PIXI.Texture.fromImage('./resources/' + name + '.png');
        this.textureList[name].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    }

    public getByName(str: string) : PIXI.Texture {
        return this.textureList[str];
    }
}
