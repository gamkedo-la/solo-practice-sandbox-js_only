let titleScreen = true;

function drawTitleScreen()
{
  drawBackground();
  gameCanvasContext.fillStyle = 'green';
  gameCanvasContext.font = '30px Helvetica';
  gameCanvasContext.fillText("Letter Pass/Block", gameCanvas.width/2 - 50,gameCanvas.height/2 - 50);
  gameCanvasContext.fillText("Click to play", gameCanvas.width/2 - 50,gameCanvas.height/2 + 50);
}
