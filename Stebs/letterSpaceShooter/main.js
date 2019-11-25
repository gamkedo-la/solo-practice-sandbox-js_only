window.onload = function()
{
  gameCanvas = document.getElementById("gameCanvas");
  gameCanvasContext = gameCanvas.getContext('2d');

  statsCanvas = document.getElementById("statsCanvas");
  statsCanvasContext = statsCanvas.getContext('2d');

  drawBackground();
  drawLoadingScreen();

  document.addEventListener('keydown',keyPush);
  document.addEventListener('click', canvasClick, false);

  initializeCorrectLetterAudioTag();

}

function update()
{
  moveEverything();
  drawEverything();
}

function drawBackground()
{
  gameCanvasContext.fillStyle = 'black';
  gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
}

function moveEverything()
{
  moveShots();
  moveLetters();
  checkCollisionsForShotsWithLetters();
  checkForShotsOffRightSideOfScreen();
  checkForLettersOffLeftSideOfScreen();
}

function drawEverything()
{
  drawBackground();
  drawPlayer();
  drawShots();
  drawLetters();
  drawStatsBackground();
  drawStats();

  //debug

  //drawCurrentCorrectLetter();
  //drawLetterColliders();
}
