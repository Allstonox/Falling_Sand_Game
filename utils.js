function drawLine(currentX, currentY, newX, newY) {
    let xChange = Math.abs(newX - currentX);
    let yChange = Math.abs(newY - currentY);
    let slope = 0;
    if(yChange === 0 & xChange != 0) {
        slope = 0;
    }
    else if(xChange === 0 & yChange != 0) {
        if (currentY >= newY) {
            for (let i = currentY; i >= newY; i--) {
                let calculatedX = currentX;
                let calculatedY = i;
                for (let q = 0; q < rows; q++) {
                    for (let j = 0; j < columns; j++) {
                        grid[q][j].checkClicked(calculatedX, calculatedY);
                    }
                }
            }
        }
        else if (currentY < newY) {
            for (let i = currentY; i < newY; i++) {
                let calculatedX = currentX;
                let calculatedY = i;
                for (let q = 0; q < rows; q++) {
                    for (let j = 0; j < columns; j++) {
                        grid[q][j].checkClicked(calculatedX, calculatedY);
                    }
                }
            }
        }
        return;
    }
    else slope = (newY - currentY) / (newX - currentX);

    let yInt = -((slope * currentX) - currentY);

    if (xChange >= yChange) {
        if (currentX >= newX) {
            for (let i = currentX; i >= newX; i--) {
                let calculatedX = i;
                let calculatedY = (slope * i + yInt);
                for (let q = 0; q < rows; q++) {
                    for (let j = 0; j < columns; j++) {
                        grid[q][j].checkClicked(calculatedX, calculatedY);
                    }
                }
            }
        }
        else if (currentX < newX) {
            for (let i = currentX; i < newX; i++) {
                let calculatedX = i;
                let calculatedY = (slope * i + yInt);
                for (let q = 0; q < rows; q++) {
                    for (let j = 0; j < columns; j++) {
                        grid[q][j].checkClicked(calculatedX, calculatedY);
                    }
                }
            }
        }
    }
    else if (yChange > xChange) {
        if (currentY >= newY) {
            for (let i = currentY; i >= newY; i--) {
                let calculatedX = (i - yInt) / slope;
                let calculatedY = i;
                for (let q = 0; q < rows; q++) {
                    for (let j = 0; j < columns; j++) {
                        grid[q][j].checkClicked(calculatedX, calculatedY);
                    }
                }
            }
        }
        else if (currentY < newY) {
            for (let i = currentY; i < newY; i++) {
                let calculatedX = (i - yInt) / slope;
                let calculatedY = i;
                for (let q = 0; q < rows; q++) {
                    for (let j = 0; j < columns; j++) {
                        grid[q][j].checkClicked(calculatedX, calculatedY);
                    }
                }
            }
        }
    }
    else if(xChange === 0 & yChange === 0) return;
}