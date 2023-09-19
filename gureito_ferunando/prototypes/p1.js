const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");

window.requestAnimationFrame(animate);

var x = 10;
var y = 10;
var vx = 50;
var vy = 30;

var last_time = performance.now();
let frame_count = 0;

const MAX_FRAME_TIME = 1 / 30;
function animate(t) {
    let dt = (t - last_time) / 1_000;
    if (dt > MAX_FRAME_TIME) {
        console.log(`dafuq... why did it take ${dt}s to render frame ${frame_count}? anyway, normalizing to ${MAX_FRAME_TIME}. better now.`);
        dt = MAX_FRAME_TIME;
    }
    last_time = t;

    tick(dt);

    frame_count += 1;
    window.requestAnimationFrame(animate);
}

function tick(dt) {
    if (x > 380 || x < 0.1) {
        vx *= -1;
    }
    if (y > 280 || y < 0.1) {
        vy *= -1;
    }
    x += vx * dt;
    y += vy * dt;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 300);
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, 20, 20);

}
