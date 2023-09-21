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

var params = {
    max: {
        vx: 100,
        vy: 500,
    },
    min: {
        vy: 10,
    },
    player: {
        ax: 100,
        ay: 50,
    }
}

var input = {
    x: 0,
    y: 0,
}

var player = {
    x: 0,
    y: 0,
    speed: 0,
    vx: 0,
    vy: 0,
}

var eotw = {
    x: 0,
    y: 100,
    vy: -10,
    accel: -5,
}

var camera = {
    x: 0,
    y: 0,
    dy: -50
}

function keyboard(k) {
    switch (k.key) {
        case "ArrowLeft":
            input.x = (k.type === "keydown") ? -1 : 0
            break
        case "ArrowRight":
            input.x = (k.type === "keydown") ? 1 : 0
            break
        case "ArrowUp":
            input.y = (k.type === "keydown") ? -1 : 0
            break
        case "ArrowDown":
            input.y = (k.type === "keydown") ? 1 : 0
            break;
    }
}

window.onkeydown = keyboard;
window.onkeyup = keyboard;

ctx.font = '24px "Courier New"'

const dist_measure = ctx.measureText('9,999,999')

function tick(dt) {
    if (input.x != 0) {
        player.vx += params.player.ax * input.x * dt
        if (Math.abs(player.vx) > params.max.vx) {
            player.vx = Math.sign(player.vx) * params.max.vx
        }
    } else {
        player.vx = 0
    }

    player.vy += params.player.ay * dt * input.y
    player.vy = Math.min(-params.min.vy, Math.max(player.vy, -params.max.vy))

    player.x += player.vx * dt
    player.y += player.vy * dt

    camera.y = player.y + camera.dy

    eotw.vy += eotw.accel * dt
    eotw.y += eotw.vy * dt

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, 800, 600)

    x = player.x - camera.x + 400
    y = player.y - camera.y + 250

    ctx.fillStyle = "blue"
    ctx.fillRect(x - 7, y - 10, 14, 20)

    x = eotw.x - camera.x + 400
    y = eotw.y - camera.y + 250

    ctx.fillStyle = "orange"
    ctx.fillRect(0, y, 800, 600 - y)

    ctx.fillStyle = "cyan"
    let dist = `${Math.round((eotw.y - player.y - 10) / 4).toLocaleString()}`
    let dist_width = ctx.measureText(dist).width
    ctx.fillText(dist, dist_measure.width - dist_width, 26)
    ctx.fillText(" meters behind you.", dist_measure.width, 26)

    // ctx.fillStyle = "red"
    // ctx.fillText(`player velocity=<${player.vx},${player.vy}> currently @ <${player.x.toPrecision(2)},${player.y.toPrecision(2)}>`, 0, 290)
}
