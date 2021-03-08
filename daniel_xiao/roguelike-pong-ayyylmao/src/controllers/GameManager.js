import * as CanvasController from 'controllers/CanvasController';
import PlayerController from 'controllers/PlayerController';
import BallController from 'controllers/BallController';

let prev = Date.now();
let deltaTime = 0;

export const GAMESTATE = {
  PAUSING: 'GAMESTATE.PAUSING',
  PLAYING: 'GAMESTATE.PLAYING',
}

let stateCurr = GAMESTATE.PLAYING;
let gameObjectList = [];

export function init() {
  CanvasController.init();
  PlayerController.init();
  BallController.init();

  gameObjectList.push(PlayerController.gameobject);
  gameObjectList.push(BallController.gameobject);

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
  if (stateCurr === GAMESTATE.PAUSING) return;

  checkCollisions();
  draw();
}

export function draw() {
  CanvasController.draw();
  PlayerController.update(deltaTime);
  PlayerController.get('gameobject').draw(CanvasController.context);

  BallController.update(deltaTime);
  BallController.get('gameobject').draw(CanvasController.context);
}

export function checkCollisions() {
  gameObjectList.forEach((gameObject) => {
    gameObjectList.forEach((otherObject) => {
      // same object
      if (gameObject.get('id') === otherObject.get('id')) {
        return;
      }

      if (gameObject.isOverlapping(otherObject)) {
        gameObject.onCollide(otherObject);
      }
    });
  });
}
