var shouldDrawTitleScreen = true;

function drawTitleScreen()
{
  gameCanvasContext.fillStyle = 'white';
  gameCanvasContext.font = '30px Helvetica';
  gameCanvasContext.fillText('Letter Platformer', gameCanvas.width/2 - 50, gameCanvas.height/2 - 30);
  gameCanvasContext.fillText('Click to Start', gameCanvas.width/2 - 50, gameCanvas.height/2 + 10);
}
