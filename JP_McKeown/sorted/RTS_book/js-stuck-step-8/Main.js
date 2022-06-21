// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

const PLAYER_START_UNITS = 8;
var playerUnits = [];
var selectedUnits = [];

var lassoX1 = 0;
var lassoY1 = 0;
var lassoX2 = 0;
var lassoY2 = 0;
var isMouseDragging = false;

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
        if(isMouseDragging) {
          lassoX2 = mousePos.x;
          lassoY2 = mousePos.y;
          document.getElementById("debugText").innerHTML = "Lasso2: " + lassoX2 + "," + lassoY2;
        }
      } );

  canvas.addEventListener('mousedown', function(evt) {
    var mousePos = calculateMousePos(evt);
    lassoX1 = mousePos.x;
    lassoY1 = mousePos.y;
    lassoX2 = lassoX1;
    lassoY2 = lassoY1;
    isMouseDragging = true;
    document.getElementById("debugText").innerHTML = "Selector: topleft(" + lassoX1 + "," + lassoY1 + ")";
  });

  canvas.addEventListener('mouseup', function(evt) {
    var mousePos = calculateMousePos(evt);
    isMouseDragging = false;

    selectedUnits = []; // clear the array

    for(var i=0; i < playerUnits.length; i++) {
      if(playerUnits[i].isInsideBox(lassoX1, lassoY1, lassoX2, lassoY2)) {
        selectedUnits.push(playerUnits[i]);

        console.log(i);
      }
    }
    document.getElementById("debugText").innerHTML = "Selected: " + selectedUnits.length + " units";
  });

  for(var i=0; i < PLAYER_START_UNITS; i++) {
    var spawnUnit = new unitClass();
    spawnUnit.reset();
    playerUnits.push(spawnUnit);
  }
  spawnReport();
}

function spawnReport() {
  console.log("Initial units: x y dead")
  for(var i=0; i < PLAYER_START_UNITS; i++) {
    console.log(playerUnits[i].x + ' ' + playerUnits[i].y + ' ' + playerUnits[i].isDead);
  }
}

function moveEverything() {
  for(var i=0; i < playerUnits.length; i++) {
    playerUnits[i].move();
  }
}

function drawEverything() {
  // clear the game view by filling it with black
  colorRect(0, 0, canvas.width, canvas.height, 'white');

  for(var i=0; i < playerUnits.length; i++) {
    playerUnits[i].draw();
  }
  for(var i=0; i < playerUnits.length; i++) {
    playerUnits[i].drawSelectionBox();
  }

  if(isMouseDragging) {
    coloredOutlineRectCornerToCorner(lassoX1,lassoY1,lassoX2, lassoY2, 'green');
  }
}

  // canvas.addEventListener('click', function(evt) {
  //   var mousePos = calculateMousePos(evt);
  //   for(var i=0; i < PLAYER_START_UNITS; i++) {
  //     playerUnits[i].gotoNear(mousePos.x, mousePos.y);

  //   }
  //   document.getElementById("debugText").innerHTML = "Target: " + mousePos.x + "," + mousePos.y;
  // });