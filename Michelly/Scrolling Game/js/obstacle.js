function Obstacle() {
  this.width = 28;
  this.height = 30;
  this.x = CANVAS_WIDTH;
  this.y = floor - this.height;
  this.xSpeed = -3;

  this.draw = function () {
    canvasContext.drawImage(
      obstacleSprite,
      this.x,
      this.y - 3,
      SPRITE_SIZE * 2,
      SPRITE_SIZE * 2
    );
  };

  this.obstacleOffscreen = function () {
    return this.x < 0 ? true : false;
  };

  this.move = function () {
    this.x += this.xSpeed;
  };
}

function afterSomeTimeAddObstacles() {
  frameCount++;

  if (frameCount % 100 === 0) {
    frameCount = 0;

    if (Math.random() < 0.5) {
      obstacles.push(new Obstacle());
    }
  }
}
