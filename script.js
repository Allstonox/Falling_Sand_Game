const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const buttons = document.querySelectorAll('button');

canvas.width = 400;
canvas.height = 400;

let grid = [];
const columns = 200;
const rows = 200;

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
canvas.addEventListener("mousedown", (e) => {
    let currentX = e.x;
    let currentY = e.y;
    var intervalId = setInterval(function () {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                let canvasX = currentX - rect.left;
                let canvasY = currentY - rect.top;
                grid[i][j].checkClicked(canvasX, canvasY);
            }
        }
        window.onmousemove = (event) => {
            currentX = event.x;
            currentY = event.y;
        }
    }, 0);
    window.addEventListener('mouseup', () => {
        clearInterval(intervalId);
    });
});
canvas.addEventListener("touchstart", (e) => {
    console.log('hi')
    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;
    var intervalId = setInterval(function () {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                let canvasX = currentX - rect.left;
                let canvasY = currentY - rect.top;
                grid[i][j].checkClicked(canvasX, canvasY);
            }
        }
        window.addEventListener('touchmove', (event) => {
            currentX = event.touches[0].clientX;
            currentY = event.touches[0].clientY;
        })
    }, 0);
    window.addEventListener('touchend', () => {
        clearInterval(intervalId);
        console.log('bye')
    });
});

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        chosenParticle = event.srcElement.innerHTML;
        buttons.forEach(button => {
            if (button.classList.contains('active')) button.classList.toggle('active');
        });
        event.target.classList.toggle('active');
    })
});

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