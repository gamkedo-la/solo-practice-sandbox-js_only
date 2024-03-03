let gameScene = new Phaser.Scene('game');

gameScene.init = function () {
   this.booms_displayed = 1;
};

gameScene.preload = function () {
   this.load.image('river', 'public/assets/bg_360_640.png');
   this.load.image('boat', 'public/assets/boat_30_65.png');
   this.load.image('boom', 'public/assets/boom_480_50.png');
};

gameScene.create = function () {
   this.add.image(0, 0, 'river')
      .setOrigin(0);
   this.physics.add.sprite(config.width / 2, 40, 'boat');

   this.booms = this.physics.add.group();
   for (let i = 0; i < this.booms_displayed; i += 1) {
      let leftBoom = this.booms.create(-100, 300, 'boom')
         .setImmovable(true)
         .setOrigin(0)
         .setScale(0.7);
   }

   //this.booms.setVelocityY(-50);

   //this.physics.add.collider(this.boat, this.booms, null, null, this);
};

gameScene.upload = function () { };

let config = {
   type: Phaser.AUTO,
   width: 360,
   height: 640,
   title: 'Riverboat',
   pixelArt: false,
   physics: {
      default: "arcade",
      arcade: {
         debug: true,
      }
   },
   scene: gameScene
};

let game = new Phaser.Game(config);