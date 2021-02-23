import Model from 'components/Model';

let canvas;
let context;

export function init() {
  canvas = document.createElement('canvas');
  context = canvas.getContext('2d');

  const gameContainer = document.getElementById('game-container')
  gameContainer.appendChild(canvas);
}
