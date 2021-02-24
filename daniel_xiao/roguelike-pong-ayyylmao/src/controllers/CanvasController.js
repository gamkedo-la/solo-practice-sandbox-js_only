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
