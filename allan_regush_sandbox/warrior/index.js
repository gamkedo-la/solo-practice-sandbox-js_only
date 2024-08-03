let height = 0;
let width = 0;
let tick = 0;
let ctx;

window.onload = function() {
    const canvas = document.querySelector("#c");
    if (!canvas) {
      console.error("No Canvas Found");
      return;
    }
    height = canvas.height;
    width = canvas.width;
    ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Could Not Get Context");
      return;
    }
    requestAnimationFrame(main);
}



function main(timeStamp) {
    if (tick == 0) {
        tick = timeStamp;
    }
    const dt = timeStamp - tick;
    tick = timeStamp;
    render();
    requestAnimationFrame(main);
}

function blackoutCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, width, height);
}

function drawRectangle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function render() {
    blackoutCanvas();
    drawRectangle(10, 10, 10, 10, 'blue');
}