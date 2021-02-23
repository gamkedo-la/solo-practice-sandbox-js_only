export default class Model {
  constructor(props = {}) {
    this.attributes = props;
  }

  get(key) {
    return this.attributes[key];
  }

  set(key, value) {
    this.attributes[key] = value;
  }
}
