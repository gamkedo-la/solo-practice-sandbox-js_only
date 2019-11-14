function Obstacle() {
  this.width = 25;
  this.height = 25;
  this.x = CANVAS_WIDTH;
  this.y = CANVAS_HEIGHT - this.height;
  this.xSpeed = -3;

  this.draw = function() {
    drawRect(this.x, this.y, this.width, this.height, 'red');
  };

  this.obstacleOffscreen = function() {
    return this.x < 0 ? true : false;
  };

  this.move = function() {
    this.x += this.xSpeed;
  };
}

function afterSomeTimeAddObs() {
  frameCount++;
  const frameToDraw = frameCount + randomRange(1, 8);

  if (frameToDraw % 50 === 0) {
    obstacles.push(new Obstacle());
  }
}
