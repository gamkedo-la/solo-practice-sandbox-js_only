import * as CanvasController from 'controllers/CanvasController';
import playerController from 'controllers/PlayerController';
import 'styles/main.css';

CanvasController.init();

playerController.init();
playerController.get('gameobject').draw(CanvasController.context);

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
  playerController.update(deltaTime);
  playerController.get('gameobject').draw(CanvasController.context);
}
