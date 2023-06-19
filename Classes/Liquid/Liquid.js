class Liquid extends Particle {
    constructor({ x, y, width, height, index, color, flammable }) {
        super({ x, y, width, height, index, color, flammable });
    }

    fall() {
        if (this.y + this.height < canvas.height) {
            this.y += this.height;
            this.index.row++;
            grid[this.index.row - 1][this.index.column].particle = null;
            grid[this.index.row][this.index.column].particle = this;
        }
    }

    emptyBelow() {
        if (this.index.row < rows - 1) {
            if (grid[this.index.row + 1][this.index.column].particle === null) {
                return true;
            }
            else return false;
        }
    }
}