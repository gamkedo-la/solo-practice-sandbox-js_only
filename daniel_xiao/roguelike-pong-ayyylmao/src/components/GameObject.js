export default class GameObject {
  constructor(props = {}) {
    this.attributes = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      ...props,
    }
  }

  get(key) {
    return this.attributes[key];
  }

  set(key, value) {
    this.attributes[key] = value;
  }

  draw(ctx) {
  }

  update() {

  }
}
