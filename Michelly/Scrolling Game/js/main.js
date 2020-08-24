window.onload = function () {
  canvas = document.querySelector("canvas");
  canvasContext = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  setInterval(updateGame, FRAMES_PER_SECOND);

  // Add the file to be used as spriteSheet of the player
  spriteSheet.image.src = "img/animation.png";
  // Set the player animation
  player.animation.changeAnimSet(spriteSheet.frameSet, 10);

  document.addEventListener("keydown", handleInput);
};

function updateGame() {
  if (gameOver) {
    gameOverScreen();
    return;
  }

  afterSomeTimeAddObstacles();
  moveEverything();
  player.animation.update();
  drawEverything();
}

function moveEverything() {
  applyGravityToPlayer();

  if (obstacles.length >= 1) {
    collisionCheck();
  }

  // Move obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].move();
  }
}

function drawEverything() {
  // Draw two images, one after the other, so that it seems the background is infinite
  canvasContext.drawImage(
    bgImage,
    imageWidth,
    0,
    bgImage.width,
    // Make image cover all the canvas height
    bgImage.height + 250
  );
  canvasContext.drawImage(
    bgImage,
    imageWidth - canvas.width,
    0,
    bgImage.width,
    bgImage.height + 250
  );

  // Move the background image to the left
  imageWidth -= scrollSpeed;

  // If the image went all the way to the left, reset it to the right
  if (imageWidth <= 0) {
    imageWidth = canvas.width;
  }

  // Draw score
  colorText(`Score: ${score}`, 10, 15, "white");

  // Draw obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].draw();
    if (obstacles[i].obstacleOffscreen()) {
      obstacles.splice(i, 1);
    }
  }

  // Draw player
  player.draw();
}

function gameOverScreen() {
  // Draw text
  colorText("GAME OVER", canvas.width / 2 - 50, canvas.height / 2, "black");
  colorText(
    "Press SPACE to restart game",
    canvas.width / 2 - 95,
    canvas.height / 2 + 20,
    "black"
  );

  // Get the highest score from local storage
  checkAndSetHighestScore();

  colorText(
    `Score: ${score}`,
    canvas.width / 2 - 30,
    canvas.height / 2 + 60,
    "black"
  );
  colorText(
    `Highest Score: ${highestScore}`,
    canvas.width / 2 - 60,
    canvas.height / 2 + 80,
    "black"
  );
}

function resetGame() {
  // Remove all obstacles from the game
  obstacles = [];

  // Reset score
  score = 0;
}

function checkAndSetHighestScore() {
  // If highestScore doesn't exist on localStorage or if highestScore is less than the current score, update on localStorage
  if (
    highestScore < score ||
    JSON.parse(localStorage.getItem("highestScore")) == null
  ) {
    localStorage.setItem("highestScore", JSON.stringify(score));
  }

  highestScore = JSON.parse(localStorage.getItem("highestScore"));
}
