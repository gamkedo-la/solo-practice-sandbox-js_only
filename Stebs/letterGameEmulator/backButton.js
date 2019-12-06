function drawBackButton()
{
  if (playerShouldBePlayingBird)
  {
    gameCanvasContext.fillStyle = birdBackButtonRectangleColor;
    gameCanvasContext.fillRect(540,650, 100,50);

    gameCanvasContext.fillStyle = birdBackButtonTextColor;
    gameCanvasContext.font = '27px Helvetica';
    gameCanvasContext.fillText('Back', 560,685);
  } else if (playerShouldBePlayingSnake)
  {
    gameCanvasContext.fillStyle = birdBackButtonRectangleColor;
    gameCanvasContext.fillRect(540,650, 100,50);

    gameCanvasContext.fillStyle = birdBackButtonTextColor;
    gameCanvasContext.font = '27px Helvetica';
    gameCanvasContext.fillText('Back', 560,685);
  }
}

function handleBackButtonClick()
{
  if (mouseCoordinates.mouseX > 540 && mouseCoordinates.mouseX < 640 &&
      mouseCoordinates.mouseY > 650 && mouseCoordinates.mouseY < 700)
      {
        playerShouldSeeTitleScreen = true;
        playerIsPlayingAnyGame = false;
        playerShouldBePlayingBird = false;
        playerShouldBePlayingSnake = false;
        arrayOfLetters = [];
      }
}
