import Phaser from "../lib/phaser.js";
export default class Game extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.StaticGroup} */
  platforms;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors

  constructor() {
    super('game');
  }

  preload() {
    this.load.image('background', 'assets/bg_layer1.png')
    this.load.image('platform', 'assets/tile_ground.png')
    this.load.image('player-stand', 'assets/sheep_normal.png')
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    this.add.image(240, 320, 'background').setScrollFactor(1,0)

    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 5; ++i) {

      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = this.platforms.create(x, y, 'platform');
      platform.scaleX = 3.0;
      platform.scaleY = 0.5;

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const body = platform.body;
      body.updateFromGameObject();
    }

    this.player = this.physics.add.sprite(240, 240, 'player-stand');
    
    this.physics.add.collider(this.platforms, this.player);

    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.cameras.main.startFollow(this.player)
    this.cameras.main.setDeadzone(this.scale.width * 1.5)
  }

  update(t, dt) {
    this.platforms.children.iterate(child => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = child

      const scrollY = this.cameras.main.scrollY;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();
      }
    });

    const touchingDown = this.player.body.touching.down;
    if (touchingDown) {
      this.player.setVelocityY(-300);
    }

    // left and right
    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200)
    }
    else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200)
    }
    else {
      this.player.setVelocityX(0)
    }
  }
}