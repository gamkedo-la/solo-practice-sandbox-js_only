function initializeSpecificGameSettings()
{
  if (playerShouldBePlayingSnake)
  {
    playerXCoordinate = snakeStartingX;
    playerYCoordinate = snakeStartingY;
    playerSpeedX = startingSnakeSpeedX;
    playerSpeedY = startingSnakeSpeedY;
    letterSpeed = snakeLetterSpeed;
    populateArrayOfLettersForSnake();
  } else if (playerShouldBePlayingBird)
  {
    playerXCoordinate = birdStartingX;
    playerYCoordinate = birdStartingY;
    playerSpeedX = birdSpeed;
    letterSpeed = birdLetterSpeed;
  }
}
