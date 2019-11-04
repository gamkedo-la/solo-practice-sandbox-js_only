function Player() {
  this.height = 50;
  this.width = 20;
  this.x = 0;
  this.y = CANVAS_HEIGHT - this.height;
  this.xSpeed = 2;
  this.ySpeed = 60;

  this.move = function() {
    // Check if player isn't already jumping
    if (this.y >= floor) {
      // Make player jump
      this.y -= this.ySpeed;
    }
  };

  this.draw = function() {
    // Move player horizontally to change the canvas's origin
    this.x += this.xSpeed;

    drawRect(this.x, this.y, this.width, this.height, 'blue');
  };
}
