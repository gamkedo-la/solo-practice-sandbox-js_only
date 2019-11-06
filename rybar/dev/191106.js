function init() {
  
  c = document.getElementById('canvas');
  ctx = c.getContext('2d');
  t = 0;
  elapsed = 0;
  c.width = 512;
  c.height = 512;
  last = 0;
  mousePos = {};


  //----example specific variables------------
  squares = [];
  for(let i = 150; i > 0; i--){
    squares.push({
      x: Math.random()*400+50,
      y: Math.random()*400+50,
      width: Math.random()*20 + 20,
      height: Math.random()*20 + 20,
      dragged: false,
      selected: false,
      hue: Math.random()*360,
      sat: '65%',
      brightness: '30%'
    })
  }
  
  //handle mouse events
  c.addEventListener('mousemove', handleMouseMove);
  c.addEventListener('mousedown', handleMouseDown);
  c.addEventListener('mouseup', handleMouseUp);

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
squares.forEach(function(sq){
  if(sq.dragged){
    sq.x = mousePos.x;
    sq.y = mousePos.y;
  }
})
}

function draw(dt){
  //clear the screen by filling with a dark purple
  ctx.fillStyle = '#101';
  ctx.fillRect(0,0, c.width, c.height);

  //draw the squares
  squares.forEach(function(square, i, array){
      let dist = Math.hypot(mousePos.x - square.x, mousePos.y - square.y)/500;
      let hue = lerp(200, square.hue, dist);
    ctx.fillStyle = `hsl(${hue}, 65%, ${40-(dist*80)}%)`;
    if(square.selected){ctx.fillStyle = 'white'}
    ctx.fillRect(square.x, square.y, square.width, square.height);
    ctx.strokeStyle = "1px white";
    ctx.stroke();
  })

  //draw mouse cursor
  ctx.fillStyle = 'white';
  ctx.fillRect(mousePos.x-4,mousePos.y-4,8,8);
  
}

function handleMouseDown(e){
squares.forEach(function(sq){
  let sqRect = {
    x1: sq.x, x2: sq.x+sq.width,
    y1: sq.y, y2: sq.y+sq.height
  }
  if(overlapPointRect(mousePos, sqRect)){
    sq.selected = true;
    sq.dragged = true;
  }
})
}

function handleMouseMove(e){
mousePos = calculateMousePos(e);

}

function handleMouseUp(e){
squares.forEach(function(sq){
  sq.dragged = false;
})
}

init();
