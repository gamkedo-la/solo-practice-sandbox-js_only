import GameObject from 'components/GameObject';

export default class Paddle extends GameObject {
  constructor(props = {}) {
    super(props);
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
