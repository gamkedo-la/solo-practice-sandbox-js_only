function initializeSpecificGameSettings()
{
  if (playerShouldBePlayingSnake)
  {
    //console.log('snake settings initialized');
    playerXCoordinate = snakeStartingX;
    playerYCoordinate = snakeStartingY;
    playerSpeedX = startingSnakeSpeedX;
    playerSpeedY = startingSnakeSpeedY;
    letterSpeed = snakeLetterSpeed;
    populateArrayOfLettersForSnake();
  } else if (playerShouldBePlayingBird)
  {
    console.log('bird settings initialized');
    playerXCoordinate = birdStartingX;
    playerYCoordinate = birdStartingY;
    playerSpeedX = birdSpeed;
    letterSpeed = birdLetterSpeed;
  }
}
