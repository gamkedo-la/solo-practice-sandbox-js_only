var loadingScreen = true;

function drawLoadingScreen()
{
  gameCanvasContext.fillStyle = 'white';
  gameCanvasContext.font = '30px Helvetica';
  gameCanvasContext.fillText("Letter Bird", gameCanvas.width/2 - 50,gameCanvas.height/2 - 50);
  gameCanvasContext.fillText("Click to play", gameCanvas.width/2 - 50,gameCanvas.height/2 + 50);
}
