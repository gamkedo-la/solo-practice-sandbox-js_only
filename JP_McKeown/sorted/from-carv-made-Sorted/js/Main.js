var canvas, canvasContext;

var blueCar = new carClass(1);
var greenCar = new carClass(2);

const NUM_SHEEP = 12;
var sheepList = [];

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
  colorRect(0,0, canvas.width,canvas.height, "red");
  colorText("Loading Images", 0,0, "white");
	loadImages();
}

function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

  canvasContext.font = "15px Arial";
	setupInput();

  if(gameState == STATE_PLAY) {
    loadLevel(level_1);
  } else if(gameState == STATE_EDIT) {
    loadLevel(level_1_goalNear);
  }
  checkTilesFitCanvas();

  for(var i=0; i<NUM_SHEEP; i++) {
    var spawnSheep = new sheepClass();
    spawnSheep.init(i);
    sheepList.push(spawnSheep);
  }
  ui_countPenned();
}

function loadLevel(whichLevel) {
  trackGrid = whichLevel.slice();
  blueCar.reset(blueCarPic, "The sizzling blue storm");
	greenCar.reset(greenCarPic, "The mean green machine");
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	blueCar.move();
	greenCar.move();
  for(var i=0; i<NUM_SHEEP; i++) {
    sheepList[i].move();
  }
}

function drawAll() {
	drawTracks();
	blueCar.draw();
	greenCar.draw();
  for(var i=0; i<NUM_SHEEP; i++) {
    sheepList[i].draw();
    if(gameState == STATE_EDIT) {
      sheepList[i].label();
    }
  }
} 