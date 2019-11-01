function keyPush(event)
{
  switch(event.keyCode)
  {
    case 37://left
    snake.xVelocity = -1; snake.yVelocity = 0;
    break;

    case 38://up
    snake.xVelocity = 0; snake.yVelocity = -1;
    break;

    case 39://right
    snake.xVelocity = 1; snake.yVelocity = 0;
    break;

    case 40://down
    snake.xVelocity = 0; snake.yVelocity = 1;
    break;

    case 82://repeat correct letter
    for (let i = 0; i < arrayOfLetters.length; i++)
    {
      if (arrayOfLetters[i].correctAnswer)
      {
        arrayOfLetters[i].audio.play();
      }
    }
  }
}

function canvasClick()
{
  titleScreen = false;
  for (let i = 0; i < arrayOfLetters.length; i++)
  {
    if (arrayOfLetters[i].correctAnswer)
    {
      arrayOfLetters[i].audio.play();
    }

  }
}
