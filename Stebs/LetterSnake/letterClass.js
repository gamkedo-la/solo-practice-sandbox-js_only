function letter(letterName)
{

    this.letterName = letterName;//string
    this.x = undefined;//integer
    this.y = undefined;//integer
    this.correctAnswer = undefined;//boolean

    this.audio = document.getElementById(letterName);

    this.draw = function()
    {
      canvasDrawingContext.fillStyle = 'red';
      canvasDrawingContext.font = '20px Helvetica';
      canvasDrawingContext.fillText(letterName, this.x*gridSize,this.y*gridSize + 20);
    }

    this.handleSnakeCollision = function()
    {
      if (this.x == snake.x && this.y == snake.y)
      {
        if (this.correctAnswer)
        {
          amountCorrect++;
        } else
        {
          amountIncorrect++;
        }

        calculateAccuracy();

        for (let i = 0; i < arrayOfLetters.length; i++)//reset letter positions
        {
          arrayOfLetters[i].x = Math.floor(Math.random()*tileCount);
          arrayOfLetters[i].y = Math.floor(Math.random()*tileCount);
        }//end of reset letter positions

        setCorrectLetter();
      }//end of if snake collides
    }//end of handleSnakeCollisionfunction


}//end of class

function setCorrectLetter()
{
  let correctLetterIndex = Math.floor(Math.random()*arrayOfLetters.length);

  for (let i = 0; i < arrayOfLetters.length; i++)
  {
    if (arrayOfLetters[i] == arrayOfLetters[correctLetterIndex])
    {
      arrayOfLetters[i].correctAnswer = true;
      if (!firstLetterAudio)//if we're not worrying about the audio loading at the beginning of the game
      {
        arrayOfLetters[i].audio.play();
      }
    } else
    {
      arrayOfLetters[i].correctAnswer = false;
    }//end of else
  }//end of for loop for setCorrectLetter
  for (let i = 0; i < arrayOfLetters.length; i++)
  {
    console.log("Letter name: " + arrayOfLetters[i].letterName + "\ncorrect letter? " + arrayOfLetters[i].correctAnswer);
  }
}



function drawLetters()
{
  for (let i = 0; i < arrayOfLetters.length; i++)
  {
    arrayOfLetters[i].draw();
  }
}
