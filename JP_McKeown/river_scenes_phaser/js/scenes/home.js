let home = new Phaser.Scene('Home');

home.init = function () {
   this.menu = [
      { scene: 'Game', text: 'Play' },
   ];
};

home.create = function () {
   this.cameras.main.setBackgroundColor(0x0000ff);
   //this.input.on('pointerdown', () => this.scene.start('Game'));

   let gameWidth = this.sys.game.config.width;
   let gameHeight = this.sys.game.config.height;
   let gameCentre = [gameWidth / 2, gameHeight / 2];
   let titleCentre = [gameWidth / 2, 120];

   let text = this.add.text(...titleCentre, 'River boat', { font: '40px Arial', fill: '#ffffff' })
      .setOrigin(0.5)
      .setDepth(1);

   let textPanel = this.add.graphics();
   textPanel.fillStyle(0x000000, 0.7);
   let margin = 12;
   let left = gameWidth / 2 - text.width / 2 - margin;
   let top = 120 - text.height / 2 - margin;
   textPanel.fillRect(left, top, text.width + margin * 2, text.height + margin * 2);

   top += 150;
   this.buttonPlay = this.add.text(gameWidth / 2, top, 'Play', { font: '32px Arial', fill: '#ffffff' })
      .setOrigin(0.5)
      .setInteractive();

   this.buttonPlay.on('pointerdown', () => this.scene.start('Game'));

   top += 75;
   let buttonCredits = this.add.text(gameWidth / 2, top, 'Credits', { font: '32px Arial', fill: '#ffffff' })
      .setOrigin(0.5);
};

home.makeMenu = function (menu) {
   menu.forEach(menuItem => {

   });
};