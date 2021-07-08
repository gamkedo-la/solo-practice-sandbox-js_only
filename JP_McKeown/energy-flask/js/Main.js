window.onload = function() {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  div = document.getElementById('canvas-container')
  div.appendChild(canvas);
  canvas.width = VIEW_WIDTH;
  canvas.height = GAME_HEIGHT;

  var ballLife = BALL_INIT_LIFE;
  createEveryBall();
  createEveryShield();

  // gameBegun doesnt work, only passes here once 
  // so making it true with keypress has no effect.
  // if(gameBegun) {
    let framesPerSecond = 30;
    setInterval(
      function() {
        if(ballLife > 0) {
          moveAll();
          ballLife--;
        } else {
          showMenu = true;
        }
        drawAll();
      }, 1000/framesPerSecond
    );

  // drawRect(0, 0, canvas.width, canvas.height, 'black');
  // drawText('Nano Flask', 200, 200, 'white', '30px Arial');
  // initializeInput();
  // loadImages();
  // menu.initialize();

  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = calculateMousePos(evt);
    col = xToCol(mousePos.x);
    row = yToRow(mousePos.y);
    document.getElementById("debugText").innerHTML = "Tile "+col+","+row+"  Pixel "+mousePos.x+","+mousePos.y;
  } ); 

  initInput();
};

function createEveryBall() {
  for( var i=0;i<BALL_COUNT;i++) {
    ballList.push(new ballClass());
  }
}

function moveAll() {
  if(showMenu) {
    return;
  }
  for(var i=0;i<ballList.length;i++) {
      ballList[i].move();
  }    
}

function drawAll() {
  drawWorld();
  drawFillRect(GAME_WIDTH,0,UI_WIDTH,GAME_HEIGHT,'black');
  drawMoney();
  showEnergy();

  for(var i=0;i<shieldList.length;i++) {
    shieldList[i].drawStrength();
  }
  for(var i=0;i<ballList.length;i++) {
    ballList[i].draw();
  }
  if(ballLife < 1 || editMode) {
    writeEveryStrength();
  }
  if(showMenu) {
    drawText('Keys to press:', GAME_WIDTH+40, 100, 'white', '18px Verdana');
    drawText('spacebar = begin', GAME_WIDTH+40, 150, 'white', '18px Verdana');
    drawText('t = topup shields', GAME_WIDTH+40, 200, 'white', '18px Verdana');
  }
}

function writeEveryStrength() {
  for(var i=0; i<shieldList.length; i++) {
    shieldList[i].writeStrength();
  }
}

initializeInput = function() {
}
loadImages = function() {
}