class Fire extends Particle {
    constructor({ x, y, width, height, index, color = { red: 170, green: 1, blue: 1 }, dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });

        this.lifeSpan = 10;
    }

    rise() {
        if (this.y + this.height > 1 && grid[this.index.row - 1][this.index.column].particle === null) {
            this.y -= this.height;
            this.index.row--;
            grid[this.index.row + 1][this.index.column].particle = null;
            grid[this.index.row][this.index.column].particle = this;
        }
    }

    wander() {
        if (Math.random() > 0.6) {
            if (grid[this.index.row][this.index.column + 1].particle === null) {
                this.index.column++;
                this.x = grid[this.index.row][this.index.column].x;
                grid[this.index.row][this.index.column - 1].particle = null;
                grid[this.index.row][this.index.column].particle = this;
            }
        }
        else if (Math.random() < 0.6) {
            if (grid[this.index.row][this.index.column - 1].particle === null) {
                this.index.column--;
                this.x = grid[this.index.row][this.index.column].x;
                grid[this.index.row][this.index.column + 1].particle = null;
                grid[this.index.row][this.index.column].particle = this;
            }
        }
    }

    despawn() {
        particles.splice(particles.indexOf(grid[this.index.row][this.index.column].particle), 1);
        grid[this.index.row][this.index.column].particle = null;
    }

    checkFlammable() {
        for (let i = this.index.row - 1; i < this.index.row + 2; i++) {
            for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                if (grid[i][j].particle != null) {
                    if (grid[i][j].particle.flammable && this.readyToBurn(grid[i][j].particle.burnChance)) {
                        particles.push(new Fire({
                            x: grid[i][j].x,
                            y: grid[i][j].y,
                            width: grid[i][j].width,
                            height: grid[i][j].height,
                            index: {
                                row: grid[i][j].y / (canvas.height / rows),
                                column: grid[i][j].x / (canvas.width / columns),
                            },
                        }));
                        particles.splice(particles.indexOf(grid[i][j].particle), 1);
                        grid[i][j].particle = particles[particles.length - 1];
                    }
                }
            }
        }
    }

    checkGasProduction() {
        for (let i = this.index.row - 1; i < this.index.row + 2; i++) {
            for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                if (grid[i][j].particle != null) {
                    if (grid[i][j].particle instanceof Liquid && grid[i][j].particle.producesGas && this.readyToBurn(grid[i][j].particle.vaporizeChance)) {
                        let newGas = eval(grid[i][j].particle.gasToProduce);
                        particles.push(new newGas({
                            x: grid[i][j].x,
                            y: grid[i][j].y,
                            width: grid[i][j].width,
                            height: grid[i][j].height,
                            index: {
                                row: grid[i][j].y / (canvas.height / rows),
                                column: grid[i][j].x / (canvas.width / columns),
                            },
                        }));
                        particles.splice(particles.indexOf(grid[i][j].particle), 1);
                        grid[i][j].particle = particles[particles.length - 1];
                    }
                }
            }
        }
    }

    readyToBurn(chance) {
        if (Math.random() < chance) {
            return true;
        }
        else return false;
    }
}
