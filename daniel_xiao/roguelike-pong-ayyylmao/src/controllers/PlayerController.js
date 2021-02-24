import Model from 'components/Model';
import Paddle from 'components/Paddle';

import keycodes from 'constants/keycodes';

class PlayerController extends Model {
  constructor(props = {}) {
    super({
      gameobject: undefined,

      isPressLeft: false,
      isPressRight: false,
      isPressUp: false,
      isPressDown: false,
    });

    const newpaddle = new Paddle({
      x: 150,
      y: 450,
      width: 50,
      height: 15,
    });

    this.set('gameobject', newpaddle);
  }

  init() {
    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === keycodes.a || evt.keyCode === keycodes.arrowleft) {
        this.set('isPressLeft', true);
      }

      if (evt.keyCode === keycodes.d || evt.keyCode === keycodes.arrowright) {
        this.set('isPressRight', true);
      }
    });

    window.addEventListener('keyup', (evt) => {
      if (evt.keyCode === keycodes.a || evt.keyCode === keycodes.arrowleft) {
        this.set('isPressLeft', false);
      }

      if (evt.keyCode === keycodes.d || evt.keyCode === keycodes.arrowright) {
        this.set('isPressRight', false);
      }
    });
  }

  update(deltaTime) {
    this.get('gameobject').update(deltaTime);
  }

  // -- getters
  get position() {
    return {
      x: this.get('gameobject').get('position').x,
      y: this.get('gameobject').get('position').y,
    }
  }
}

export default new PlayerController();
