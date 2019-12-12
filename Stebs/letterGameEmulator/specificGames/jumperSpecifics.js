var jumperStartingXCoordinate = Math.random() * 640;
var jumperStartingYCoordinate = (Math.floor(Math.random() * 7) * 100) + 30;

var playerYVelocity = 0;

var jumperFrameRate = 1000/30;

var jumperLetterColor = 'red';

var jumperBackButtonRectangleColor = 'yellow';
var jumperBackButtonTextColor = 'green';

function drawJumperBackground()
{
  gameCanvasContext.fillStyle = 'black';
  gameCanvasContext.fillRect(0,0, 640,700);
}

var arrayOfJumperPlatforms = [];

for (let i = 1; i < 14; i+=2)
{
  arrayOfJumperPlatforms.push({x:0,y:i*50})
}

function drawJumperPlatforms()
{
  gameCanvasContext.fillStyle = 'blue';
  for (let platformsIndex = 0; platformsIndex < arrayOfJumperPlatforms.length; platformsIndex++)
  {
    gameCanvasContext.fillRect(arrayOfJumperPlatforms[platformsIndex].x,arrayOfJumperPlatforms[platformsIndex].y,
                               gameCanvas.width,50)
  }
}


function drawJumperPlayer()
{
  gameCanvasContext.fillStyle = 'white';
  gameCanvasContext.fillRect(playerXCoordinate,playerYCoordinate, 20,20);
}

function moveJumperPlayer()
{
      if (!upArrowIsBeingHeld && playerYCoordinate !== 30 && playerYCoordinate !== 130 && playerYCoordinate !== 230
      && playerYCoordinate !== 330 && playerYCoordinate !== 430 && playerYCoordinate !== 530 && playerYCoordinate !== 630)
      {
        playerYCoordinate += 5;
      }

      if (leftArrowIsBeingHeld)
      {
        playerXCoordinate -= 3;
        if (playerXCoordinate < -10)//if the player goes off the left side of the screen
        {
          playerXCoordinate = 635;//put them on the right side
        }
      }
      if (upArrowIsBeingHeld)
      {
        playerYCoordinate -= 5;
      }
      if (rightArrowIsBeingHeld)
      {
        playerXCoordinate += 3;
        if (playerXCoordinate > 635)//if the player goes off the right side of the screen
        {
            playerXCoordinate = -5;//put them on the left side of the screen
        }
      }
      if (downArrowIsBeingHeld)
      {

      }
}

function initializeLettersForJumper()
{
  arrayOfLetters = [];
  arrayOfLetters.push({name:'m',
                       xCoordinate:Math.random()*640,
                       yCoordinate:Math.floor(Math.random() * 6 ) * 100 + 30/*font size*/ + 20/*offset for fillText*/});
  arrayOfLetters.push({name:'n',
                       xCoordinate:Math.random()*640,
                       yCoordinate:Math.floor(Math.random() * 6 ) * 100 + 30/*font size*/ + 20/*offset for fillText*/});
}
