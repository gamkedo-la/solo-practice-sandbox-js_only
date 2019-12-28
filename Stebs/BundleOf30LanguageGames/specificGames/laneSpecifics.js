var laneStartingX = 230;
var laneStartingY = 500;

var laneLetterSpawnRate = 2000;

var laneLetterSpeed = 3;

var laneLetterColor = 'red';

var laneBackButtonRectangleColor = 'Fuchsia';
var laneBackButtonTextColor = 'yellow';

var laneFrameRate = 1000/50;

function drawCarPlayer()
{
  console.log("inside drawCarPlayer");
  gameCanvasContext.fillStyle = 'blue';
  gameCanvasContext.fillRect(playerXCoordinate,playerYCoordinate, 30,60);
}

//background section
function drawLaneBackground()
{
  drawLaneGrass();
  drawLaneRoadAsphalt();
  drawLaneYellowCenterDashes();
}

function drawLaneGrass()
{
  gameCanvasContext.fillStyle = 'green';
  gameCanvasContext.fillRect(0,0, 640,700);
}

function drawLaneRoadAsphalt()
{
  gameCanvasContext.fillStyle = 'gray';
  gameCanvasContext.fillRect(140,0, 360,700);
}

var arrayOfYellowCenterDashes = [];
var dashHeight = 75;
var dashWidth = 15;

for (let dashIndex = -1; dashIndex < 7; dashIndex++)
{
  arrayOfYellowCenterDashes.push({x:320 - 7.5,y:dashIndex*100})
}

function drawLaneYellowCenterDashes()
{
  for (let dashIndex = 0; dashIndex < arrayOfYellowCenterDashes.length; dashIndex++)
  {
    gameCanvasContext.fillStyle = 'yellow';
    gameCanvasContext.fillRect(arrayOfYellowCenterDashes[dashIndex].x,arrayOfYellowCenterDashes[dashIndex].y,
                              dashWidth,dashHeight);
  }
}

function moveYellowCenterDashes()
{
  for (let dashIndex = 0; dashIndex < arrayOfYellowCenterDashes.length; dashIndex++)
  {
    arrayOfYellowCenterDashes[dashIndex].y += 3;
  }
}

function spawnANewDashIfAppropriate()
{
  if (arrayOfYellowCenterDashes[0].y > 0)
  {
    arrayOfYellowCenterDashes.unshift({x:320 - 7.5,y:-100});
  }
}

function deleteDashesOffBottomOfScreen()
{
  if (arrayOfYellowCenterDashes[arrayOfYellowCenterDashes.length - 1].y > 700)
  {
    arrayOfYellowCenterDashes.splice(arrayOfYellowCenterDashes.length - 1,1);
  }
}

function handleDashArrayPopulation()
{
  spawnANewDashIfAppropriate();
  deleteDashesOffBottomOfScreen();
}
//end of background section
