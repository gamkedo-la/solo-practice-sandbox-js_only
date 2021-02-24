import * as CanvasController from 'controllers/CanvasController';
import playerController from 'controllers/PlayerController';
import 'styles/main.css';

CanvasController.init();

playerController.get('gameobject').draw(CanvasController.context);
