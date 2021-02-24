import * as CanvasController from 'controllers/CanvasController';
import playerController from 'controllers/PlayerController';
import 'styles/main.css';

CanvasController.init();

playerController.init();
playerController.get('gameobject').draw(CanvasController.context);

function update() {
  const deltaTime = timer.update();
  playerController.update(deltaTime);
  requestAnimationFrame(update);
}
