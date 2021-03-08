import {
  SPEED_MODIFIER,
} from 'constants/game_settings';

import GameObject from 'components/GameObject';

export default class Ball extends GameObject {
  constructor(props = {}) {
    super({
      type: 'Ball',

      speed: 3,

      width: 10,
      height: 10,

      velocity: {
        x: 100 * SPEED_MODIFIER,
        y: 100 * SPEED_MODIFIER,
      },

      velocityMax: {
        xMin: -100,
        xMax: 100,
        yMin: -100,
        yMax: 100,
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
    this.get('velocity').y *= this.get('flipReduction');
  }
}
