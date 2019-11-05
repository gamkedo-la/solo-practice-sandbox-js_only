var arrayOfLetters = [];
var m;
var n;

function letter(letterName)
{

    this.letterName = letterName;//string
    this.minX = 20;
    this.maxX = gameCanvas.width - this.minX;
    this.x = Math.floor( (Math.random()*( (this.maxX - this.minX) + this.minX )) );
    this.minY = -200;
    this.maxY = -20;
    this.y = Math.floor(Math.random() * (this.maxY + this.minY + 1) + this.minY);
    this.correctAnswer = undefined;//boolean

    this.yVelocity = 5;

    this.audio = document.getElementById(letterName);

    this.resetXYPositions = function()
    {
      this.x = Math.floor( (Math.random()*( (this.maxX - this.minX) + this.minX )) );
      this.y = Math.floor(Math.random() * (this.maxY + this.minY + 1) + this.minY);
    }

    this.resetYVelocity = function()
    {
      if (this.yVelocity < 0)
      {
        this.yVelocity *= -1;
      }
    }

    this.draw = function()
    {
      gameCanvasContext.fillStyle = 'red';
      gameCanvasContext.font = '20px Helvetica';
      gameCanvasContext.fillText(letterName, this.x,this.y);
    }

    this.handlePaddleCollision = function()
    {

      if (this.y + 10 >= paddle.positionY && this.x + 10 >= paddle.positionX && this.x <= paddle.positionX + paddle.width)
      {
        this.yVelocity *= - 1;
      }
    }

    this.handlePaddlePass = function()
    {
      if (this.y >= paddle.positionY)
      {
        if (this.correctAnswer)
        {
          amountCorrect++;
        } else {
          {
            amountIncorrect++;          }
        }
        this.findIndexInArrayOfLettersAndSplice();
        calculateAccuracy();
      }

    }

    this.handleOffTopSideOfScreen = function()
    {
      if (this.y <= 0 && this.yVelocity < 0)
      {
        if (this.correctAnswer)
        {
          amountIncorrect++;
        } else {
          {
            amountCorrect++;
          }
        }
        this.findIndexInArrayOfLettersAndSplice();
        calculateAccuracy();
      }
    }

    this.findIndexInArrayOfLettersAndSplice = function()
    {
      for (let i = 0; i < arrayOfLetters.length; i++)
      {
        console.log(this);
        if (arrayOfLetters[i] === this)
        {
          arrayOfLetters.splice(i, 1);
        }
      }
    }

    this.checkIfCorrectLetterAndTallyStats = function()
    {

    }

    this.move = function()
    {
      this.y += this.yVelocity;
    }
}//end of class

function setCorrectLetter()
{
  let correctLetterIndex = Math.floor(Math.random()*arrayOfLetters.length);

  for (let i = 0; i < arrayOfLetters.length; i++)
  {
    if (arrayOfLetters[i] == arrayOfLetters[correctLetterIndex])
    {
      arrayOfLetters[i].correctAnswer = true;
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

function moveLetters()
{
  for (let i = 0; i < arrayOfLetters.length; i++)
  {
    arrayOfLetters[i].move();
  }
}

function handlePaddlePasses()
{
  for (let i = 0; i < arrayOfLetters.length; i++)
  {
    arrayOfLetters[i].handlePaddlePass();
  }
}

function handleOffTopSideOfScreen()
{
  for (let i = 0; i < arrayOfLetters.length; i++)
  {
    arrayOfLetters[i].handleOffTopSideOfScreen();
  }
}

function handlePaddleCollisions()
{
  for (let i = 0; i < arrayOfLetters.length; i++)
  {
    arrayOfLetters[i].handlePaddleCollision();
  }
}

function playCorrectLetterAudio()
{
  for (let i = 0; i < arrayOfLetters.length; i++)
  {
    console.log(arrayOfLetters[i]);
    if (arrayOfLetters[i].correctAnswer)
    {
      arrayOfLetters[i].audio.play();
    }
  }
}

function handleEmptyArrayOfLetters()
{
  if (arrayOfLetters.length === 0)
  {
    arrayOfLetters.push(m);
    arrayOfLetters.push(n);
    for (let i = 0; i < arrayOfLetters.length; i++)
    {
      arrayOfLetters[i].resetXYPositions();
      arrayOfLetters[i].resetYVelocity();
    }
    setCorrectLetter();
    playCorrectLetterAudio();
  }
}
