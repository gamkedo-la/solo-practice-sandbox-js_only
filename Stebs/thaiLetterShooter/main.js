window.onload = function()
{
  gameCanvas = document.getElementById("letterShooterCanvas");
  gameCanvas.addEventListener('click', canvasClick, false);//canvasClick is in input.js
  canvasDrawingContext = gameCanvas.getContext("2d");
  statsCanvas = document.getElementById("statsCanvas");
  statsDrawingContext = statsCanvas.getContext("2d");
  controlsCanvas = document.getElementById("controlsCanvas");
  controlsCanvasContext = controlsCanvas.getContext('2d');
  document.addEventListener("keydown",keyPush);//keyPush is in input.js
  setInterval(gameLoop, 1000/15);
}

var player = new Player();

var tileCount = 9;

var arrayOfGameBoardLetterPositions = [0,1,2];
var cat = new cVc('บ','า','น');
cat.assignLetterPositions();
cat.defineCollisionRanges();

var amountCorrect = 0;
var amountIncorrect = 0;
var accuracy = 0;

var playerShouldBeTargetingFirstLetter = true;
var playerShouldBeTargetingSecondLetter = false;
var playerShouldBeTargetingThirdLetter = false;

function gameLoop()
{
  updateEverything();
  drawEverything();
}

function drawBackground()
{
    canvasDrawingContext.fillStyle='black';
    canvasDrawingContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
}

function drawControlsCanvas()
{
  controlsCanvasContext.fillStyle = 'blue';
  controlsCanvasContext.fillRect(0,0, controlsCanvas.width,controlsCanvas.height);

  controlsCanvasContext.fillStyle = 'black';
  controlsCanvasContext.font = '18px Helvetica';
  controlsCanvasContext.fillText("Left/Right Arrows to move left/right", 0,30);
  controlsCanvasContext.fillText("Spacebar or Left Mouse Button to fire a bullet", 0,controlsCanvas.height/2);
  controlsCanvasContext.fillText("R to repeat word audio", 0,controlsCanvas.height - 30);
}

function updateEverything()
{
  moveBullets();
  handleBulletCollisionsWithLetters();
}

function drawEverything()
{
  if (titleScreen)
  {
    drawTitleScreen();
  } else
  {
    drawBackground();
    player.draw();
    cat.draw();
    drawBullets();
    drawStatsBackground();
    drawStats();
    drawControlsCanvas();
  }

}
