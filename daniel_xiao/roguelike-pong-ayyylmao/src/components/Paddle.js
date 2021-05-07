import GameObject from 'components/GameObject';

export default class Paddle extends GameObject {
  constructor(props = {}) {
    super({
      type: 'Paddle',

      speed: 5,

      width: 50,
      height: 15,

      flipReduction: -0.3,

      ...props
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
