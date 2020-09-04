let canvas;
let canvasContext;

const ball = {
    x:75,
    y:75,
    deltaX: 2,
    deltaY: 2,
}


window.onload = function() {
    canvas = document.getElementById('canvas');
    canvasContext = canvas.getContext('2d');
    const fps = 30;
    setInterval(main, 1000/fps);
}

function main() {
    update();
    render();
}

function update() {
    if(ball.y > canvas.height || ball.y < 0) {
        ball.deltaY *= -1;
    }
    ball.y += ball.deltaY;
}

function render() {
    blackoutCanvas();
    drawCircle('white', 10);
}


function blackoutCanvas() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0, canvas.width, canvas.height);
}


function drawCircle(color, size) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(ball.x, ball.y, size, 0, Math.PI*2, true);
    canvasContext.fill();
}