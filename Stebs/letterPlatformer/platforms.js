var arrayOfPlatforms = [];

for (let i = 1; i < 12; i+=2)
{
  arrayOfPlatforms.push({x:0,y:i*50})
}

function drawPlatforms()
{
  gameCanvasContext.fillStyle = 'blue';
  for (let platformsIndex = 0; platformsIndex < arrayOfPlatforms.length; platformsIndex++)
  {
    gameCanvasContext.fillRect(arrayOfPlatforms[platformsIndex].x,arrayOfPlatforms[platformsIndex].y,
                               gameCanvas.width,50)
  }
}
