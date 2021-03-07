import {SPEED_MODIFIER} from 'constants/game_settings';

import Model from 'components/Model';

export default class GameObject extends Model {
  constructor(props = {}) {
    super({
      width: 0,
      height: 0,

      speed: 1,

      position: {
        x: 0,
        y: 0,
      },

      velocity: {
        x: 0,
        y: 0,
      },

      velocityMax: {
        xMin: -2,
        xMax: 2,
        yMin: -2,
        yMax: 2,
      },
      ...props,
    });

    // going to change the speed property with an adjustment because
    // I want to use simple numbers for speed but even 1 is a bit strong
    this.set('speed', this.get('speed') * SPEED_MODIFIER);
  }

  draw(ctx) {
  }

  update(deltaTime) {
    this.updatePosition(deltaTime);
  }
  /**
   * @param {Object} direction
   * @property {Number} x: -1 or 1 or 0
   * @property {Number} y: -1 or 1 or 0
   */
  updateVelocity({x, y}) {
    const {
      speed,
      velocityMax: {
        xMin,
        xMax,
        yMin,
        yMax,
      }
    } = this.attributes;

    const xNext = this.velocity.x + (speed * x);
    const yNext = this.velocity.y + (speed * y);

    const nextVelocity = {
      x: Math.min(Math.max(xNext, xMin), xMax),
      y: Math.min(Math.max(yNext, yMin), yMax)
    };

    this.set('velocity', nextVelocity);
    // console.log('updateVelocity', xNext, nextVelocity);
  }
  /**
   * @param {Time} deltaTime
   */
  updatePosition(deltaTime) {
    const xNext = this.position.x + (this.velocity.x * deltaTime);
    const yNext = this.position.y + (this.velocity.y * deltaTime);

    const nextPosition = {
      x: xNext,
      y: yNext,
    };

    this.set('position', nextPosition);
    // console.log('nextPosition', nextPosition)
  }

  // -- getters
  /**
   * @returns {Point}
   */
  get position() {
    return this.get('position');
  }
  /**
   * @returns {Point}
   */
  get velocity() {
    return this.get('velocity');
  }
}
