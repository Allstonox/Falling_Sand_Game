class Particle {
    constructor({ x, y, width, height, index, color, dynamic = true, flammable = false, dissolvable = false }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.index = index;
        this.dynamic = dynamic;
        this.flammable = flammable;
    }

    show() {
        // c.shadowBlur = 15;
        // c.shadowColor = this.color;
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
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