// My 2022 attempt to follow CdL RTS book steps

// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;
const FIELD_COLOR = "white";

var lassoX1 = 0;
var lassoY1 = 0;
var lassoX2 = 0;
var lassoY2 = 0;
var isMouseDragging = false;
const MIN_DIST_TO_COUNT_DRAG = UNIT_PLACEHOLDER_RADIUS *2;
const MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE = 12;

const PLAYER_START_UNITS = 20;
const ENEMY_START_UNITS = 15;
var playerUnits = [];
var enemyUnits = [];
var selectedUnits = []; ////

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect(), root = document.documentElement;

  // account for the margins, canvas position on page, scroll amount, etc.
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}
function mouseMovedEnoughToTreatAsDrag() {
  var deltaX = lassoX1 - lassoX2;
  var deltaY = lassoY1 - lassoY2;
  var dragDist = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
  return (dragDist > MIN_DIST_TO_COUNT_DRAG);
}

function getUnitUnderMouse(currentMousePos) {
  var closestDistanceFoundToMouse = MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE;
  var closestUnit = null;  // none found yet

  for(var i = 0; playerUnits.length; i++) {
    var pDist = playerUnits[i].distFrom(currentMousePos.x, currentMousePos.y);
    if(pDist < closestDistanceFoundToMouse) {
      closestUnit = playerUnits[i];
      closestDistanceFoundToMouse = pDist;
    }
  }
  for(var i = 0; enemyUnits.length; i++) {
    var eDist = enemyUnits[i].distFrom(currentMousePos.x, currentMousePos.y);
    if(eDist < closestDistanceFoundToMouse) {
      closestUnit = enemyUnits[i];
      closestDistanceFoundToMouse = eDist;
    }
  }
  return closestUnit;
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
    
  canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calculateMousePos(evt);
        //// removed debug line from here
        if(isMouseDragging) {
          lassoX2 = mousePos.x;
          lassoY2 = mousePos.y;
        }
      } );
  
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

      // if click near any enemy, treat as attack command
      for(var i=0; i<ENEMY_START_UNITS; i++) {

      }

      var unitsAlongSide = Math.floor(Math.sqrt(selectedUnits.length+2));
      for(var i=0; i<selectedUnits.length; i++) {
        selectedUnits[i].gotoNear(mousePos.x, mousePos.y, i, unitsAlongSide);
      }
      document.getElementById("debugText").innerHTML = "Moving to (" + mousePos.x + ", " + mousePos.y + ")";
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