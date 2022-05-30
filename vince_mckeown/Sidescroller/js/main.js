var canvas, canvasContext;
var player = new playerClass();
  
window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  initInput();
  
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
  
  for(var i = 0; i < worldGrid.length; i++){
    if(worldGrid[i] == TILE_SLIME){
        addSlime();
      } 
    }

  for(var i = 0; i < slimeList.length; i++) {
    slimeList[i].reset();
  }
  
  player.reset();
  loadImages();
}

function moveEverything() {
  for(var i = 0; i < slimeList.length; i++) {
    slimeList[i].move();
  }
  player.move();
  updatedCameraPosition();
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  drawBackGround();
  shiftForCameraPan();
    drawMiddleGround();
    drawBricks();
    for(var i = 0; i < slimeList.length; i++) {
      slimeList[i].draw();
    }
    player.draw();
  finishedCameraPan();
}