function init() {
  
  c = document.getElementById('canvas');
  ctx = c.getContext('2d');
  c.style = "cursor: none"
  t = 0;
  elapsed = 0;
  c.width = 512;
  c.height = 512;
  last = 0;

 


  //----example specific variables------------
  floor = 50;

  hero = {
    x: c.width/2,
    y: c.height/2,
    width: 20,
    height: 20,
    speed: 5,
    color: "red",
    dragged: false,
    selected: false
  }

  mousePos = {x:0, y:0};
  
  //initialize  event listeners--------------------------
    window.addEventListener('keyup', function (event) {
      Key.onKeyup(event);
    }, false);
    window.addEventListener('keydown', function (event) {
      Key.onKeydown(event);
    }, false);
    window.addEventListener('blur', function (event) {
      paused = true;
    }, false);
    window.addEventListener('focus', function (event) {
      paused = false;
    }, false);

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
  if(hero.dragged){
    hero.x = mousePos.x;
    hero.y = mousePos.y;
  }
  hero.color = hero.selected ? "yellow" : "red";
}

function draw(dt){
  //clear the screen by filling with a dark purple
  ctx.fillStyle = '#101';
  ctx.fillRect(0,0, c.width, c.height);

  //draw our hero
  ctx.fillStyle = hero.color;
  ctx.fillRect(hero.x, hero.y, hero.width, hero.height);

  //draw mouse cursor
  ctx.fillStyle = 'white';
  ctx.fillRect(mousePos.x-2, mousePos.y-2, 4, 4);
}

function handleMouseMove(evt) {
  mousePos = calculateMousePos(evt);
}

function handleMouseDown(evt) {
  let heroRect = {
    x1: hero.x,
    y1: hero.y,
    x2: hero.x+hero.width,
    y2: hero.y+hero.height
  }
  if(overlapPointRect(mousePos, heroRect)){
    hero.selected = true;
    hero.dragged = true;
  }else {
    hero.selected = false;
  }
}

function handleMouseUp(evt) {
  hero.dragged = false;
}



init();
