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
    this.get('velocity').y *= this.get('flipReduction'); // flip it

    // utilize some of the paddle's horizontal movement
    // sort of like in table tennis
    const paddleVelocity = gameObject.get('velocity');
    const xAbsorb = paddleVelocity.x * 0.2;

    // too little or too much
    if (Math.abs(xAbsorb) < 0.01 || Math.abs(xAbsorb) > 0.1) {
      return;
    }

    const nextVelocity = {
      x: this.get('velocity').x + xAbsorb,
      y: this.get('velocity').y,
    }
    this.set('velocity', nextVelocity);
  }
}
