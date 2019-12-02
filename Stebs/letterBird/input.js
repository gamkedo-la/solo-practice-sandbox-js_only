var rightArrowDown = false;
var leftArrowDown = false;

function keyDown(builtInDocumentEventObject)
{
  switch(builtInDocumentEventObject.keyCode)
  {
    case 32://spacebar fires
      flapUp();
      break;
    case 37://left arrow moves left
      leftArrowDown = true;
      break;
    case 39://right arrow moves right
      rightArrowDown = true;
      break;
  }
}

function keyUp(builtInDocumentEventObject)
{
  switch(builtInDocumentEventObject.keyCode)
  {
    case 37:
      leftArrowDown = false;
      break;
    case 39:
      rightArrowDown = false;
      break;
  }
}

function canvasClick()
{
  if (loadingScreen)
  {
    loadingScreen = false;
    setOrResetCorrectLetter();
    setInterval(update, 1000/30);
    setInterval(spawnALetter, 2500);
  }
}

function handleLeftAndRightArrows()
{
  if (leftArrowDown)
  {
    birdX -= birdSpeed;
  }
  if (rightArrowDown)
  {
    birdX += birdSpeed;
  }
}
