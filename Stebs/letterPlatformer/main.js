window.onload = function()
{
  gameCanvas = document.getElementById("gameCanvas");
  gameCanvasContext = gameCanvas.getContext('2d');

  statsCanvas = document.getElementById("statsCanvas");
  statsCanvasContext = statsCanvas.getContext('2d');

  drawBackground();
  drawTitleScreen();

  document.addEventListener("keydown",keyDown);
  document.addEventListener("keyup",keyUp);
  document.addEventListener('click', canvasClick, false);
}

function update()
{
  moveEverything();
  drawEverything();
  checkForPlayerCollisionsWithLetters();
}

function drawEverything()
{
  drawBackground();
  drawPlatforms();
  drawPlayer();
  drawPlayerXYCoordinates();
  drawLetters();
  drawLetterColliders();
  drawStats();
}

function drawBackground()
{
  gameCanvasContext.fillStyle = 'black';
  gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
}

function moveEverything()
{
  movePlayer();
}
