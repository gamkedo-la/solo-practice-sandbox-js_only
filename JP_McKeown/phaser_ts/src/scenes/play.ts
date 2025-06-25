import Phaser from "phaser"
import { SpriteDynamic } from "../types";
import { Player } from "../entities/Player";

class PlayScene extends Phaser.Scene{
   player: Player;
   player2: Player;

   startTrigger: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

   get gameHeight() {
      return this.game.config.height as number;
   }

   constructor() {
      super("playScene")
      console.log("playScene constructor called");
   }
   
   create() {
      this.makeWorld();
      this.startTrigger = this.physics.add.sprite(0, 30, null).setAlpha(0).setOrigin(0, 1);
      this.makePlayer();
      //this.registerPlayerControl();
      this.physics.add.overlap(this.startTrigger, this.player, () => {
         console.log("Collision!")
      })
   }

   makeWorld() {
      const ground = this.add.tileSprite(0, this.gameHeight, 800, 26, "ground")
         .setOrigin(0, 1);     
      console.log('Ground created at:', ground.x, ground.y, 'gameHeight:', this.gameHeight);
   }
   
   makePlayer() {
      this.player = new Player(this, 0, this.gameHeight);
      this.player2 = new Player(this, 200, this.gameHeight);

   } 
}

export default PlayScene;
