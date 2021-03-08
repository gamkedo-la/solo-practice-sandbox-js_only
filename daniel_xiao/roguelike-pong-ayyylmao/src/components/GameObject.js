import {
  SPEED_MODIFIER,
  GAME_WIDTH,
  GAME_HEIGHT,
} from 'constants/game_settings';

import Model from 'components/Model';

const VELOCITY_REDUCE = 0.5 * SPEED_MODIFIER;

export default class GameObject extends Model {
  constructor(props = {}) {
    super({
      id: '_' + Math.random().toString(36).substr(2, 9),
      type: '',

      width: 0,
      height: 0,

      speed: 5,

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

      bounds: {
        left: 0,
        right: GAME_WIDTH,
        top: 0,
        bottom: GAME_HEIGHT,
      },

      flipReduction: -1,

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
  reduceVelocity(deltaTime) {
    const changeX = this.isVelocityLeft ? VELOCITY_REDUCE : VELOCITY_REDUCE * -1;
    const changeY = this.isVelocityUp ? VELOCITY_REDUCE : VELOCITY_REDUCE * -1;

    const nextVelocity = {
      x: this.velocity.x + changeX * deltaTime,
      y: this.velocity.y + changeY * deltaTime,
    };

    if (Math.abs(nextVelocity.x) < 0.01) {
      nextVelocity.x = 0;
    }

    if (Math.abs(nextVelocity.y) < 0.01) {
      nextVelocity.y = 0;
    }

    this.set('velocity', nextVelocity);
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

    // too far left
    if (nextPosition.x < this.get('bounds').left) {
      nextPosition.x = this.get('bounds').left;
      this.get('velocity').x *= this.get('flipReduction');
    }

    // too far right
    if (nextPosition.x + this.get('width') > this.get('bounds').right) {
      nextPosition.x = this.get('bounds').right - this.get('width');
      this.get('velocity').x *= this.get('flipReduction');
    }

    // too far up
    if (nextPosition.y < this.get('bounds').top) {
      nextPosition.y = this.get('bounds').top;
      this.get('velocity').y *= this.get('flipReduction');
    }

    // too far bottom
    if (nextPosition.y + this.get('height') > this.get('bounds').bottom) {
      nextPosition.y = this.get('bounds').bottom - this.get('height');
      this.get('velocity').y *= this.get('flipReduction');
    }

    this.set('position', nextPosition);
  }
  /**
   * @param {GameObject} gameObject
   */
  isOverlapping(gameObject) {
    return this.left < gameObject.right &&
      this.right > gameObject.left &&
      this.top < gameObject.bottom &&
      this.bottom > gameObject.top;
  }
  /**
   * @param {GameObject} gameObject
   */
  onCollide(gameObject) {
  }
  // -- position getters
  /** @type {Point} */
  get center() {
    return {
      x: this.position.x + (this.get('width') / 2),
      y: this.position.y + (this.get('height') / 2),
    }
  }
  /** @type {Number} */
  get left() {
    return this.position.x;
  }
  /** @type {Number} */
  get right() {
    return this.position.x + this.get('width');
  }
  /** @type {Number} */
  get top() {
    return this.position.y;
  }
  /** @type {Number} */
  get bottom() {
    return this.position.y + this.get('height');
  }
  /** @type {Point} */
  get topleft() {
    return {
      x: this.position.x,
      y: this.position.y,
    }
  }
  /** @type {Point} */
  get topright() {
    return {
      x: this.position.x + this.get('width'),
      y: this.position.y,
    }
  }
  /** @type {Point} */
  get bottomleft() {
    return {
      x: this.position.x,
      y: this.position.y + this.get('height'),
    }
  }
  /** @type {Point} */
  get bottomright() {
    return {
      x: this.position.x + this.get('width'),
      y: this.position.y + this.get('height'),
    }
  }
  /** @type {Point} */
  get position() {
    return this.get('position');
  }
  /** @type {Boolean} */
  get isOutOfBoundsLeft() {
    return this.position.x < 0;
  }
  /** @type {Boolean} */
  get isOutOfBoundsRight() {
    return this.position.x > GAME_WIDTH;
  }
  /** @type {Boolean} */
  get isOutOfBoundsUp() {
    return this.position.y < 0;
  }
  /** @type {Boolean} */
  get isOutOfBoundsDown() {
    return this.position.y > GAME_HEIGHT;
  }
  // -- velocity getters
  /** @type {Point} */
  get velocity() {
    return this.get('velocity');
  }
  /** @type {Boolean} */
  get isVelocityLeft() {
    return this.velocity.x < 0;
  }
  /** @type {Boolean} */
  get isVelocityRight() {
    return this.velocity.x > 0;
  }
  /** @type {Boolean} */
  get isVelocityUp() {
    return this.velocity.y < 0;
  }
  /** @type {Boolean} */
  get isVelocityDown() {
    return this.velocity.y > 0;
  }
}
