const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");

window.requestAnimationFrame(animate);

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

// ============================================================================

var player = {
    x: 200,
    y: 200,
    speed: 0,
    vx: 0,
    vy: 0,
};

function keyboard(k) {
    switch (k.key) {
        case "ArrowLeft":
            if (k.type === "keydown") {
                player.vx = -10;
            } else {
                player.vx = 0;
            }
            break;
        case "ArrowRight":
            if (k.type === "keydown") {
                player.vx = 10;
            } else {
                player.vx = 0;
            }
            break;
        case "ArrowUp":
            if (k.type === "keydown") {
                player.vy -= 10;
            }
            break;
        case "ArrowDown":
            if (k.type === "keydown") {
                player.vy += 10;
            }
            break;
    }
}
window.onkeydown = keyboard;
window.onkeyup = keyboard;
function tick(dt) {
    player.x += player.vx * dt;
    player.y += player.vy * dt;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 300);
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x - 10, player.y - 10, 20, 20);
}
