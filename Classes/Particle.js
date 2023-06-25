class Particle {
    constructor({ x, y, width, height, index, color, dynamic = true, flammable = false, dissolvable = false }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.index = index;
        this.dynamic = dynamic;
        this.flammable = flammable;
        this.color = color;
        if (!(this instanceof Wall)) {
            this.randomColor = Math.random() * 50;
            this.color.red = this.color.red + this.randomColor;
            this.color.green = this.color.green + this.randomColor;
            this.color.blue = this.color.blue + this.randomColor;
        }
    }

    show() {
        c.fillStyle = 'rgb(' + this.color.red + ',' + this.color.green + ',' + this.color.blue + ')';
        c.fillRect(this.x, this.y, this.width, this.height);
        if (lagSwitchOn) {
            c.shadowBlur = 15;
            c.shadowColor = 'rgb(' + this.color.red + ',' + this.color.green + ',' + this.color.blue + ')';
        }
        else {
            c.shadowBlur = null;
            c.shadowColor = null;
        }
    }
}