// our game's configuration
let config = {
   type: Phaser.AUTO,
   width: 360,
   height: 600,
   scene: [boot, setup, home, game],
   title: 'Virtual Pet',
   pixelArt: true,
   roundPixels: true,
   backgroundColor: 'ffffff',
   physics: {
      default: 'arcade',
      arcade: {
         debug: true,
         gravity: { y: 0 }
      }
   }
};

// create the game, and pass it the configuration
let riverGame = new Phaser.Game(config);