var playerShouldSeeDualPurposeLoadingSplashScreen = true;

function drawDualPurposeLoadingSplashScreen()
{
  gameCanvasContext.fillStyle = 'lime';
  gameCanvasContext.font = '30px Helvetica';
  gameCanvasContext.fillText("Dual Purpose Loading/Splash Screen", 0,50);
  gameCanvasContext.fillText("A loading screen loads files", 0,100);
  gameCanvasContext.fillText("A splash screen forces user ", 0,150);
  gameCanvasContext.fillText("interaction to unlock audio", 0,200);
}

function drawDoneLoadingMessage()
{
  gameCanvasContext.fillText("Downloading done. Click to start", 0,250);
}

function handleDualPurposeSplashAndLoadingSceneClick()
{
  playerShouldSeeDualPurposeLoadingSplashScreen = false;
  playerShouldSeeTitleScreen = true;
  //setInterval(updateGameFrame, frameRate);
  gameInterval.start();
}
