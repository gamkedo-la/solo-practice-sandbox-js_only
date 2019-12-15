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
  } else if (playerShouldBePlayingLane)
  {
    playerXCoordinate = laneStartingX;
    playerYCoordinate = laneStartingY;
    letterSpeed = laneLetterSpeed;
  } else if (playerShouldBePlayingJumper)
  {
    playerXCoordinate = jumperStartingXCoordinate;
    playerYCoordinate = jumperStartingYCoordinate;
  } else if (playerShouldBePlayingSpaceShooter)
  {
    playerXCoordinate = spaceShooterStartingXCoordinate;
    playerYCoordinate = spaceShooterStartingYCoordinate;
  }
}
