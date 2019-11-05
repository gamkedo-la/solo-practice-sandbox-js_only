function canvasClick()
{
  if (titleScreen)
  {
    titleScreen = false;
    setCorrectLetter();
    playCorrectLetterAudio();
  }
}

function keyPush(event)
{
    switch(event.keyCode)
    {
      case 37://left
      paddle.positionX -= 10;
      break;

      case 39://right
      paddle.positionX += 10;
      break;
    }
}
