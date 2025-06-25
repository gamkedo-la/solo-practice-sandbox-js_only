console.log('Game starting...');
import Phaser from "phaser";
import PreloadScene from "./scenes/preload"
import PlayScene from "./scenes/play"

const config: Phaser.Types.Core.GameConfig = {
   type: Phaser.AUTO,
   width: 800,
   height: 340,
   pixelArt: true,
   transparent: true,
   physics: {
     default: 'arcade',
     arcade: {
       debug: true
     }
   },
   scene: [PreloadScene, PlayScene]
 };
 
 new Phaser.Game(config);
