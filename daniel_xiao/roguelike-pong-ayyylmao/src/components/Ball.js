import {
  SPEED_MODIFIER,
} from 'constants/game_settings';

import GameObject from 'components/GameObject';

export default class Paddle extends GameObject {
  constructor(props = {}) {
    super({
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
}
