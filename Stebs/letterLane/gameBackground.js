function drawGameBackground()
{
  drawGrass();
  drawRoadAsphalt();
  drawYellowCenterDashes();
}

function drawGrass()
{
  gameCanvasContext.fillStyle = 'green';
  gameCanvasContext.fillRect(0,0, 800,600);
}

function drawRoadAsphalt()
{
  gameCanvasContext.fillStyle = 'gray';
  gameCanvasContext.fillRect(400 - 150,0, 300,600);
}

var arrayOfYellowCenterDashes = [];
var dashHeight = 75;
var dashWidth = 15;

for (let dashIndex = -1; dashIndex < 6; dashIndex++)
{
  arrayOfYellowCenterDashes.push({x:400 - 7.5,y:dashIndex*100})
}

function drawYellowCenterDashes()
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
    arrayOfYellowCenterDashes.unshift({x:400 - 7.5,y:-100});
  }
}

function deleteDashesOffBottomOfScreen()
{
  if (arrayOfYellowCenterDashes[arrayOfYellowCenterDashes.length - 1].y > 600)
  {
    arrayOfYellowCenterDashes.splice(arrayOfYellowCenterDashes.length - 1,1);
  }
}

function handleDashArray()
{
  spawnANewDashIfAppropriate();
  deleteDashesOffBottomOfScreen();
}
