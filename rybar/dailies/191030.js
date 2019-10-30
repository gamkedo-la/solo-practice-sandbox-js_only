function init() {
  
  c = document.getElementById('canvas');
  ctx = c.getContext('2d');
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
    width: 30,
    height: 30,
    speed: 5,
    color: "#505",
    moveColor: "#959"
  }
  
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
//let rad = panel.getValue("radius");
  hero.moving = false;
  //handle left-right movement
  if( Key.isDown(Key.a) || Key.isDown(Key.LEFT) ){
    hero.x -= hero.speed;
    hero.moving = true;
  }else if(Key.isDown(Key.d) || Key.isDown(Key.RIGHT) ){
    hero.x += hero.speed;
    hero.moving = true;
  }

  //handle up-down movement
  if( Key.isDown(Key.w) || Key.isDown(Key.UP) ){
    hero.y -= hero.speed;
    hero.moving = true;
  }else if(Key.isDown(Key.s) || Key.isDown(Key.DOWN) ){
    hero.y += hero.speed;
    hero.moving = true;
  }

}

function draw(dt){
  //clear the screen by filling with a dark purple
  ctx.fillStyle = '#101';
  ctx.fillRect(0,0, c.width, c.height);

  //draw our hero
  ctx.fillStyle = hero.moving ? hero.moveColor : hero.color;
  ctx.fillRect(hero.x, hero.y, hero.width, hero.height);
}

Key = {

  _pressed: {},
  _released: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,
  a: 65,
  w: 87,
  s: 83,
  d: 68,
  z: 90,
  x: 88,
  f: 70,
  p: 80,
  r: 82,

  isDown(keyCode) {
      return this._pressed[keyCode];
  },

  justReleased(keyCode) {
      return this._released[keyCode];
  },

  onKeydown(event) {
      this._pressed[event.keyCode] = true;
  },

  onKeyup(event) {
      this._released[event.keyCode] = true;
      delete this._pressed[event.keyCode];

  },

  update() {
      this._released = {};
  }
};

init();
