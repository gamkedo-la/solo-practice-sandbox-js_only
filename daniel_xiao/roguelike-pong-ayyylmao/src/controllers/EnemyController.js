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
      /* @override */
      state: ENEMY_STATE.MOVING,
      /* @override */
      hp: {
        curr: 3,
        max: 3,
      },
      /* @override */
      invincibilityTime: 300, //ms
      /* @type {GameObject} what is this enemy chasing */
      ball: undefined,

      /* @type {Point} what is the position */
      targetPos: undefined,
      /* @type {Number} how long before updating `targetPos` */
      retargetTime: 300,

      ...props
    });

    this.retargetCountdown = 0;

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

    this.updateTargeting(deltaTime);

    this.gameobject.update(deltaTime);

    this.updateInvincibility(deltaTime);

    this.moveTowardsTarget();
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
   * @param {Time} deltaTime
   */
  updateTargeting(deltaTime) {
    if (this.retargetCountdown <= 0) {
      const target = this.get('ball');
      if (target !== undefined) {
        this.set('targetPos', target.center);
      }

      this.retargetCountdown = this.get('retargetTime');

    } else {
      this.retargetCountdown -= deltaTime;
    }
  }
  /**
   *
   */
  moveTowardsTarget() {
    const targetPos = this.get('targetPos');
    if (targetPos === undefined) return;

    if (this.gameobject.center.x < targetPos.x) {
      this.gameobject.updateVelocity({x: -1, y: 0});
    }

    if (this.gameobject.center.x > targetPos.x) {
      this.gameobject.updateVelocity({x: 1, y: 0});
    }
  }
}

export default new EnemyController();
