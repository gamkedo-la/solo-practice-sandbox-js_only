import GameObject from 'components/GameObject';

export default class Paddle extends GameObject {
  constructor(props = {}) {
    super(props);
  }

  draw(ctx) {
    const {
      x,
      y,
      width,
      height,
    } = this.attributes;

    ctx.fillRect(x, y, width, height);
  }
}
