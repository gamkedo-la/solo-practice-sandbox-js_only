var paddle;

function Paddle()
{
  this.width = 100;
  this.height = 25;

  this.positionX = gameCanvas.width/2 - this.width/2;
  this.positionY = gameCanvas.height - this.height*2;

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.fillRect(this.positionX,this.positionY, this.width,this.height);
  }


}
