class Player extends Entity {
    private isLocal: boolean;
    public sprite: PIXI.Sprite;
    private map: Map;

    static skins: Array<string> = ["character1", "character2", "character3", "character4"];

    constructor(x: number, y:number, local: boolean, map: Map, texture: PIXI.Texture) {
        super(x, y)
        this.isLocal = local;
        this.sprite = new PIXI.Sprite(texture);
        this.map = map;

        if(this.isLocal) document.addEventListener('keydown', (e: KeyboardEvent) => {
            console.log("Handling Movement")
            this.onKeyDown(e.keyCode)
        })

        this.preRender();
    }

    /**
     * Set the properties in order to render
     * @return {[type]} [description]
     */
    private preRender() {
        this.sprite.x = Map.tileSize * this.x;
        this.sprite.y = Map.tileSize * this.y;
        this.sprite.pivot.x = 2;
        this.sprite.pivot.y = 6;

        this.map.game.stage.addChild(this.sprite);
    }

    /**
     * Handles a key event
     * @param  {number} keycode [description]
     * @return {[type]}         [description]
     */
    private onKeyDown(keycode: number) {
        if(this.map.game.isTyping || !this.isLocal) return;

        switch(keycode) {
            case(87):
                if(this.y > 0 && this.map.isWalkable(this.x, this.y - 1))
                    this.y--;
                break;
            case(83):
                if(this.y + 1 < Map.mapHeight && this.map.isWalkable(this.x, this.y + 1))
                    this.y++;
                break;
            case(65):
                if(this.x > 0 && this.map.isWalkable(this.x - 1, this.y))
                    this.x--;
                break;
            case(68):
                if(this.x + 1 < Map.mapWidth && this.map.isWalkable(this.x + 1, this.y))
                    this.x++;
                break;
        }

        this.map.game.network.getSocket().emit("playerMove", {x: this.x, y: this.y});
    }

    /**
     * [tick description]
     * @param {number} tickNumber [description]
     */
    public tick(tickNumber: number): void {
        this.sprite.x = Map.tileSize * this.x;
        this.sprite.y = Map.tileSize * this.y;

        // the actions below this line only apply to local players
        if(!this.isLocal) return;
    }

    /**
     * Spawns a chat bubble on top of the player
     * @param  {string} content [description]
     * @return {[type]}         [description]
     */
    public chat(content: string) {
        let bubble = document.createElement('chatbubble')
        bubble.appendChild(document.createTextNode(content));

        var top = 0;

        bubble.style.left = this.x * 16 * 2 + "px";
        top = (this.y * 16 * 2) - 28

        bubble.style.top = top + "px";

        document.body.appendChild(bubble);

        let interval = setInterval(() => {
            top = top - bubble.clientHeight;
            bubble.style.top = top + "px";

            if(top < 0) {
                clearInterval(interval);
                document.body.removeChild(bubble)
            }
        }, 800)
    }
}
