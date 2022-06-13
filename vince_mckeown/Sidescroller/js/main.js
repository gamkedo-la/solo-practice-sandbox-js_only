var canvas, canvasContext;
var player = new playerClass();
var levelNow = 0;
  
window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  initInput();
  
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
      timeingRequirements();
    }, 1000/framesPerSecond);
  
  // Add the enemy here
  for(var i = 0; i < worldGrid_1.length; i++){
    if(worldGrid_1[i] == TILE_SLIME){
      addSlime();
    } 
    if(worldGrid_1[i] == TILE_GOBLIN){
      addGoblin();
    } 
    if(worldGrid_1[i] == TILE_KOBALD){
      addKobald();
    } 
  }

  // Initiate the enemy here
  for(var i = 0; i < slimeList.length; i++) {
    slimeList[i].reset();
  }

  for(var i = 0; i < kobaldList.length; i++) {
    kobaldList[i].reset();
  }

  for(var i = 0; i < goblinList.length; i++) {
    goblinList[i].reset();
  }
  
  player.reset();
  loadImages();
}

function moveEverything() {
  for(var i = 0; i < slimeList.length; i++) {
    slimeList[i].move();
  }
  for(var i = 0; i < goblinList.length; i++) {
    goblinList[i].move();
  }
  for(var i = 0; i < kobaldList.length; i++) {
    kobaldList[i].move();
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

    for(var i = 0; i < goblinList.length; i++) {
      goblinList[i].draw();
    }
    
    for(var i = 0; i < kobaldList.length; i++) {
      kobaldList[i].draw();
    }
    for(var i = 0; i < slimeList.length; i++) {
      slimeList[i].draw();
    }

    player.draw();
  finishedCameraPan();
  colorText("Health: " + player.health, 20, 20, 'white');
}

function timeingRequirements(){
  player.invulnerableTiming();
} 

