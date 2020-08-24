const KEY_UP_ARROW = 38;
const KEY_SPACE = 32;

function handleInput(e) {
  e.preventDefault();

  if (gameOver && e.keyCode === KEY_SPACE) {
    gameOver = false;
    resetGame();
    return;
  }

  if (e.keyCode === KEY_UP_ARROW || e.keyCode === KEY_SPACE) {
    player.jumping = true;
    player.move();
  }
}
