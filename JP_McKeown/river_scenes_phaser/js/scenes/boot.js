let boot = new Phaser.Scene('Boot');

boot.preload = function () {
   this.load.image('logo', 'public/images/logo_hometeam.png');
};

boot.create = function () {
   this.scene.start('Setup');
};