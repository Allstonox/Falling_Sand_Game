class Steam extends Gas {
    constructor({ x, y, width, height, index, color = 'rgba(100, 100, 100, 0.2)' }) {
        super({ x, y, width, height, index, color });

        this.directionPicked = null;
        this.directionChanges = 0;
        if(Math.random() > 0.5) this.directionPicked = 'right';
        else this.directionPicked = 'left';
    }

}