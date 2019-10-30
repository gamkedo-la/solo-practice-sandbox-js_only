function Snake()
{
  this.x = this.y = 10;
  this.xVelocity = this.yVelocity = 0;

  this.trail = [];
  this.tail = 5;

  this.xVelocity = this.yVelocity = 0;

  this.draw = function()
  {
    canvasDrawingContext.fillStyle = 'lime';
    for(let i = 0; i < this.trail.length; i++)
    {
      canvasDrawingContext.fillRect(this.trail[i].x*gridSize,this.trail[i].y*gridSize,
      gridSize - 2,gridSize - 2);

      if (this.trail[i].x === this.x && this.trail[i].y == this.y)
      {
        tail = 5;
      }
    }

    this.trail.push({x:this.x,y:this.y});
    while(this.trail.length > this.tail)
    {
      this.trail.shift();
    }
  }

  this.move = function()
  {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  this.handleOffScreen = function()
  {
    if (this.x < 0)
    {
      this.x = tileCount - 1;
    }
    if (this.x > tileCount - 1)
    {
      this.x = 0;
    }
    if (this.y < 0)
    {
      this.y = tileCount - 1;
    }
    if (this.y > tileCount - 1)
    {
      this.y = 0;
    }
  }
}

function handleSnakeCollisionsWithLetters()
{
  for (let i = 0; i < arrayOfLetters.length; i++)
  {
    arrayOfLetters[i].handleSnakeCollision();
  }
}
