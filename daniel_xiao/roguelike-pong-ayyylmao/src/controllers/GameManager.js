import * as CanvasController from 'controllers/CanvasController';
import PlayerController from 'controllers/PlayerController';
import BallController from 'controllers/BallController';

let prev = Date.now();
let deltaTime = 0;

export function init() {
  CanvasController.init();
  PlayerController.init();
  BallController.init();

  // activate updating
  const myInterval = setInterval(tick, 0);
}

function tick() {
  const now = Date.now();
  deltaTime = now - prev;
  prev = now;

  update();
}

export function update() {
  CanvasController.draw();
  PlayerController.update(deltaTime);
  PlayerController.get('gameobject').draw(CanvasController.context);

  BallController.update(deltaTime);
  BallController.get('gameobject').draw(CanvasController.context);
}
