/// <reference path="GameState.ts"/>
/// <reference path="GameObject.ts"/>
/// <reference path="gfx/TextureManager.ts"/>
/// <reference path="level/Map.ts"/>
/// <reference path="level/Tile.ts"/>
/// <reference path="entities/Entity.ts"/>
/// <reference path="entities/Player.ts"/>


class Game {
    private state: GameState;
    private map: Map;
    private totalTicks: number;
    public stage: PIXI.Container;
    public textures: TextureManager;

    // either a GL renderer or a Canvas renderer, depends on what the
    // `autoDetectRenderer` method returns
    private renderer: any;

    constructor(gameDiv: HTMLCanvasElement) {

        this.state = GameState.PLAYING;
        this.totalTicks = 0;

        //load our classes
        this.textures = new TextureManager();
        this.map = new Map(this);

        //load pixi logic into dom
        this.stage = new PIXI.Container();
        //rescale container for pixelart
        this.stage.scale.x = 2;
        this.stage.scale.y = 2;
        //build pixi's renderer
        this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
            view: gameDiv
        });
    }

    public init() {
        console.log("Initializing game...");

        this.textures.loadTilesheet();
        this.map.populate();
        this.map.render();

        this.renderer.render(this.stage);

        // build a beautiful map
        this.map.addBuilding(5, 3, "building1");
        this.map.addBuilding(12, 3, "building1");
        this.map.addBuilding(19, 3, "building1");

        // add the local player to the map
        this.map.addPlayer(0, 0, true);

        // This arrow function is needed because fucking javascript scopes.
        requestAnimationFrame(() => {
            this.update();
        })
    }

    private update() {
        var t = ++this.totalTicks;

        this.renderer.render(this.stage);
        this.map.tick(t);

        // This arrow function is needed because fucking javascript scopes.
        requestAnimationFrame(() => {
            this.update();
        })
    }

    private setState(state: GameState) {
        this.state = state;
    }
}
