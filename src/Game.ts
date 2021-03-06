/// <reference path="GameState.ts"/>
/// <reference path="GameObject.ts"/>
/// <reference path="gfx/TextureManager.ts"/>
/// <reference path="level/Map.ts"/>
/// <reference path="level/Tile.ts"/>
/// <reference path="entities/Entity.ts"/>
/// <reference path="entities/Player.ts"/>
/// <reference path="net/NetworkManager.ts"/>


class Game {
    private map: Map;
    private totalTicks: number;
    public isTyping: boolean;
    public stage: PIXI.Container;
    public textures: TextureManager;
    public network: NetworkManager

    // either a GL renderer or a Canvas renderer, depends on what the
    // `autoDetectRenderer` method returns
    private renderer: any;

    constructor(gameDiv: HTMLCanvasElement) {
        this.totalTicks = 0;

        //load our classes
        this.textures = new TextureManager();
        this.map = new Map(this);
        this.network = new NetworkManager();

        //load pixi logic into dom
        this.stage = new PIXI.Container();
        //rescale container for pixelart
        this.stage.scale.x = 2;
        this.stage.scale.y = 2;
        //build pixi's renderer

        let innerHeight = (window.innerHeight < Map.mapHeight * Map.tileSize * 2) ? Map.mapHeight * Map.tileSize * 2 : window.innerHeight;
        let innerWidth = (window.innerWidth < Map.mapHeight * Map.tileSize * 2) ? Map.mapHeight * Map.tileSize * 2 : window.innerWidth;

        this.renderer = PIXI.autoDetectRenderer(innerWidth, innerHeight, {
            view: gameDiv
        });
    }

    public init() {
        console.log("Initializing game...");

        this.textures.loadTilesheet();
        this.network.init();
        this.map.init();

        this.renderer.render(this.stage);

        // build a beautiful map
        this.map.addBuilding(5, 3, "building1");
        this.map.addBuilding(12, 3, "building2");
        this.map.addBuilding(19, 3, "building1");

        // add the local player to the map
        this.map.addPlayer(1, 1, true, Player.skins[Math.floor(Player.skins.length * Math.random())]);

        this.initClientChat();

        // This arrow function is needed because fucking javascript scopes.
        requestAnimationFrame(() => {
            this.update();
        })
    }

    /**
     * Initializes all chat logic
     * @return {[type]} [description]
     */
    public initClientChat() {
        let speechInput = (<HTMLInputElement> document.getElementById("speechInput"));

        speechInput.addEventListener("focus", () => {
            this.isTyping = true;
        });
        speechInput.addEventListener("focusout", () => {
            this.isTyping = false;
        });

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if(this.isTyping && e.keyCode == 13) {
                let val = (speechInput.value);
                speechInput.value = "";
                speechInput.blur();

                this.map.localPlayer.chat(val);
                this.network.getSocket().emit("playerChat", {txt: val});
            }
        });
    }

    /**
     * Updates the game
     * @return {[type]} [description]
     */
    private update() {
        var t = ++this.totalTicks;

        this.renderer.render(this.stage);
        this.map.tick(t);

        // This arrow function is needed because fucking javascript scopes.
        requestAnimationFrame(() => {
            this.update();
        })
    }
}
