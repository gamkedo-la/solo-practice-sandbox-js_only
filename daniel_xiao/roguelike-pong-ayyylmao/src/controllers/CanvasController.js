export let canvas;
export let context;

export function init() {
  canvas = document.createElement('canvas');
  context = canvas.getContext('2d');

  canvas.width = 300;
  canvas.height = 500;

  const gameContainer = document.getElementById('game-container');
  gameContainer.appendChild(canvas);
}

export function draw() {
  context.fillStyle = '#222d67';
  context.fillRect(0, 0, 300, 500);
}
