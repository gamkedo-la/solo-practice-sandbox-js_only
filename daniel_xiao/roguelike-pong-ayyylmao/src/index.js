import * as CanvasController from 'controllers/CanvasController';
import PlayerController from 'controllers/PlayerController';
import BallController from 'controllers/BallController';
import 'styles/main.css';

CanvasController.init();

PlayerController.init();
BallController.init();

let prev = Date.now();
let deltaTime = 0;
const myInterval = setInterval(tick, 0);

function tick() {
    const now = Date.now();
    deltaTime = now - prev;
    prev = now;

    update();
}

function update() {
  CanvasController.draw();
  PlayerController.update(deltaTime);
  PlayerController.get('gameobject').draw(CanvasController.context);

  BallController.update(deltaTime);
  BallController.get('gameobject').draw(CanvasController.context);
}
