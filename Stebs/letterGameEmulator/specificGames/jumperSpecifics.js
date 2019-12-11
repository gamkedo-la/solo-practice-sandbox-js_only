var jumperStartingXCoordinate = Math.random() * 700;
var jumperStartingYCoordinate = (Math.floor(Math.random() * 6) * 100) + 30;

var playerYVelocity = 0;

function drawJumperBackground()
{
  gameCanvasContext.fillStyle = 'black';
  gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
}

function drawJumperPlayer()
{
  gameCanvasContext.fillStyle = 'white';
  gameCanvasContext.fillRect(playerXCoordinate,playerYCoordinate, 20,20);
}

function moveJumperPlayer()
{
      playerYCoordinate += 5;
      if (playerYCoordinate === 30 || playerYCoordinate === 130 || playerYCoordinate === 230
      || playerYCoordinate === 330 || playerYCoordinate === 430 || playerYCoordinate === 530 || playerYCoordinate === 630)
      {
        playerYVelocity -=5;
      }
  }
}
