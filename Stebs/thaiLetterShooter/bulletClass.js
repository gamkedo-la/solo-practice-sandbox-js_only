function Bullet(i)
{
  this.xPosition = player.position*200 + 97;
  this.yPosition = gameCanvas.height - 170;

  this.move = function()
  {
    this.yPosition -= 20;
  }

  this.draw = function()
  {
    canvasDrawingContext.fillRect(this.xPosition,this.yPosition, 10,20);
  }

  this.handleLetterCollisions = function(i)
  {
    if (this.yPosition <= 30)
    {
      if (playerShouldBeTargetingFirstLetter && this.xPosition > cat.firstLetterCollisionRangeLeftPoint && this.xPosition <
      cat.firstLetterCollisionRangeRightPoint)
      {
        amountCorrect++;
        playerShouldBeTargetingFirstLetter = false;
        playerShouldBeTargetingSecondLetter = true;
        arrayOfBullets.splice(i,1);
        calculateAccuracy();
        return;
      }
      else if (playerShouldBeTargetingSecondLetter && this.xPosition > cat.secondLetterCollisionRangeLeftPoint && this.xPosition <
      cat.secondLetterCollisionRangeRightPoint)
      {
          amountCorrect++;
          playerShouldBeTargetingSecondLetter = false;
          playerShouldBeTargetingThirdLetter = true;
          arrayOfBullets.splice(i,1);
          calculateAccuracy();
          return;
      }
      else if (playerShouldBeTargetingThirdLetter && this.xPosition > cat.thirdLetterCollisionRangeLeftPoint && this.xPosition <
      cat.thirdLetterCollisionRangeRightPoint)
      {
        {
          amountCorrect++;
          playerShouldBeTargetingThirdLetter = false;
          arrayOfBullets.splice(i,1);
          calculateAccuracy();
          return;
        }
      }
      else
      {
        amountIncorrect++;
        arrayOfBullets.splice(i,1);
        calculateAccuracy();
        return;
      }//end of letter order checks and collision range checks
    }//end of y position check
  }//end of handleLetterCollisions
}//end of bulletClass

var arrayOfBullets = [];

function fireBullet()
{
  let bullet = new Bullet();
  arrayOfBullets.push(bullet);
}

function moveBullets()
{
  for (let i = 0; i < arrayOfBullets.length; i++)
  {
    arrayOfBullets[i].move();
  }
}

function drawBullets()
{
  for (let i = 0; i < arrayOfBullets.length; i++)
  {
    arrayOfBullets[i].draw();
  }
}

function handleBulletCollisionsWithLetters()
{
  for (let i = 0; i < arrayOfBullets.length; i++)
  {
    arrayOfBullets[i].handleLetterCollisions();
  }

}
