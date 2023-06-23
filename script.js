const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const buttons = document.querySelectorAll('button');

// let viewportWidth = window.innerWidth;
canvas.width = 374;
canvas.height = 500;
const columns = 187;
const rows = 250;

let grid = [];

let chosenParticle = 'Sand';

let particles = [];
let particleCount = 0;

function createGrid() {
    for (var i = 0; i < rows; i++) {
        grid[i] = [];
        for (var j = 0; j < columns; j++) {
            grid[i][j] = new Grid(
                {
                    x: j * (canvas.width / columns),
                    y: i * (canvas.height / rows),
                    width: canvas.width / columns,
                    height: canvas.height / rows,
                });
            if (i === 0 || j === 0 || i === rows - 1 || j === columns - 1) {
                particles.push(new Wall({
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

//Detecting touch/mouse events

let rect = canvas.getBoundingClientRect();
let drawing = false;
let currentX;
let currentY;

canvas.addEventListener("mousedown", (e) => {
    currentX = e.x - rect.left;
    currentY = e.y - rect.top;
    drawing = true;
});
canvas.addEventListener("mousemove", (e) => {
    let newX = e.x - rect.left;
    let newY = e.y - rect.top;
    if(drawing) {
        if (newX != currentX || newY != currentY) {
            drawLine(currentX, currentY, newX, newY);
        }
    }
    currentX = newX;
    currentY = newY;
});
canvas.addEventListener('mouseup', () => {
    drawing = false;
});

canvas.addEventListener("touchstart", (e) => {
    currentX = e.touches[0].clientX - rect.left;
    currentY = e.touches[0].clientY - rect.top;
    drawing = true;
});
canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    let newX = e.touches[0].clientX - rect.left;
    let newY = e.touches[0].clientY - rect.top;
    if(drawing) {
        if (newX != currentX || newY != currentY) {
            drawLine(currentX, currentY, newX, newY);
        }
    }
    currentX = newX;
    currentY = newY;
});
canvas.addEventListener('touchend', (e) => {
    drawing = false;
});

function draw() {
    window.requestAnimationFrame(draw);
    if (drawing) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                grid[i][j].checkClicked(currentX, currentY);
            }
        }
    }
}

//Menu button events

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        chosenParticle = event.srcElement.innerHTML;
        buttons.forEach(button => {
            if (button.classList.contains('active')) button.classList.toggle('active');
        });
        event.target.classList.toggle('active');
    })
});

let brushSize = 'Large';
const smallBrush = document.querySelector('#Small');
const largeBrush = document.querySelector('#Large');

smallBrush.addEventListener('click', (event) => {
    brushSize = 'Small';
});
largeBrush.addEventListener('click', (event) => {
    brushSize = 'Large';
});

const lagSwitch = document.querySelector('#lag-switch');
let lagSwitchOn = false;
lagSwitch.addEventListener('click', (event) => {
    if(lagSwitch.checked) lagSwitchOn = true;
    else lagSwitchOn = false;
});


//Main loop

function animate() {
    setTimeout(function () {
        window.requestAnimationFrame(animate);
        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);
        // for (let i = 0; i < rows; i++) {
        //     for (let j = 0; j < columns; j++) {
        //         grid[i][j].show();
        //     }
        // }
        for (let i = particles.length - 1; i > -1; i--) {
            if (particles[i] != null) {
                particles[i].show();
                if (!(particles[i] instanceof Gas) && !(particles[i] instanceof Fire)) {
                    if (particles[i].emptyBelow() && particles[i].dynamic) {
                        particles[i].fall();
                    }
                    else if (particles[i].dynamic) {
                        particles[i].interact();
                    }
                }
                else if (particles[i] instanceof Gas) {
                    if (particles[i].emptyAbove() && particles[i].dynamic) {
                        particles[i].rise();
                    }
                    else if (particles[i].dynamic) {
                        particles[i].interact();
                    }
                }
                if (particles[i] instanceof Solid && particles[i].dynamic === true) {
                    particles[i].sink();
                }
                else if (particles[i] instanceof Torch) {
                    particles[i].spawnFire();
                }
                else if (particles[i] instanceof Amethyst) {
                    particles[i].grow();
                }
                else if (particles[i] instanceof Plant) {
                    particles[i].germinate();
                    particles[i].checkWater();
                }
                else if (particles[i] instanceof Spout) {
                    particles[i].drip();
                }

                //Below is for destructive elements
                if (particles[i] instanceof Sink) {
                    particles[i].checkNeighbors();
                }
                else if (particles[i] instanceof Fire) {
                    particles[i].lifeSpan--;
                    if (particles[i].lifeSpan > 0) {
                        particles[i].checkFlammable();
                        if(particles[i] instanceof Fire) {
                            particles[i].rise();
                            particles[i].wander();
                            particles[i].checkGasProduction();
                        }
                    }
                    else particles[i].despawn();
                }
                else if (particles[i] instanceof Acid) {
                    particles[i].checkDissolvable();
                }
            }
        }
        // if (particleCount != particles.length - 796) {
        //     particleCount = particles.length - 796;
        //     console.log(particleCount);
        // }
    }, 0);
    rect = canvas.getBoundingClientRect();
}

createGrid();
animate();
draw();
