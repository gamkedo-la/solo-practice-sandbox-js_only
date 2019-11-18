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

function collisionCheck() {
  const obsRightEdge = obstacles[0].x + obstacles[0].width;
  const obsBottomEdge = obstacles[0].y + obstacles[0].height;
  const obsLeftEdge = obstacles[0].x;
  const obsTop = obstacles[0].y;

  const playerLeftSide = player.x;
  const playerRightSide = player.x + player.width;
  const playerBottom = player.y + player.height;

  // Check if player hits the first obstacle
  if (
    playerLeftSide < obsRightEdge &&
    playerRightSide > obsLeftEdge &&
    playerBottom > obsTop &&
    playerBottom <= obsBottomEdge
  ) {
    gameOver = true;
    return;
  }

  if (playerBottom < floor && playerRightSide > obsLeftEdge && playerLeftSide < obsRightEdge) {
    addPoint = true;
  }

  if (addPoint && playerLeftSide > obsRightEdge) {
    score++;
    addPoint = false;
    checkHighestScore();
  }
}
