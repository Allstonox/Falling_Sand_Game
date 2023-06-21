class Toxin extends Gas {
    constructor({ x, y, width, height, index, color = 'rgb(50, 120, 50)', flammable = true }) {
        super({ x, y, width, height, index, color, flammable });

        this.burnChance = 0.1;
    }

}