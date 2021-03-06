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
  entities = [];
  
  circle0 = {
    position: {x: 200, y:200},
    radius: 40
  }

  circle1 = {
    position: {x:100, y:100},
  }
  
  
  //handle mouse events
  c.addEventListener('click', handleMouseClicked);
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
entities.forEach(function(sq){
  if(sq.dragged){
    sq.x = mousePos.x;
    sq.y = mousePos.y;
  }
  sq.y += sq.yvel;
  if(sq.y > 512) sq.y = -10
})
}

function draw(dt){
  //clear the screen by filling with a dark purple
  ctx.fillStyle = '#101';
  ctx.fillRect(0,0, c.width, c.height);

  

  //draw the squares
  squares.forEach(function(square, i, array){
      let dist = Math.hypot(mousePos.x - square.x, mousePos.y - square.y)/50;
      let hue = lerp(200, square.hue, dist);
    ctx.fillStyle = `hsl(${hue}, ${square.sat}, ${square.brightness*1/dist}%)`;
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
    for(let i = 0; i < squares.length; i++){
      let dist = Math.hypot(sq.x - squares[i].x, sq.y - squares[i].y)/150
      squares[i].brightness += 8*1/dist;
      //console.log(squares[i].brightness);
    }
    sq.dragged = true;
  }
})
}

function handleMouseMove(e){
mousePos = calculateMousePos(e);

}

function handleMouseClicked(e){
  // let selectedSquares = squares.filter(function(sq){return sq.selected == true});
  // selectedSquares.forEach(function(sel){
  //   for(let i = 0; i < squares.length; i++){
  //     let dist = Math.hypot(sel.x - squares[i].x, sel.y - squares[i].y)/200
  //     squares[i].brightness += 1/dist;
  //     //console.log(squares[i].brightness);
  //   }
  // })
}
function handleMouseUp(e){
squares.forEach(function(sq){
  sq.dragged = false;
})
}

init();
