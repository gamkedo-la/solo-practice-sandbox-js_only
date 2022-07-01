// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;
var rightClicked = false;
const FIELD_COLOR = "#CCFF99";
const DRAG_COLOR = "gray";

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
    
  canvas.addEventListener('mousemove', mousemoveHandler);
  canvas.addEventListener('mousedown', mousedownHandler);
  canvas.addEventListener('mouseup', mouseupHandler);

  canvas.addEventListener('contextmenu', rightclickHandler);

  populateTeam(playerUnits,PLAYER_START_UNITS,true);
  populateTeam(enemyUnits,ENEMY_START_UNITS,false);
}

function moveEverything() {
  for(var i=0;i<allUnits.length;i++) {
    allUnits[i].move();
  }
  
  removeDeadUnits(); ////
  checkVictory();  
}

function drawEverything() {
  // clear the game view by filling with colour
  colorRect(0, 0, canvas.width, canvas.height, FIELD_COLOR);
  colorOutlineRectCornerToCorner(0, 0, canvas.width, canvas.height, "black");

  for(var i=0;i<allUnits.length;i++) {
    allUnits[i].draw();
    allUnits[i].drawID(i);
    if(allUnits[i].myTarget != null) {
      allUnits[i].drawLineToTarget();
    }
  }

  for(var i=0;i<selectedUnits.length;i++) {
    selectedUnits[i].drawSelectionBox();
    selectedUnits[i].drawHealthBar();
  }
  
  if(isMouseDragging) {
    colorOutlineRectCornerToCorner(lassoX1,lassoY1, lassoX2,lassoY2, DRAG_COLOR);
  }
}