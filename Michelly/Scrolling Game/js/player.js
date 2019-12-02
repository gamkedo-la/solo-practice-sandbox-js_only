function Player() {
  this.height = 50;
  this.width = 25;
  this.x = 100;
  this.y = floor - this.height;
  this.ySpeed = 0;
  this.jumping = false;
  this.animation = new Animation();

  const JUMP = -8;

  this.move = function() {
    // Check if player isn't already jumping
    if (this.y + this.height >= floor) {
      // Make player jump
      this.ySpeed = JUMP;
      this.y += this.ySpeed;
      // Play sound
      jumpSound.play();
    }
  };

  this.draw = function() {
    // drawRect(this.x, this.y, this.width, this.height, 'white');
    canvasContext.drawImage(
      spriteSheet.image,
      this.animation.spriteNumber * SPRITE_SIZE,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.x - 10,
      this.y,
      SPRITE_SIZE * 3,
      SPRITE_SIZE * 3
    );
  };
}

function applyGravityToPlayer() {
  const gravity = 0.5;

  // if player hits the floor, don't apply gravity
  if (player.y + player.height >= floor) {
    player.jumping = false;
    player.ySpeed = 0;
    player.y = floor - player.height;
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
    gameOverSound.play();
    return;
  }

  if (playerBottom < floor && playerRightSide > obsLeftEdge && playerLeftSide < obsRightEdge) {
    addPoint = true;
  }

  if (addPoint && playerLeftSide > obsRightEdge) {
    score++;
    addPoint = false;
    checkAndSetHighestScore();
  }
}
