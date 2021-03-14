import {
  GAME_WIDTH,
  GAME_HEIGHT,
} from 'constants/game_settings';

import Model from 'components/Model';
import Paddle from 'components/Paddle';

export const CHARACTER_STATE = {
  MOVING: 'CHARACTER_STATE.MOVING',
};

export default class CharacterController extends Model {
  constructor(props = {}) {
    super({
      state: CHARACTER_STATE.MOVING,

      hp: {
        curr: 3,
        max: 3,
      },

      invincibilityTime: 300, //ms

      gameobject: undefined,
    });

    // for tracking
    this.invincibilityCountdown = 0;
  }
  /**
   *
   */
  init() {

  }
  /**
   * @param {Canvas Context} ctx
   */
  draw(ctx) {
    const {
      position: {
        x,
        y,
      },
      width,
      height,
    } = this.gameobject.attributes;

    ctx.fillStyle = this.isInvincible ? '#963838' : '#cfffc1';
    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = "white";
    ctx.font = '15px Arial';
    ctx.fillText(`HP: ${this.get('hp').curr}/${this.get('hp').max}`, GAME_WIDTH - 70, GAME_HEIGHT - 10);
  }
  // -- methods
  /**
   * @param {Number} value
   */
  hpDecrease(value) {
    if (this.isInvincible) return;

    const hp = this.get('hp');
    const nextHpCurr = hp.curr - value;
    this.set('hp', {
      ...hp,
      curr: nextHpCurr,
    });

    this.invincibilityCountdown = this.get('invincibilityTime');
  }
  /**
   *
   */
  updateInvincibility(deltaTime) {
    if (this.invincibilityCountdown > 0) {
      this.invincibilityCountdown -= deltaTime;
    } else {
      this.invincibilityCountdown = 0;
    }
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
  /** @type {Boolean} */
  get isInvincible() {
    return this.invincibilityCountdown > 0;
  }
}
