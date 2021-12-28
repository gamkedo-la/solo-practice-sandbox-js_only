let canvas, canvasContext; // save the canvas for dimensions, and its 2d context for drawing to it

const PLAYER_START_UNITS = 20;
let playerUnits = []; // declaring an array
const ENEMY_START_UNITS = 15;
let enemyUnits = [];

window.onload = function(){
  // window.onload gets run automatically when the page finishes loading
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  // these next lines set up our game logic and render to happen 30 times per second
  let framesPerSecond = 30;
  setInterval(function(){
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

  canvas.addEventListener("mousemove", mousemoveHandler);

  canvas.addEventListener("mousedown", mousedownHandler);

  canvas.addEventListener("mouseup", mouseupHandler);

  for(let i = 0; i < PLAYER_START_UNITS; i++){
    let spawnUnit = new unitClass();
    spawnUnit.resetAndSetPlayerTeam(true);
    playerUnits.push(spawnUnit);
  }
  for(let i = 0; i < ENEMY_START_UNITS; i++){
    let spawnUnit = new unitClass();
    spawnUnit.resetAndSetPlayerTeam(false);
    enemyUnits.push(spawnUnit);
  }
}

function moveEverything(){
  for(let i = 0; i < playerUnits.length; i++){
    playerUnits[i].move();
  }
  for(let i = 0; i < enemyUnits.length; i++){
    enemyUnits[i].move();
  }
}

function drawEverything() { 
  colorRect(0, 0, canvas.width, canvas.height, "#000000"); // clear the game view by filling it with black

  for(let i = 0; i < playerUnits.length; i++){
    playerUnits[i].draw();
  }

  for(let i = 0; i < enemyUnits.length; i++){
    enemyUnits[i].draw();
  }

  for(let i = 0; i < selectedUnits.length; i++){
    selectedUnits[i].drawSelectionBox();
  }

  if(isMouseDragging) {
    coloredOutlineRectCornerToCorner(lassoX1, lassoY1, lassoX2, lassoY2, 'yellow');
  }
}