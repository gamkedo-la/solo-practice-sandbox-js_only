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
  } else if (playerShouldBePlayingLane) {
    drawCarPlayer();
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
