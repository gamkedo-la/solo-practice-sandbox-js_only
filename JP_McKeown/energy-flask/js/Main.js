window.onload = function() {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  div = document.getElementById('canvas-container')
  div.appendChild(canvas);
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;

  let framesPerSecond = 30;
  setInterval(function() {
      moveAll();
      drawAll();
    }, 1000/framesPerSecond);

  createEveryBall();

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
};

function createEveryBall() {
  for( var i=0;i<BALL_COUNT;i++) {
    ballList.push(new ballClass());
  }
}

function moveAll() {
  for(var i=0;i<ballList.length;i++) {
      ballList[i].move();
  }    
}

function drawAll() {
  drawWorld();
  // drawFlask();
  for(var i=0;i<ballList.length;i++) {
      ballList[i].draw();
  }
}

initializeInput = function() {
}
loadImages = function() {
}