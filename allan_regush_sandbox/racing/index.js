var canvas = document.getElementById('gameCanvas');
var canvasWidth  = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext('2d');
document.addEventListener('keydown', handleKey);

const gameState = {
  p1 : {
    x: 0,
    y: 0
  }
}

function handleKey(e) {
  switch(e.key) {
    case 'w': {
      gameState.p1.y -= 3;
    } break;
    case 's': {
      gameState.p1.y += 3;
    } break;
    case 'a': {
      gameState.p1.x -= 3;
    } break;
    case 'd': {
      gameState.p1.x += 3;
    } break;
  }
}

window.onload = function() {
  requestAnimationFrame(main);
}

function main() {
  render();
  requestAnimationFrame(main);
}

function render() {
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = 'blue';
  ctx.fillRect(gameState.p1.x, gameState.p1.y, 10, 10);
}
