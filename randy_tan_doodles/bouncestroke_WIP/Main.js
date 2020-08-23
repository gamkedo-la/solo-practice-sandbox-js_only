const canvas = document.createElement("canvas");
canvas.id = "gameCanvas";
const canvasContext = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 600;
document.body.appendChild(canvas);
const wd = window;
requestAnimationFrame = wd.requestAnimationFrame || wd.webkitRequestAnimationFrame || wd.msRequestAnimationFrame || wd.mozRequestAnimationFrame;
let then = Date.now();
let isGameLoopPaused = false;
const main = () => {
    if (isGameLoopPaused) return;
    let now = Date.now(), dt = (now - then) / 1000;
    update(dt);
    render(dt);
    then = now;
    requestAnimationFrame(main);
};