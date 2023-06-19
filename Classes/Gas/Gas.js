class Gas extends Particle {
    constructor({ x, y, width, height, index, color, flammable }) {
        super({ x, y, width, height, index, color, flammable });
    }

    rise() {
        if (this.y + this.height > 1) {
            this.y -= this.height;
            this.index.row--;
            grid[this.index.row + 1][this.index.column].particle = null;
            grid[this.index.row][this.index.column].particle = this;
        }
    }

    emptyAbove() {
        if (this.index.row > 1) {
            if (grid[this.index.row - 1][this.index.column].particle === null) {
                return true;
            }
            else return false;
        }
    }

    interact() {
        if (grid[this.index.row - 1][this.index.column].particle != null) {
            if (grid[this.index.row - 1][this.index.column + 1].particle === null && grid[this.index.row - 1][this.index.column - 1].particle != null) {
                this.index.row -= 1;
                this.index.column += 1;
                this.x = grid[this.index.row][this.index.column].x;
                this.y = grid[this.index.row][this.index.column].y;
                grid[this.index.row][this.index.column].particle = this;
                grid[this.index.row + 1][this.index.column - 1].particle = null;
            }
            else if (grid[this.index.row - 1][this.index.column + 1].particle != null && grid[this.index.row - 1][this.index.column - 1].particle === null) {
                this.index.row -= 1;
                this.index.column -= 1;
                this.x = grid[this.index.row][this.index.column].x;
                this.y = grid[this.index.row][this.index.column].y;
                grid[this.index.row][this.index.column].particle = this;
                grid[this.index.row + 1][this.index.column + 1].particle = null;
            }
            else if (grid[this.index.row - 1][this.index.column + 1].particle === null && grid[this.index.row - 1][this.index.column - 1].particle === null) {
                if (Math.random() > 0.5) {
                    this.index.row -= 1;
                    this.index.column += 1;
                    this.x = grid[this.index.row][this.index.column].x;
                    this.y = grid[this.index.row][this.index.column].y;
                    grid[this.index.row][this.index.column].particle = this;
                    grid[this.index.row + 1][this.index.column - 1].particle = null;
                }
                else {
                    this.index.row -= 1;
                    this.index.column -= 1;
                    this.x = grid[this.index.row][this.index.column].x;
                    this.y = grid[this.index.row][this.index.column].y;
                    grid[this.index.row][this.index.column].particle = this;
                    grid[this.index.row + 1][this.index.column + 1].particle = null;
                }
            }
            else if (grid[this.index.row - 1][this.index.column + 1].particle != null && grid[this.index.row - 1][this.index.column - 1].particle != null) {
                if (this.directionPicked === 'right') {
                    if (grid[this.index.row][this.index.column + 1].particle === null) {
                        this.index.column += 1;
                        this.x = grid[this.index.row][this.index.column].x;
                        grid[this.index.row][this.index.column].particle = this;
                        grid[this.index.row][this.index.column - 1].particle = null;
                    }
                    else if (this.directionChanges < 2 && grid[this.index.row][this.index.column + 1].particle != null && grid[this.index.row][this.index.column - 1].particle === null) {
                        this.directionPicked = 'left';
                        this.directionChanges++;
                    }
                }
                else if (this.directionPicked === 'left') {
                    if (grid[this.index.row][this.index.column - 1].particle === null) {
                        this.index.column -= 1;
                        this.x = grid[this.index.row][this.index.column].x;
                        grid[this.index.row][this.index.column].particle = this;
                        grid[this.index.row][this.index.column + 1].particle = null;
                    }
                    else if (this.directionChanges < 2 && grid[this.index.row][this.index.column - 1].particle != null && grid[this.index.row][this.index.column + 1].particle === null) {
                        this.directionPicked = 'right';
                        this.directionChanges++;
                    }
                }
            }
        }
    }
}