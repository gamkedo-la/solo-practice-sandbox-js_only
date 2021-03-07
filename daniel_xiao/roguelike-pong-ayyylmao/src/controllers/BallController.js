import Model from 'components/Model';
import Ball from 'components/Ball';

import {GAME_WIDTH, GAME_HEIGHT} from 'constants/game_settings';
import keycodes from 'constants/keycodes';

export const BALL_STATE = {
  MOVING: 'BALL_STATE.MOVING',
};

class BallController extends Model {
  constructor(props = {}) {
    super({
      state: BALL_STATE.MOVING,

      gameobject: undefined,
    });

    const newBall = new Ball({
      position: {
        x: GAME_WIDTH / 2,
        y: GAME_HEIGHT / 2,
      },
    });

    this.set('gameobject', newBall);
  }
  /**
   *
   */
  init() {
  }
  /**
   * @param {Time} deltaTime
   */
  update(deltaTime) {
    this.gameobject.update(deltaTime);
  }

  // -- getters
  /** @type {GameObject} */
  get gameobject() {
    return this.get('gameobject');
  }
  /** @type {Point} */
  get position() {
    return {
      x: this.get('gameobject').get('position').x,
      y: this.get('gameobject').get('position').y,
    }
  }
}

export default new BallController();
