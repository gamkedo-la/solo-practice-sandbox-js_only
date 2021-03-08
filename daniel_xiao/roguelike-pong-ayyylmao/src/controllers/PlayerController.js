import {
  GAME_WIDTH,
  GAME_HEIGHT,
} from 'constants/game_settings';

import Paddle from 'components/Paddle';

import keycodes from 'constants/keycodes';

import CharacterController from 'controllers/CharacterController';

class PlayerController extends CharacterController {
  constructor(props = {}) {
    super({
      hp: {
        curr: 3,
        max: 3,
      },

      invincibilityTime: 300, //ms

      isPressLeft: false,
      isPressRight: false,
      isPressUp: false,
      isPressDown: false,
    });

    const newpaddle = new Paddle({
      position: {
        x: 150,
        y: 450,
      },
    });

    this.set('gameobject', newpaddle);
  }
  /**
   *
   */
  init() {
    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === keycodes.a || evt.keyCode === keycodes.arrowleft) {
        this.set('isPressLeft', true);
      }

      if (evt.keyCode === keycodes.d || evt.keyCode === keycodes.arrowright) {
        this.set('isPressRight', true);
      }
    });

    window.addEventListener('keyup', (evt) => {
      if (evt.keyCode === keycodes.a || evt.keyCode === keycodes.arrowleft) {
        this.set('isPressLeft', false);
      }

      if (evt.keyCode === keycodes.d || evt.keyCode === keycodes.arrowright) {
        this.set('isPressRight', false);
      }
    });
  }
  /**
   * @param {Time} deltaTime
   */
  update(deltaTime) {
    this.gameobject.update(deltaTime);

    if (this.get('isPressLeft')) {
      this.gameobject.updateVelocity({x: -1, y: 0});
    }

    if (this.get('isPressRight')) {
      this.gameobject.updateVelocity({x: 1, y: 0});
    }

    if (!this.get('isPressLeft') && !this.get('isPressRight')) {
      this.gameobject.reduceVelocity(deltaTime);
    }

    if (this.invincibilityCountdown > 0) {
      this.invincibilityCountdown -= deltaTime;
    } else {
      this.invincibilityCountdown = 0;
    }
  }
  // -- methods

}

export default new PlayerController();
