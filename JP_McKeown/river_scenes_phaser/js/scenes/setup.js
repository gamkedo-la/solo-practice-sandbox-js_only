let setup = new Phaser.Scene('Setup');

setup.init = function () {
   this.sys.game.config.gameCentre = [180, 320];
};

setup.preload = function () {
   let width = this.cameras.main.width;
   let height = this.cameras.main.height;
   // console.log(width, height, this.sys.game.config.width, this.sys.game.config.height);

   const barW = 150;
   const barH = 30;
   const barLeft = this.sys.game.config.width / 2 - barW / 2;
   const barTop = this.sys.game.config.height / 2 - barH / 2;

   let splash = this.add.sprite(this.sys.game.config.width / 2, 150, 'logo');

   let bgBar = this.add.graphics()
      .setPosition(barLeft, barTop);
   bgBar.fillStyle(0xF5F5F5, 1);
   bgBar.fillRect(0, 0, barW, barH);

   let progressBar = this.add.graphics()
      .setPosition(barLeft, barTop);

   this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0x9AD98D, 1);
      progressBar.fillRect(0, 0, value * barW, barH);
   }, this);

   let loadingFile = this.add.text(width / 2, height / 2 + 100, 'XXXX', { font: '24px monospace', fill: '#ffffff' }).setOrigin(0.5);

   this.load.on('fileprogress', function (file) {
      loadingFile.setText('Loading: ' + file.key);
   });

   // test progress bar
   // for (let i = 0; i < 200; i++) {
   //    this.load.image('river' + i, 'public/images/river_0_360x640.png');
   // }

   this.load.image('river', 'public/images/river_0_360x640.png');
   this.load.image('boat', 'public/images/boat_30x65.png');
   this.load.image('boom', 'public/images/boom_480x50.png');
   this.load.image('pier', 'public/images/goal.png');

   this.load.spritesheet('pet', 'public/images/explode.png', {
      frameWidth: 97,
      frameHeight: 83,
      spacing: 1
   });
};

setup.create = function () {
   this.anims.create({
      key: 'faces',
      frames: this.anims.generateFrameNames('pet', { frames: [1, 2, 3] }),
      frameRate: 7,
      yoyo: true,
      repeat: 1
   });

   this.scene.start('Home');
};