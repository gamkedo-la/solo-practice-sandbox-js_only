function Obstacle() {
  this.width = 25;
  this.height = 25;
  this.x = CANVAS_WIDTH - distFromLeftEdge;
  this.y = CANVAS_HEIGHT - this.height;

  this.draw = function() {
    drawRect(this.x, this.y, this.width, this.height, 'white');
  };
}

function obstacleOffscreen() {
  // Check if the obstacle reached the left edge of the canvas
  // If so, restart it on the right side of the canvas
  const obsRightEdge = obstacle.x + obstacle.width;
  // Subtracting distFromLeftEdge from the player left side, we get the canvas left side; the player is draw always 100px from the start of the canvas
  // Take in consideration that we are translating the canvas's origin
  const canvasLeftEdge = player.x - distFromLeftEdge;

  if (obsRightEdge < canvasLeftEdge) {
    // Put the obstacle back on the right side
    obstacle.x = canvasLeftEdge + CANVAS_WIDTH;
  }
}
