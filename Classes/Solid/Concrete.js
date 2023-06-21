class Concrete extends Solid {
    constructor({ x, y, width, height, index, color = 'grey', dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });

        this.dissolvable = true;
        this.dissolveRate = 0.999;
    }


}