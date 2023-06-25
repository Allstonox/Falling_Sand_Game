class Amethyst extends Solid {
    constructor({ x, y, width, height, index, color = { red: 100, green: 0, blue: 100 }, dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });

        this.growthRate = 0.05;
        if(Math.random() > 0.5) {
            this.canGrow = true;
        }
        else {
            this.canGrow = false;
        }
    }

    specificUpdate() {
        this.grow();
    }

    grow() {
        if (this.canGrow && Math.random() < this.growthRate) {
            for (let i = this.index.row - 1; i > this.index.row - 2; i--) {
                for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                    if (grid[i][j].particle === null) {
                        particles.push(new Amethyst({
                            x: grid[i][j].x,
                            y: grid[i][j].y,
                            width: grid[i][j].width,
                            height: grid[i][j].height,
                            index: {
                                row: grid[i][j].y / (canvas.height / rows),
                                column: grid[i][j].x / (canvas.width / columns),
                            },
                        }));
                        grid[i][j].particle = particles[particles.length - 1];
                    }
                }
            }
        }
        else return;
    }

}