class Entity extends GameObject {
    constructor(x: number, y:number) {
        super(x, y)
    }

    /**
     * Called every game tick to update the entity
     * @param {number} tickNumber [description]
     */
    public tick(tickNumber: number): void {
        return;
    }

    /**
     * Updates the Entity's position
     * @param  {number} x [description]
     * @param  {number} y [description]
     * @return {[type]}   [description]
     */
    public updatePos(x: number, y:number) {
        this.x = x;
        this.y = y;
    }
}
