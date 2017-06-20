class TextureManager {
    private textureList: any;

    static textureWidth = 16;
    static textureHeight = 16;

    constructor() {
        this.textureList = {};
    }

    /**
     * Loads all the resources into the TextureManager
     */
    public loadTilesheet() : void {
        this.addToList("empty");
        this.addToList("grass1");
        this.addToList("character1");
        this.addToList("character2");
        this.addToList("character3");
        this.addToList("character4");
        this.addToList("building1");
        this.addToList("building2");
        this.addToList("streetBot");
        this.addToList("streetMid");
        this.addToList("streetTop");
        this.addToList("weed");
    }

    /**
     * Adds a texture to the TextureManager
     * @param  {string} name [description]
     * @return {[type]}      [description]
     */
    private addToList(name: string) {
        this.textureList[name] = PIXI.Texture.fromImage('./resources/' + name + '.png');
        this.textureList[name].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    }

    /**
     * Gets a texture by name
     * @param  {string}       str [description]
     * @return {PIXI.Texture}     [description]
     */
    public getByName(str: string) : PIXI.Texture {
        return this.textureList[str];
    }
}
