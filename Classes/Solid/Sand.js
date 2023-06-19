class Sand extends Solid {
    constructor({ x, y, width, height, index, color = 'darkgoldenrod' }) {
        super({ x, y, width, height, index, color });
    }

    interact() {
        if (grid[this.index.row + 1][this.index.column].particle != null) {
            if (grid[this.index.row + 1][this.index.column + 1].particle === null && grid[this.index.row + 1][this.index.column - 1].particle != null) {
                this.index.row += 1;
                this.index.column += 1;
                this.x = grid[this.index.row][this.index.column].x;
                this.y = grid[this.index.row][this.index.column].y;
                grid[this.index.row][this.index.column].particle = this;
                grid[this.index.row - 1][this.index.column - 1].particle = null;
            }
            else if (grid[this.index.row + 1][this.index.column + 1].particle != null && grid[this.index.row + 1][this.index.column - 1].particle != null) {
                return;
            }
            else if (grid[this.index.row + 1][this.index.column + 1].particle != null && grid[this.index.row + 1][this.index.column - 1].particle === null) {
                this.index.row += 1;
                this.index.column -= 1;
                this.x = grid[this.index.row][this.index.column].x;
                this.y = grid[this.index.row][this.index.column].y;
                grid[this.index.row][this.index.column].particle = this;
                grid[this.index.row - 1][this.index.column + 1].particle = null;
            }
            else if (grid[this.index.row + 1][this.index.column + 1].particle === null && grid[this.index.row + 1][this.index.column - 1].particle === null) {
                this.pickRandomCorner();
            }
        }
    }

    pickRandomCorner() {
        if (Math.random() > 0.5) {
            this.index.row += 1;
            this.index.column += 1;
            this.x = grid[this.index.row][this.index.column].x;
            this.y = grid[this.index.row][this.index.column].y;
            grid[this.index.row][this.index.column].particle = this;
            grid[this.index.row - 1][this.index.column - 1].particle = null;
        }
        else {
            this.index.row += 1;
            this.index.column -= 1;
            this.x = grid[this.index.row][this.index.column].x;
            this.y = grid[this.index.row][this.index.column].y;
            grid[this.index.row][this.index.column].particle = this;
            grid[this.index.row - 1][this.index.column + 1].particle = null;
        }
    }

    sink() {
        if (grid[this.index.row + 1][this.index.column].particle != null) {
            if (grid[this.index.row + 1][this.index.column].particle instanceof Liquid) {
                console.log('on liquid');
                let particleToSwap = particles[particles.indexOf(grid[this.index.row + 1][this.index.column].particle)];
                this.index.row += 1;
                this.y = grid[this.index.row][this.index.column].y;
                particleToSwap.index.row--;
                particleToSwap.y = grid[particleToSwap.index.row][particleToSwap.index.column].y;
                grid[particleToSwap.index.row][particleToSwap.index.column].particle = particleToSwap;
                grid[this.index.row][this.index.column].particle = this;
            }
        }
    }

}