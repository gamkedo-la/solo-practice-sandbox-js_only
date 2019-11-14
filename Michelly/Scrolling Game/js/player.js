function Player() {
  this.height = 50;
  this.width = 20;
  this.x = 100;
  this.y = CANVAS_HEIGHT - this.height;
  this.ySpeed = 0;

  const JUMP = -8;

  this.move = function() {
    // Check if player isn't already jumping
    if (this.y >= floor) {
      // Make player jump
      this.ySpeed = JUMP;
      this.y += this.ySpeed;
    }
  };

  this.draw = function() {
    drawRect(this.x, this.y, this.width, this.height, 'blue');
  };
}

function applyGravityToPlayer() {
  const gravity = 0.5;

  // if player hits the floor, don't apply gravity
  if (player.y >= floor) {
    player.ySpeed = 0;
    player.y = floor;
  } else {
    // If player is on the air, apply gravity
    player.ySpeed += gravity;
    player.y += player.ySpeed;
  }
}
