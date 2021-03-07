import Model from 'components/Model';
import Paddle from 'components/Paddle';

import keycodes from 'constants/keycodes';

export const PLAYER_STATE = {

};

class PlayerController extends Model {
  constructor(props = {}) {
    super({
      state: '',

      gameobject: undefined,

      isPressLeft: false,
      isPressRight: false,
      isPressUp: false,
      isPressDown: false,
    });

    const newpaddle = new Paddle({
      width: 50,
      height: 15,
      position: {
        x: 150,
        y: 450,
      },
    });

    this.set('gameobject', newpaddle);
  }
  /**
   *
   */
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
  /**
   * @param {Time} deltaTime
   */
  update(deltaTime) {
    this.gameobject.update(deltaTime);

    if (this.get('isPressLeft')) {
      this.gameobject.updateVelocity({x: -1, y: 0});
    }

    if (this.get('isPressRight')) {
      this.gameobject.updateVelocity({x: 1, y: 0});
    }

    if (!this.get('isPressLeft') && !this.get('isPressRight')) {
      this.gameobject.reduceVelocity(deltaTime);
    }
  }

  // -- getters
  /** @type {GameObject} */
  get gameobject() {
    return this.get('gameobject');
  }
  /** @type {Point} */
  get position() {
    return {
      x: this.get('gameobject').get('position').x,
      y: this.get('gameobject').get('position').y,
    }
  }
}

export default new PlayerController();
