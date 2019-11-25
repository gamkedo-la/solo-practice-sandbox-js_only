function keyUp(builtInDocumentEventObject)
{

}

var leftArrowIsBeingHeld = false;
var rightArrowIsBeingHeld = false;
var downArrowIsBeingHeld = false;
var upArrowIsBeingHeld = false;

function keyDown(builtInDocumentEventObject)
{
  switch(builtInDocumentEventObject.keyCode)
  {
    case 37://left arrow
      leftArrowIsBeingHeld = true;
      break;
    case 38://up arrow
        playerYVelocity = -5;
        upArrowIsBeingHeld = true;
      break;
    case 39://right arrow
      rightArrowIsBeingHeld = true;
      break;
    case 40://down arrow
      if (!downArrowIsBeingHeld){
        playerYCoordinate += 100;
        if (playerYCoordinate > 600)//if the player goes below the screen
        {
          playerYCoordinate = 30;//put them at the top platform
        }
        downArrowIsBeingHeld = true;
      }
      break;
  }
}

function keyUp(builtInDocumentEventObject)
{
  switch(builtInDocumentEventObject.keyCode)
  {
    case 37://left arrow
      leftArrowIsBeingHeld = false;
      break;
    case 38://up arrow
      upArrowIsBeingHeld = false;
      break;
    case 39://right arrow
      rightArrowIsBeingHeld = false;
      break;
    case 40://down arrow
      downArrowIsBeingHeld = false;
      break;
  }
}

function canvasClick()
{
    //setOrResetCorrectLetter();
    setInterval(update, 1000/30);
    //setInterval(spawnALetter, 2000);
    correctLetterAudio = document.getElementById('correctLetter');
    setCorrectLetter();
}
