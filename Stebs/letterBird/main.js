window.onload = function()
{
  gameCanvas = document.getElementById("gameCanvas");
  gameCanvasContext = gameCanvas.getContext('2d');

  statsCanvas = document.getElementById("statsCanvas");
  statsCanvasContext = statsCanvas.getContext('2d');

  drawBackground();
  drawLoadingScreen();

  document.addEventListener('keydown',keyDown);
  document.addEventListener('keyup',keyUp);
  document.addEventListener('click', canvasClick, false);

  initializeCorrectLetterAudioTag();
}

function drawBackground()
{
  gameCanvasContext.fillStyle = 'cyan';
  gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
}

function update()
{
  moveEverything();
  drawEverything();
  checkForLettersOffLeftSideOfScreen();
  checkCollisionsOfBirdWithLetters();
  handleBirdOffScreenPossibilities();
}

function moveEverything()
{
  moveBird();
  moveLetters();
}

function drawEverything()
{
  drawBackground();
  drawBird();
  drawLetters();

  drawStatsBackground();
  drawStats();

  // drawCurrentCorrectLetter();
  // drawLetterColliders();
}
