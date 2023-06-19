class Fire extends Particle {
    constructor({ x, y, width, height, index, color = 'red', dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });

        this.lifeSpan = 20;
    }

    despawn() {
        particles.splice(particles.indexOf(grid[this.index.row][this.index.column].particle), 1);
        grid[this.index.row][this.index.column].particle = null;
    }

    checkFlammable() {
        for (let i = this.index.row - 1; i < this.index.row + 2; i++) {
            for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                if (grid[i][j].particle != null) {
                    if (grid[i][j].particle.flammable && this.readyToBurn(grid[i][j].particle)) {
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

    //Multiply 0.3 by particle.burnRate for whatever you're burning to speed up/slow down burns
    readyToBurn(particle) {
        if(Math.random() > 0.3) {
            return true;
        }
        else return false;
    }

}