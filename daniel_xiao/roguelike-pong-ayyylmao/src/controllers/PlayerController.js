import Model from 'components/Model';
import Paddle from 'components/Paddle';

class PlayerController extends Model {
  constructor(props = {}) {
    super({
      gameobject: undefined,
    });

    const newpaddle = new Paddle({
      x: 150,
      y: 450,
      width: 50,
      height: 15,
    });

    this.set('gameobject', newpaddle);
  }
}

export default new PlayerController();
