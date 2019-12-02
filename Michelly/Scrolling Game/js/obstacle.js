function Obstacle() {
  this.width = 28;
  this.height = 30;
  this.x = CANVAS_WIDTH;
  this.y = floor - this.height;
  this.xSpeed = -3;

  this.draw = function() {
    // drawRect(this.x, this.y, this.width, this.height, 'red');
    canvasContext.drawImage(obsSprite, this.x, this.y - 3, SPRITE_SIZE * 2, SPRITE_SIZE * 2);
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
  // const frameToDraw = frameCount + randomRange(1, 8);

  if (frameCount % 75 === 0) {
    obstacles.push(new Obstacle());
  }
}
