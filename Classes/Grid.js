class Grid {
    constructor({ x, y, width, height }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'black';
        this.particle = null;
    }

    show() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
        // c.strokeStyle = 'black';
        // c.strokeRect(this.x, this.y, this.width, this.height);
    }

    checkClicked(x, y) {
        if (!(this.particle instanceof Wall) && x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
            switch (chosenParticle) {
                case 'Sand':
                    particles.push(new Sand({
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height,
                        index: {
                            row: this.y / (canvas.height / rows),
                            column: this.x / (canvas.width / columns),
                        },
                    }));
                    break;
                case 'Water':
                    particles.push(new Water({
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height,
                        index: {
                            row: this.y / (canvas.height / rows),
                            column: this.x / (canvas.width / columns),
                        },
                    }));
                    break;
                    case 'Concrete':
                    particles.push(new Concrete({
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height,
                        index: {
                            row: this.y / (canvas.height / rows),
                            column: this.x / (canvas.width / columns),
                        },
                    }));
                    break;
                    case 'Oil':
                    particles.push(new Oil({
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height,
                        index: {
                            row: this.y / (canvas.height / rows),
                            column: this.x / (canvas.width / columns),
                        },
                    }));
                    break;
                    case 'Fire':
                    particles.push(new Fire({
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height,
                        index: {
                            row: this.y / (canvas.height / rows),
                            column: this.x / (canvas.width / columns),
                        },
                    }));
                    break;
                    case 'Fuse':
                    particles.push(new Fuse({
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height,
                        index: {
                            row: this.y / (canvas.height / rows),
                            column: this.x / (canvas.width / columns),
                        },
                    }));
                    break;
                    case 'Plant':
                    particles.push(new Plant({
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height,
                        index: {
                            row: this.y / (canvas.height / rows),
                            column: this.x / (canvas.width / columns),
                        },
                    }));
                    break;
                    case 'Sink':
                    particles.push(new Sink({
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height,
                        index: {
                            row: this.y / (canvas.height / rows),
                            column: this.x / (canvas.width / columns),
                        },
                    }));
                    break;
                    case 'Acid':
                    particles.push(new Acid({
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height,
                        index: {
                            row: this.y / (canvas.height / rows),
                            column: this.x / (canvas.width / columns),
                        },
                    }));
                    break;
                    case 'Steam':
                    particles.push(new Steam({
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height,
                        index: {
                            row: this.y / (canvas.height / rows),
                            column: this.x / (canvas.width / columns),
                        },
                    }));
                    break;
                    case 'Gunpowder':
                    particles.push(new Gunpowder({
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height,
                        index: {
                            row: this.y / (canvas.height / rows),
                            column: this.x / (canvas.width / columns),
                        },
                    }));
                    break;
                    case 'Spout':
                    particles.push(new Spout({
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height,
                        index: {
                            row: this.y / (canvas.height / rows),
                            column: this.x / (canvas.width / columns),
                        },
                    }));
                    break;
                    case 'Toxin':
                    particles.push(new Toxin({
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height,
                        index: {
                            row: this.y / (canvas.height / rows),
                            column: this.x / (canvas.width / columns),
                        },
                    }));
                    break;
            }
            if(!(this.particle instanceof Wall) && this.particle != null) {
                particles.splice(particles.indexOf(this.particle), 1);   
                this.particle = particles[particles.length - 1];   
            }
            else this.particle = particles[particles.length - 1];
        }
    }
}