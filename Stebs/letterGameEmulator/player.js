var playerXCoordinate = undefined;
var playerYCoordinate = undefined;

var playerXSpeed = undefined;
var playerYSpeed = undefined;

function drawGameSpecificPlayer()
{
  if (playerShouldBePlayingSnake)
  {
    drawSnakePlayer();
  } else if (playerShouldBePlayingBird) {
    drawBirdPlayer();
  }
}

function moveGameSpecificPlayer()
{
  if (playerShouldBePlayingSnake)
  {
    moveSnakePlayer();
  } else if (playerShouldBePlayingBird)
  {
    moveBirdPlayer();
  }
}
