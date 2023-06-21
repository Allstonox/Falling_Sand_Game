class Water extends Liquid {
    constructor({ x, y, width, height, index, color = 'lightseagreen', producesGas = true }) {
        super({ x, y, width, height, index, color, producesGas });

        this.gasToProduce = 'Steam';
        this.vaporizeChance = 0.001;
    }

}