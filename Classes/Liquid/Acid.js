class Acid extends Liquid {
    constructor({ x, y, width, height, index, color = 'rgb(0, 170, 0)' }) {
        super({ x, y, width, height, index, color });

        this.directionPicked = null;
        this.directionChanges = 0;
        if(Math.random() > 0.5) this.directionPicked = 'right';
        else this.directionPicked = 'left';
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
            else if (grid[this.index.row + 1][this.index.column + 1].particle != null && grid[this.index.row + 1][this.index.column - 1].particle === null) {
                this.index.row += 1;
                this.index.column -= 1;
                this.x = grid[this.index.row][this.index.column].x;
                this.y = grid[this.index.row][this.index.column].y;
                grid[this.index.row][this.index.column].particle = this;
                grid[this.index.row - 1][this.index.column + 1].particle = null;
            }
            else if (grid[this.index.row + 1][this.index.column + 1].particle === null && grid[this.index.row + 1][this.index.column - 1].particle === null) {
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
            else if (grid[this.index.row + 1][this.index.column + 1].particle != null && grid[this.index.row + 1][this.index.column - 1].particle != null) {
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
    checkDissolvable() {
        for (let i = this.index.row - 1; i < this.index.row + 2; i++) {
            for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                if (grid[i][j].particle != null) {
                    if (grid[i][j].particle.dissolvable) { 
                        if(Math.random() > grid[i][j].particle.dissolveRate) {
                            particles.splice(particles.indexOf(grid[i][j].particle), 1);   
                            grid[i][j].particle = null;      
                        }
                    }
                }
            }
        }
    }

}