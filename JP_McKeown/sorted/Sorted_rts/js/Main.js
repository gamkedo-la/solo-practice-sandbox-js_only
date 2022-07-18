// Sorted (sheep herding) version evolved from CdL's book RTS
// target pens/sheepfolds will be at bottom of screen, temporarily bigger so can test by reaching them quicker.

// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

const PLAYER_START_UNITS = 20;
var playerUnits = [];
var p1 = new leaderClass();
var p2 = new leaderClass();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  canvasContext.font = "15px Arial";
  loadImages();
}

function imageLoadingDoneSoStartGame() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = calculateMousePos(evt);
    document.getElementById("debugText").innerHTML = "Cursor: " + mousePos.x + "," + mousePos.y;
  });
  
  canvas.addEventListener('click', function(evt) {
    var mousePos = calculateMousePos(evt);
    for(var i=0; i < PLAYER_START_UNITS; i++) {
      playerUnits[i].gotoNear(mousePos.x, mousePos.y);
      playerUnits[i].goal = true;
    }
    document.getElementById("debugText").innerHTML = "Target: " + mousePos.x + "," + mousePos.y;
  });

  for(var i=0; i < PLAYER_START_UNITS; i++) {
    var spawnUnit = new unitClass();
    spawnUnit.reset(i);
    playerUnits.push(spawnUnit);
  }
  // spawnReport();

  p1.reset();
  inputInit();

}

function spawnReport() {
  console.log("Unit id x,y dead")
  for(var i=0; i < PLAYER_START_UNITS; i++) {
    console.log(i, playerUnits[i].x + ',' + playerUnits[i].y, playerUnits[i].isDead);
  }
}

function moveEverything() {
  // all sheep move
  for(var i=0; i < playerUnits.length; i++) {

    var inPenPrev = playerUnits[i].ifInPen();
    playerUnits[i].move();

    var inPen = playerUnits[i].ifInPen();
    // var enteredPen = playerUnits[i].enteredPen;

    if(inPen && inPenPrev == false) {
      playerUnits[i].enteredPen = true;
      pennedSheep++;
      console.log("Sheep id " + i + " is in pen.");
    }
    else if(inPenPrev && inPen == false) {
      pennedSheep--;
    }
    // was bug with enteredPen if goes in and out
  }
  reportFold(i);

  // shepherds move
  p1.move();
}

function drawEverything() {
  // clear the game view by filling with background color
  colorRect(0, 0, canvas.width, canvas.height, '#A2E4B8');
  outlineRect(0, 0, canvas.width, canvas.height, 'black');

  // left-hand Pen
  outlineRect(PEN_SIDE_GAP, canvas.height-PEN_HEIGHT, canvas.width/2 - PEN_SIDE_GAP - PEN_INNER_GAP, PEN_HEIGHT - PEN_BASE_GAP, 'blue');

  // right-hand Pen
  outlineRect(canvas.width/2 + PEN_INNER_GAP, canvas.height-PEN_HEIGHT, canvas.width/2 - PEN_SIDE_GAP - PEN_INNER_GAP, PEN_HEIGHT-PEN_BASE_GAP, 'red');

  drawTiles();

  for(var i=0; i < playerUnits.length; i++) {
    playerUnits[i].draw();
    playerUnits[i].label();
  }
  // shepherd with Hat power
  p1.draw();

}