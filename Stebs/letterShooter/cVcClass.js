function cVc(firstLetter,secondLetter,thirdLetter)
{
  this.firstLetter = firstLetter;//string
  this.firstLetterPosition = undefined;//integer from arrayOfLetterPositions
  this.firstLetterCollisionRangeLeftPoint = undefined;
  this.firstLetterCollisionRangeRightPoint = undefined;

  this.secondLetter = secondLetter;
  this.secondLetterPosition = undefined;
  this.secondLetterCollisionRangeLeftPoint = undefined;
  this.secondLetterCollisionRangeRightPoint = undefined;

  this.thirdLetter = thirdLetter;
  this.thirdLetterPosition = undefined;
  this.thirdLetterCollisionRangeLeftPoint = undefined;
  this.thirdLetterCollisionRangeRightPoint = undefined;

  this.arrayOfLetterPositions = [this.firstLetterPosition,this.secondLetterPosition,this.thirdLetterPosition];

  this.assignLetterPositions = function()
  {

    let arrayOfGameBoardLetterPositionsLength = 3;
    for (let i = 0; i < arrayOfGameBoardLetterPositionsLength; i++)
    {
      let randomArrayOfLetterPositionsIndex = Math.floor(Math.random()*arrayOfGameBoardLetterPositions.length);
      this.arrayOfLetterPositions[i] = arrayOfGameBoardLetterPositions[randomArrayOfLetterPositionsIndex];
      arrayOfGameBoardLetterPositions.splice(randomArrayOfLetterPositionsIndex,1);
    }
  }

  this.defineCollisionRanges = function()
  {
    this.firstLetterCollisionRangeLeftPoint = this.arrayOfLetterPositions[0] * 199;
    this.firstLetterCollisionRangeRightPoint = this.arrayOfLetterPositions[0] * 200 + 199;

    this.secondLetterCollisionRangeLeftPoint = this.arrayOfLetterPositions[1] * 199;
    this.secondLetterCollisionRangeRightPoint = this.arrayOfLetterPositions[1] * 200 + 199;

    this.thirdLetterCollisionRangeLeftPoint = this.arrayOfLetterPositions[2] * 199;
    this.thirdLetterCollisionRangeRightPoint = this.arrayOfLetterPositions[2] * 200 + 199;
  }

  this.draw = function()
  {
    canvasDrawingContext.fillStyle = 'white';
    canvasDrawingContext.font = '30px Helvetica';

    if (playerShouldBeTargetingFirstLetter)
    {
      canvasDrawingContext.fillText(this.firstLetter, this.arrayOfLetterPositions[0]*200 + 95,30);
      canvasDrawingContext.fillText(this.secondLetter, this.arrayOfLetterPositions[1]*200 + 95,30);
      canvasDrawingContext.fillText(this.thirdLetter, this.arrayOfLetterPositions[2]*200 + 95,30);
    }
    else if (playerShouldBeTargetingSecondLetter)
    {
      canvasDrawingContext.fillText(this.secondLetter, this.arrayOfLetterPositions[1]*200 + 95,30);
      canvasDrawingContext.fillText(this.thirdLetter, this.arrayOfLetterPositions[2]*200 + 95,30);
    }
    else if (playerShouldBeTargetingThirdLetter)
    {
      canvasDrawingContext.fillText(this.thirdLetter, this.arrayOfLetterPositions[2]*200 + 95,30);
    }
    else
    {
      canvasDrawingContext.fillText("You win!!!", gameCanvas.width/2,gameCanvas.height/2);
    }
  }
}
