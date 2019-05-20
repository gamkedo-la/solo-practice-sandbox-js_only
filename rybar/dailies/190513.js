function init() {
  
  c = document.getElementById('canvas');
  ctx = c.getContext('2d');
  t = 0;
  elapsed = 0;
  circleX = 0;
  circleY = 0;
  cirX = 0;
  cirY = 0;
  c.width = 512;
  c.height = 512;
  last = 0;
  
  panel.addRange("radius", 20, 200, 140, 1);
  panel.addRange("radius 2", 30, 120, 65, .5);
  panel.addRange("speed 1", 0, 100, 50, .5);
  panel.addRange("speed 2", 0, 100, 50, .5);

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
let rad2 = panel.getValue("radius 2");
let speed1 = panel.getValue("speed 1");
let speed2 = panel.getValue("speed 2");

circleX = c.width/2 + Math.sin(t/(100-speed1)) * rad;
circleY = c.height/2 + Math.cos(t/(100-speed1)) * rad;
cirX = circleX +  Math.sin(-t/(100-speed2)) * rad2;
cirY = circleY + Math.cos(-t/(100-speed2)) * rad2;
}

function draw(dt){
  let rad = panel.getValue("radius");
  let rad2 = panel.getValue("radius 2");

  ctx.fillStyle = '#101';
  ctx.fillRect(0,0,c.width,c.height);

  //draw the orbit paths in a light gray
  ctx.beginPath();
  ctx.strokeStyle = "#999"
  ctx.arc(c.width/2, c.height/2, rad, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.strokeStyle = "#999"
  ctx.arc(circleX, circleY, rad2, 0, Math.PI*2);
  ctx.stroke();

  //draw an orbiting light purple dot
  ctx.fillStyle = '#a88';
  ctx.beginPath();
  ctx.arc(circleX, circleY, 20, 0, Math.PI * 2, true);
  ctx.fill();

  ctx.fillStyle = '#a88';
  ctx.beginPath();
  ctx.arc(cirX, cirY, 5, 0, Math.PI * 2, true);
  ctx.fill();
}

init();
