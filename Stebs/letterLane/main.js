window.onload = function()
{
  gameCanvas = document.getElementById("gameCanvas");
  gameCanvasContext = gameCanvas.getContext('2d');

  statsCanvas = document.getElementById("statsCanvas");
  statsCanvasContext = statsCanvas.getContext('2d');

  drawBackground();
  drawLoadingScreen();

  document.addEventListener("keydown",keyDown);
  document.addEventListener('click', canvasClick, false);
}

function drawBackground()
{
  gameCanvasContext.fillStyle = 'black';
  gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
}

function update()
{
  moveEverything();
  handleDashArray();
  drawEverything();
  checkCarCollisionsWithLetters();
}


function moveEverything()
{
  moveYellowCenterDashes();
  moveLetters();
}

function drawEverything()
{
  drawGameBackground();
  drawCar();
  drawLetters();

  //debug
  //drawLetterColliders();
  //drawCorrectLetter();
  //drawCarCoordinates();
  //drawLetterCoordinates();

  //stats
  drawStatsBackground();
  drawStats();
}
