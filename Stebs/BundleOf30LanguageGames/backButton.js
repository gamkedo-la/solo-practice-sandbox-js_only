function drawBackButton()
{
  if (playerIsPlayingAnyGame)
  {
    //draw the rectangle
    if (playerShouldBePlayingBird){
      gameCanvasContext.fillStyle = birdBackButtonRectangleColor;
    } else if (playerShouldBePlayingSnake) {
      gameCanvasContext.fillStyle = snakeBackButtonRectangleColor;
    } else if (playerShouldBePlayingLane) {
      gameCanvasContext.fillStyle = laneBackButtonRectangleColor;
    } else if (playerShouldBePlayingJumper) {
      gameCanvasContext.fillStyle = jumperBackButtonRectangleColor;
    }
    gameCanvasContext.fillRect(540,650, 100,50);

    //draw the text
    if (playerShouldBePlayingBird){
      gameCanvasContext.fillStyle = birdBackButtonTextColor;
    } else if (playerShouldBePlayingSnake) {
      gameCanvasContext.fillStyle = snakeBackButtonTextColor;
    } else if (playerShouldBePlayingLane) {
      gameCanvasContext.fillStyle = laneBackButtonTextColor;
    } else if (playerShouldBePlayingJumper)
    {
      gameCanvasContext.fillStyle = jumperBackButtonTextColor;
    }
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
        playerShouldBePlayingLane = false;
        playerShouldBePlayingJumper = false;
        arrayOfLetters = [];
      }
}
