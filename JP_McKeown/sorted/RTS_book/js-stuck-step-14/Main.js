// My 2022 attempt to follow CdL RTS book steps

// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;
const FIELD_COLOR = "white";

var lassoX1 = 0;
var lassoY1 = 0;
var lassoX2 = 0;
var lassoY2 = 0;

const PLAYER_START_UNITS = 20;
const ENEMY_START_UNITS = 15;
var playerUnits = [];
var enemyUnits = [];

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
  
  canvas.addEventListener('mousedown', function(evt) {
        var mousePos = calculateMousePos(evt);
        lassoX1 = mousePos.x;
        lassoY1 = mousePos.y;
        lassoX2 = lassoX1;
        lassoY2 = lassoY1;
        isMouseDragging = true;
      } );

  canvas.addEventListener('mouseup', function(evt) {
    isMouseDragging = false;
    
    if( mouseMovedEnoughToTreatAsDrag() ) {
      selectedUnits = []; // clear the selection array

      for(var i=0;i<playerUnits.length;i++) { 
        if( playerUnits[i].isInBox(lassoX1,lassoY1,lassoX2,lassoY2) ) { 
          selectedUnits.push(playerUnits[i]);
        }
      } 
      document.getElementById("debugText").innerHTML = "Selected " + selectedUnits.length + " units";

    } else { // mouse didnt move far; treat as click

      var mousePos = calculateMousePos(evt);
      var clickedUnit = getUnitUnderMouse(mousePos);

      // enemy?
      if(clickedUnit != null && clickedUnit.playerControlled == false) {
        // if click near any enemy, treat as attack command
        document.getElementById("debugText").innerHTML = "Player commnds " + selectedUnits.length + " units to attack!";
      } else {

        // for(var i=0; i<ENEMY_START_UNITS; i++) {
        var unitsAlongSide = Math.floor(Math.sqrt(selectedUnits.length+2));
        for(var i=0; i<selectedUnits.length; i++) {
          selectedUnits[i].gotoNear(mousePos.x, mousePos.y, i, unitsAlongSide);
        }
        document.getElementById("debugText").innerHTML = "Moving to (" + mousePos.x + ", " + mousePos.y + ")";
       // }
      }
    }
  } );
  
  for(var i=0;i<PLAYER_START_UNITS;i++) {
    var spawnUnit = new unitClass();
    spawnUnit.reset();
    spawnUnit.assignTeam(true);
    playerUnits.push(spawnUnit);
  }
  for(var i=0; i<ENEMY_START_UNITS; i++) {
    var spawnUnit = new unitClass();
    spawnUnit.reset();
    spawnUnit.assignTeam(false);
    enemyUnits.push(spawnUnit);
  }
}

function moveEverything() {
  for(var i=0;i<playerUnits.length;i++) {
    playerUnits[i].move();
  }
  for(var i=0;i<enemyUnits.length;i++) {
    enemyUnits[i].move();
  }
}

function drawEverything() {
  // clear the game view by filling it with black
  colorRect(0, 0, canvas.width, canvas.height, FIELD_COLOR);

  coloredOutlineRectCornerToCorner(0, 0, canvas.width, canvas.height, 'black')
  
  for(var i=0;i<playerUnits.length;i++) {
    playerUnits[i].draw();
  }
  for(var i=0;i<enemyUnits.length;i++) {
    enemyUnits[i].draw();
  }
  
  for(var i=0;i<selectedUnits.length;i++) { ////
    selectedUnits[i].drawSelectionBox(); ////
  } ////
  
  if(isMouseDragging) {
    coloredOutlineRectCornerToCorner(lassoX1,lassoY1, lassoX2,lassoY2, 'yellow');
  }
}