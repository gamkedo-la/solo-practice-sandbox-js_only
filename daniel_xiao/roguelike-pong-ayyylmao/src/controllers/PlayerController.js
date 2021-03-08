import {
  GAME_WIDTH,
  GAME_HEIGHT,
} from 'constants/game_settings';

import Model from 'components/Model';
import Paddle from 'components/Paddle';

import keycodes from 'constants/keycodes';

export const PLAYER_STATE = {
  MOVING: 'PLAYER_STATE.MOVING',
};

class PlayerController extends Model {
  constructor(props = {}) {
    super({
      state: '',

      hp: {
        curr: 3,
        max: 3,
      },

      gameobject: undefined,

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
  }
  /**
   * @param {Canvas Context} ctx
   */
  draw(ctx) {
    this.gameobject.draw(ctx);

    ctx.fillStyle = "white";
    ctx.font = '15px Arial';
    ctx.fillText(`HP: ${this.get('hp').curr}/${this.get('hp').max}`, GAME_WIDTH - 70, GAME_HEIGHT - 10);
  }
  // -- methods
  /**
   * @param {Number} value
   */
  hpDecrease(value) {
    const hp = this.get('hp');
    const nextHpCurr = hp.curr - value;
    this.set('hp', {
      curr: nextHpCurr,
      max: hp.max,
    });
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

export default new PlayerController();
