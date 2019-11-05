var gameCanvas;
var gameCanvasContext;

var firstLetterAudio = false;

window.onload = function()
{
  gameCanvas = document.getElementById("letterPassOrBlock");
  gameCanvasContext = gameCanvas.getContext('2d');

  statsCanvas = document.getElementById('statsCanvas');
  statsDrawingContext = statsCanvas.getContext('2d');

  gameCanvas.addEventListener('click', canvasClick, false);//canvasClick is in input.js
  document.addEventListener("keydown",keyPush);//keyPush is in input.js  canvasDrawingContext = gameCanvas.getContext("2d");

  paddle = new Paddle;
  m = new letter('m');
  n = new letter('n');
  arrayOfLetters.push(m);
  arrayOfLetters.push(n);

  setInterval(gameLoop, 1000/30);
}

function gameLoop()
{
  updateEverything();
  drawEverything();
}

function drawEverything()
{
  if (titleScreen)
  {
    drawTitleScreen();
  } else
  {
    drawBackground();
    paddle.draw();
    drawLetters();
    drawStatsBackground();
    drawStats();
  }
}

function drawBackground()
{
  gameCanvasContext.fillStyle = 'black';
  gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
}

function updateEverything()
{
  moveLetters();
  handlePaddlePasses();
  handlePaddleCollisions();
  handleOffTopSideOfScreen();
  handleEmptyArrayOfLetters();
}
