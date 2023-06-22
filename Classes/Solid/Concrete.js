class Concrete extends Solid {
    constructor({ x, y, width, height, index, color = {red: 128, green: 128, blue: 128}, dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });

        this.dissolvable = true;
        this.dissolveRate = 0.999;
    }


}