import Phaser from "phaser"

class PreloadScene extends Phaser.Scene {
   constructor() {
      super("preloadScene");
      console.log("preloadScene constructor called");
   }
   preload() {
      console.log("preload started");
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/ground.png');
      this.load.image('dino-idle', 'assets/dino-idle.png');
      console.log("preload completed");
   }
   create() {
      console.log("preloadScene create started");
      this.scene.start("playScene")
      console.log("playScene started");
   }
}

export default PreloadScene;
