function init() {
  
  c = document.getElementById('canvas');
  ctx = c.getContext('2d');
  t = 0;
  elapsed = 0;
  circleX = 0;
  circleY = 0;
  c.width = 512;
  c.height = 512;
  last = 0;
  
  panel.addRange("radius", 20, 200, 140, 1);

  loop();
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
circleX = c.width/2 + Math.sin(t/10) * rad;
circleY = c.height/2 + Math.cos(t/10) * rad;
}

function draw(dt){
  //let rad = panel.getValue("radius");
  ctx.fillStyle = '#101';
  ctx.fillRect(0,0,c.width,c.height);let rad = panel.getValue("radius");

  //draw the orbit path in a light gray
  ctx.beginPath();
  ctx.strokeStyle = "#999"
  ctx.arc(c.width/2, c.height/2, rad, 0, Math.PI * 2);
  ctx.stroke();

  //draw an orbiting light purple dot
  ctx.fillStyle = '#a88';
  ctx.beginPath();
  ctx.arc(circleX, circleY, 20, 0, Math.PI * 2, true);
  ctx.fill();
}

init();
