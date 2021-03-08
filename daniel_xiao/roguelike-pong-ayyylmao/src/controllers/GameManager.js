import Ball from 'components/Ball';

import {GAME_WIDTH, GAME_HEIGHT} from 'constants/game_settings';

import * as CanvasController from 'controllers/CanvasController';
import PlayerController from 'controllers/PlayerController';

let prev = Date.now();
let deltaTime = 0;

export const GAMESTATE = {
  PAUSING: 'GAMESTATE.PAUSING',
  PLAYING: 'GAMESTATE.PLAYING',
}

let stateCurr = GAMESTATE.PLAYING;
let gameObjectList = [];

const CurrentBall = new Ball({
  position: {
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT / 2,
  },
});

export function init() {
  CanvasController.init();
  PlayerController.init();

  gameObjectList.push(PlayerController.gameobject);
  gameObjectList.push(CurrentBall);

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

  CurrentBall.update(deltaTime);
  CurrentBall.draw(CanvasController.context);
}

export function checkCollisions() {
  gameObjectList.forEach((gameObject) => {
    gameObjectList.forEach((otherObject) => {
      // same object
      if (gameObject.get('id') === otherObject.get('id')) {
        return;
      }

      // collision
      if (gameObject.isOverlapping(otherObject)) {
        gameObject.onCollide(otherObject);
      }
    });
  });
}
