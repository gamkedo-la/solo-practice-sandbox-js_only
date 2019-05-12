function init() {
  c = document.getElementById('canvas');
  ctx = c.getContext('2d');
  t = 0;
  elapsed = 0;
  circleX = 0;
  circleY = 0;
  c.width = 512;
  c.height = 512;

  panel.addRange("radius", 20, 200, 40, 1);
}

function loop(dt){

    let now = new Date().getTime();
    dt = Math.min(1, (now - last) / 1000);
    t += dt;

    step(dt);
    draw(dt);

  requestAnimationFrame(loop);
}

function step(dt){
let rad = panel.getValue("radius");
circleX = c.width/2 + Math.sin(dt) * rad;
circleY = c.height/2 + Math.cos(dt) * rad;

function draw(dt){
  ctx.fillStyle = '#101';
  ctx.fillRect(0,0,c.width,c.height);
  ctx.ellipse(circleX, circleY, 10,10,0,0,Math.PI*2,false);
}

init();
