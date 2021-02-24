import Model from 'components/Model';

export default class GameObject extends Model {
  constructor(props = {}) {
    super({
      position: {
        x: 0,
        y: 0,
      },
      width: 0,
      height: 0,
      velocity: {
        x: 0,
        y: 0,
      },
      ...props,
    });
  }

  draw(ctx) {
  }

  update(deltaTime) {

  }
}
