var playerX = 100;
var playerY = 100;
var playerDimensionX = 30;
var playerDimensionY = 30;
var playerSpeed = 15;

function drawPlayer()
{
  gameCanvasContext.fillStyle = 'white';
  gameCanvasContext.fillRect(playerX-playerDimensionX/2,playerY-playerDimensionY/2,
    playerDimensionX,playerDimensionY);
}
