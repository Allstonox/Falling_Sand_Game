class Fuse extends Solid {
    constructor({ x, y, width, height, index, color = 'saddlebrown', dynamic = false, flammable = true }) {
        super({ x, y, width, height, index, color, dynamic, flammable });

        this.burnChance = 0.6;
    }

}