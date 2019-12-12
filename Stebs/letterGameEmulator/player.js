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
  } else if (playerShouldBePlayingJumper){
    drawJumperPlayer();
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
  } else if (playerShouldBePlayingJumper)
  {
    moveJumperPlayer();
  }
}
