import {
  SPEED_MODIFIER,
} from 'constants/game_settings';

import GameObject from 'components/GameObject';

export default class Ball extends GameObject {
  constructor(props = {}) {
    super({
      /* @override */
      type: 'Ball',
      /* @override */
      speed: 3,
      /* @override */
      width: 10,
      /* @override */
      height: 10,
      /* @override */
      velocity: {
        x: 200 * SPEED_MODIFIER,
        y: 200 * SPEED_MODIFIER,
      },
      /* @override */
      velocityMax: {
        xMin: -1500,
        xMax: 1500,
        yMin: -1500,
        yMax: 1500,
      },
      ...props,
    });
  }
  /**
   * @override
   */
  draw(ctx) {
    const {
      position: {
        x,
        y,
      },
      width,
      height,
    } = this.attributes;

    ctx.fillStyle = '#cfffc1';
    ctx.fillRect(x, y, width, height);
  }
  /**
   * @override
   */
  onCollide(gameObject) {
    switch (gameObject.get('type')) {
      case 'Paddle':
        this.onCollidePaddle(gameObject);
        break;
    }
  }
  /**
   * @param {GameObject} gameObject
   */
  onCollidePaddle(gameObject) {
    const nextVelocity = {
      x: this.get('velocity').x,
      y: this.get('velocity').y,
    }

    this.get('velocity').y *= this.get('flipReduction'); // flip it

    // if the ball is going too fast, start reducing any extreme movement
    if (Math.abs(nextVelocity.x) > 0.8) {
      nextVelocity.x *= 0.8;
    }

    if (Math.abs(nextVelocity.y) > 0.8) {
      nextVelocity.y *= 0.8;
    }

    // utilize some of the paddle's horizontal movement
    // sort of like in table tennis
    const paddleVelocity = gameObject.get('velocity');
    const xTransfer = Math.min(Math.max(paddleVelocity.x * 0.2, 0), 0.1);
    nextVelocity.x += xTransfer;

    // finally set the new value
    this.set('velocity', nextVelocity);
  }
}
