class Wall extends Solid {
    constructor({ x, y, width, height, index, color = 'black', dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });
    }

}