class Oil extends Liquid {
    constructor({ x, y, width, height, index, color = 'maroon', flammable = true }) {
        super({ x, y, width, height, index, color, flammable });

        this.burnChance = 0.5;
    }

}