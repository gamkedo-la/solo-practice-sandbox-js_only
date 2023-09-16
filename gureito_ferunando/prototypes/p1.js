const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");

window.requestAnimationFrame(animate);

var x = 10;
var y = 10;
var vx = 50;
var vy = 30;
var last_time = performance.now();

function animate(t) {
    let dt = (t - last_time)/1_000;

    if (x>380 || x < 0.1) {
        vx *= -1;
    }
    if (y>280 || y < 0.1) {
        vy *= -1;
    }
    x += vx*dt;
    y += vy*dt;

    ctx.clearRect(0,0,400,300);
    ctx.fillStyle = "green";
    ctx.fillRect(x,y,20,20);

    last_time = t;
    window.requestAnimationFrame(animate);
}
