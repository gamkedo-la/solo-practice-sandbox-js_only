
export class Player extends Phaser.Physics.Arcade.Sprite {
   constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y, "dino-idle");
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.init();
   }

   init() {
      this
      .setOrigin(0, 1)
      .setGravityY(2000)
      .setCollideWorldBounds(true)
      .setBodySize(44, 92);

      this.registerPlayerControl();
   }

   registerPlayerControl() {
      const spaceBar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      spaceBar.on("down", (() => {
         // console.log("Pressing SPACE");
         this.setVelocityY(-1000);
      }))
   }
}
//export default Player;
