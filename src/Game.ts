/// <reference path="GameState.ts"/>
/// <reference path="gfx/TextureManager.ts"/>
/// <reference path="level/Map.ts"/>

class Game {
    private state: GameState;
    private map: Map;
    public stage: PIXI.Container;
    public textures: TextureManager;

    // either a GL renderer or a Canvas renderer, depends on what the
    // `autoDetectRenderer` method returns
    private renderer: any;

    constructor(gameDiv: HTMLCanvasElement) {
        this.state = GameState.PLAYING;

        this.textures = new TextureManager();
        this.map = new Map(this);

        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(512, 512, {
            view: gameDiv
        });
    }

    public init() {
        console.log("Initializing game...");

        this.textures.loadTilesheet();
        this.map.populate();
        this.map.render();

        this.renderer.render(this.stage);

        requestAnimationFrame(() => {
            this.update();
        })
    }

    private update() {
        this.renderer.render(this.stage);
    }

    private setState(state: GameState) {
        this.state = state;
    }
}
