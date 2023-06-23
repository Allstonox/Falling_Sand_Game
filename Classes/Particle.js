class Particle {
    constructor({ x, y, width, height, index, color, dynamic = true, flammable = false, dissolvable = false }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.index = index;
        this.dynamic = dynamic;
        this.flammable = flammable;
        this.color = color;
        if (!(this instanceof Wall)) {
            this.randomColor = Math.random() * 50;
            this.color.red = this.color.red + this.randomColor;
            this.color.green = this.color.green + this.randomColor;
            this.color.blue = this.color.blue + this.randomColor;
        }
    }

    show() {
        c.fillStyle = 'rgb(' + this.color.red + ',' + this.color.green + ',' + this.color.blue + ')';
        c.fillRect(this.x, this.y, this.width, this.height);
        if (lagSwitchOn) {
            c.shadowBlur = 15;
            c.shadowColor = 'rgb(' + this.color.red + ',' + this.color.green + ',' + this.color.blue + ')';
        }
        else {
            c.shadowBlur = null;
            c.shadowColor = null;
        }
    }

    // pickRandomCorner() {
    //     if (Math.random() > 0.5) {
    //         this.index.row += 1;
    //         this.index.column += 1;
    //         this.x = grid[this.index.row][this.index.column].x;
    //         this.y = grid[this.index.row][this.index.column].y;
    //         if (grid[this.index.row][this.index.column].particle != null) {
    //             particles.splice(particles.indexOf(grid[this.index.row][this.index.column].particle), 1);
    //         }
    //         grid[this.index.row][this.index.column].particle = this;
    //         grid[this.index.row - 1][this.index.column - 1].particle = null;
    //     }
    //     else {
    //         this.index.row += 1;
    //         this.index.column -= 1;
    //         this.x = grid[this.index.row][this.index.column].x;
    //         this.y = grid[this.index.row][this.index.column].y;
    //         if (grid[this.index.row][this.index.column].particle != null) {
    //             particles.splice(particles.indexOf(grid[this.index.row][this.index.column].particle), 1);
    //         }
    //         grid[this.index.row][this.index.column].particle = this;
    //         grid[this.index.row - 1][this.index.column + 1].particle = null;
    //     }
    // }
}
