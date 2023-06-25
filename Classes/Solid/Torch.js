class Torch extends Solid {
    constructor({ x, y, width, height, index, color = {red: 80, green: 30, blue: 30}, dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });
    }

    specificUpdate() {
        this.spawnFire();
    }

    spawnFire() {
        for (let i = this.index.row - 1; i < this.index.row + 2; i++) {
            for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                if (grid[i][j].particle === null) {
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
                        grid[i][j].particle = particles[particles.length - 1];
                    }
            }
        }
    }
}