// Sorted version evolved from CdL RTS

// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

const PLAYER_START_UNITS = 8;
var playerUnits = [];
var p1 = new leaderClass();

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
        document.getElementById("debugText").innerHTML = "Cursor: " + mousePos.x + "," + mousePos.y;
      } );

  canvas.addEventListener('click', function(evt) {
    var mousePos = calculateMousePos(evt);
    for(var i=0; i < PLAYER_START_UNITS; i++) {
      playerUnits[i].gotoNear(mousePos.x, mousePos.y);

    }
    document.getElementById("debugText").innerHTML = "Target: " + mousePos.x + "," + mousePos.y;
  });

  for(var i=0; i < PLAYER_START_UNITS; i++) {
    var spawnUnit = new unitClass();
    spawnUnit.reset();
    playerUnits.push(spawnUnit);
  }
  spawnReport();

  p1.reset();

  inputInit();
}

function spawnReport() {
  console.log("Unit x y dead")
  for(var i=0; i < PLAYER_START_UNITS; i++) {
    console.log(playerUnits[i].x + ' ' + playerUnits[i].y + ' ' + playerUnits[i].isDead);
  }
}

function moveEverything() {
  for(var i=0; i < playerUnits.length; i++) {
    playerUnits[i].move();

    // test if in sheepfold
    // simpler than isInBox() because pen is lowest part of screen and not yet distinguishing between blue, red, and middle.
    if(playerUnits[i].y > canvas.height - PEN_HEIGHT) {
      if(playerUnits[i].inPen == false) {
        console.log("Sheep id " + i + " is in the pen.")
        playerUnits[i].inPen = true;
      }
    }
  }
}

const PEN_HEIGHT = 400; //50;
const PEN_SIDE_GAP = 2;
const PEN_BASE_GAP = 2;
const PEN_INNER_GAP = 1; //100;
function drawEverything() {
  // clear the game view by filling with background color
  colorRect(0, 0, canvas.width, canvas.height, 'white');
  outlineRect(0, 0, canvas.width, canvas.height, 'black');

  outlineRect(PEN_SIDE_GAP, canvas.height-PEN_HEIGHT, canvas.width/2 - PEN_SIDE_GAP - PEN_INNER_GAP, PEN_HEIGHT-PEN_BASE_GAP, 'blue');
  outlineRect(canvas.width/2 + PEN_INNER_GAP, canvas.height-PEN_HEIGHT, canvas.width/2 - PEN_SIDE_GAP - PEN_INNER_GAP, PEN_HEIGHT-PEN_BASE_GAP, 'red');

  for(var i=0; i < playerUnits.length; i++) {
    playerUnits[i].draw();
  }

  p1.draw();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}