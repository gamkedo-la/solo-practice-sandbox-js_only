import {GAME_WIDTH, GAME_HEIGHT} from 'constants/game_settings';

export let canvas;
export let context;

export function init() {
  canvas = document.createElement('canvas');
  context = canvas.getContext('2d');

  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;

  const gameContainer = document.getElementById('game-container');
  gameContainer.appendChild(canvas);
}

export function draw() {
  context.fillStyle = '#222d67';
  context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}
