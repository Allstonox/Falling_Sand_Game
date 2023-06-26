class Lava extends Liquid {
    constructor({ x, y, width, height, index, color = {red: 170, green: 0, blue: 0} }) {
        super({ x, y, width, height, index, color });

    }

    specificUpdate() {
        this.checkFlammable();
        this.checkWater();
    }

    checkWater() {
        for (let i = this.index.row - 1; i < this.index.row + 2; i++) {
            for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                if (grid[i][j].particle != null) {
                    if (grid[i][j].particle instanceof Water) {
                        particles.push(new Concrete({
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

    readyToBurn(chance) {
        if (Math.random() < chance) {
            return true;
        }
        else return false;
    }

}