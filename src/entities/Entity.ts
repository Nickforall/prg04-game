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
}
