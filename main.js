let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 1.2;


// BONUS
function onLoad() {
    setInterval(createRandomRectangles, 1000);
}

function createRandomRectangles() {
    ctx.strokeStyle ="#b5838d"
    ctx.strokeRect(
        5,              // X
        5,              // Y
        Math.random() * (canvas.width - 10),   // width
        Math.random() * (canvas.height - 10)); // Height
    ctx.stroke();
}


// REQUIRED
function getRectValues() {
    let x = +document.getElementById("x").value;
    let y = +document.getElementById("y").value;
    let width = +document.getElementById("width").value;
    let height = +document.getElementById("height").value;

    return {
        x: x,
        y: y,
        height: height,
        width: width,
    }
}

function calculateRect() {
    let rect = getRectValues();
    let squareArea = rect.height * rect.width;
    document.getElementById("squareArea").innerText = "Square area: " + squareArea;

    createRect();
}

function createRect() {
    resetErrorBorder();

    try {
        validateValues();
        drawRect();
    } catch (e) {
        console.error(e);
        alert(e.message);
    }
}

function resetErrorBorder() {
    document.getElementById("x").style.border = "2px solid white";
    document.getElementById("y").style.border = "2px solid white";
    document.getElementById("width").style.border = "2px solid white";
    document.getElementById("height").style.border = "2px solid white";
}

function validateValues() {
    let values = getRectValues();

    if (values.x < 0) {
        document.getElementById("x").style.border = "red 2px solid";
        throw new Error('X value must be positive.')
    }
    if (values.y < 0) {
        document.getElementById("y").style.border = "red 2px solid";
        throw new Error('Y value must be positive.')
    }
    if (values.width > canvas.width) {
            document.getElementById("width").style.border = "red 2px solid";
            throw new Error('Width value is too hight.')
    }
    if (values.height > canvas.height) {
            document.getElementById("height").style.border = "red 2px solid";
            throw new Error('Height value is too hight.')
    }
    if (values.x + values.width > canvas.width) {
            document.getElementById("x").style.border = "red 2px solid";
            throw new Error('Circle exceeds the rectangle boundries, \n' +
                            'Try lower the X values.')
    }
    if (values.y + values.height > canvas.height) {
            document.getElementById("y").style.border = "red 2px solid";
            throw new Error('Circle exceeds the rectangle boundries, \n' +
                            'Try lower the Y values.')
    }
    if (values.width <= 0) {
            document.getElementById("width").style.border = "red 2px solid";
            throw new Error('Rectangle width must be greater than 0.')
    }
    if (values.height <= 0) {
            document.getElementById("height").style.border = "red 2px solid";
            throw new Error('Rectangle height must be greater than 0.')
    }

}

function drawRect() {
    let rect = getRectValues();
    ctx.fillStyle  = "#e5989b";
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.fill();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("click", clickPoint, false);
function clickPoint() {
    let x = event.offsetX;
    let y = event.offsetY;
    
    clickPoint = {x: x, y: y}
}

function drawClickPosition() {
    let size = 40;
    ctx.fillStyle = "#6d6875";
    ctx.fillRect(clickPoint.x, clickPoint.y, size, size);
    ctx.fill();
}



// CURRENT CANVAS SIZE (change accordingly to window size)
document.getElementById("canvasSize").innerText = 
("CURRENT canvas width: " + canvas.width + ", canvas height: " + canvas.height)