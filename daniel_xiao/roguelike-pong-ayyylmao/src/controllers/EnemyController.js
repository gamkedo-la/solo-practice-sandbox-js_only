import {
  GAME_WIDTH,
  GAME_HEIGHT,
} from 'constants/game_settings';

import Paddle from 'components/Paddle';

import CharacterController from 'controllers/CharacterController';

export const ENEMY_STATE = {
  MOVING: 'ENEMY_STATE.MOVING',
};

class EnemyController extends CharacterController {
  constructor(props = {}) {
    super({
      state: ENEMY_STATE.MOVING,

      hp: {
        curr: 3,
        max: 3,
      },

      invincibilityTime: 300, //ms

      target: undefined, // gameobject
    });

    const newpaddle = new Paddle({
      position: {
        x: GAME_WIDTH / 2,
        y: 50,
      },
    });

    this.set('gameobject', newpaddle);
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
    ctx.fillText(`HP: ${this.get('hp').curr}/${this.get('hp').max}`, GAME_WIDTH - 70, 20);
  }
  /**
   * @param {Time} deltaTime
   */
  update(deltaTime) {
    this.updateState(deltaTime);

    this.gameobject.update(deltaTime);

    this.moveTowardsTarget();

    if (this.invincibilityCountdown > 0) {
      this.invincibilityCountdown -= deltaTime;
    } else {
      this.invincibilityCountdown = 0;
    }
  }
  /**
   * @param {Time} deltaTime
   */
  updateState(deltaTime) {
    switch (this.get('state')) {
      case ENEMY_STATE.MOVING:
        break;
    }
  }
  /**
   *
   */
  moveTowardsTarget() {
    const target = this.get('target');
    if (target === undefined) return;

    if (this.gameobject.center.x < target.center.x) {
      this.gameobject.updateVelocity({x: -1, y: 0});
    }

    if (this.gameobject.center.x > target.center.x) {
      this.gameobject.updateVelocity({x: 1, y: 0});
    }
  }
}

export default new EnemyController();
