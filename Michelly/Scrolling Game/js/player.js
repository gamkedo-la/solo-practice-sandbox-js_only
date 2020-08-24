function Player() {
  this.height = 50;
  this.width = 25;
  this.x = 100;
  this.y = floor - this.height;
  this.ySpeed = 0;
  this.jumping = false;
  this.animation = new Animation();

  const JUMP = -10;

  this.move = function () {
    // Check if player isn't already jumping
    if (this.y + this.height >= floor) {
      // Make player jump
      this.ySpeed = JUMP;
      this.y += JUMP;
      // Play sound
      jumpSound.play();
    }
  };

  this.draw = function () {
    canvasContext.drawImage(
      spriteSheet.image,
      // Remove all images that come before the sprite to be used - only draw one sprite - on the x axis
      this.animation.spriteNumber * SPRITE_SIZE,
      // y axis - draw from the beginning
      0,
      // Width of the source image to be draw - x axis - size of one sprite (16)
      SPRITE_SIZE,
      // Height of the source image to be draw - y axis - size of one sprite (16)
      SPRITE_SIZE,
      // Where to draw the image on screen
      this.x - 10,
      this.y,
      // Increase size of the sprite on screen
      SPRITE_SIZE * 3,
      SPRITE_SIZE * 3
    );
  };
}

function applyGravityToPlayer() {
  const gravity = 0.5;

  // if player hits the floor, don't apply gravity
  if (player.y + player.height >= floor) {
    // Draw the walking aprite
    player.jumping = false;
    // Set jumping speed to 0
    player.ySpeed = 0;
    player.y = floor - player.height;
  } else {
    // If player is in the air, apply gravity
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

  // Check if player is jumping through the obstacle
  if (
    playerBottom < floor &&
    playerRightSide > obsLeftEdge &&
    playerLeftSide < obsRightEdge
  ) {
    addPoint = true;
  }

  // Use addPoint to make sure a point is added only when the player jumped through an obstacle, otherwise it will add points every time that there is an obstacle on the player's left
  if (addPoint && playerLeftSide > obsRightEdge) {
    score++;
    addPoint = false;
  }
}
