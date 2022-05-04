import {constants} from "./constants.js";
import {Enemy} from "./enemy.js";


export class Level {
  static gridWidth = 20;
  static gridHeight = 11;
  static tileSize = 16; // pixels
  static #TIMER = 0;

  static getXForGridIndex(i) {
	return i % Level.gridWidth;
  }

  static getYForGridIndex(i) {
	return Math.floor(i/Level.gridWidth);
  }

  constructor(ctx, data) {
	this.ctx = ctx;
	this.levelData = data;
	this.waveIndex = 0;
  }

  update(dt) {
	Level.#TIMER += dt;

	if (Level.#TIMER*1000 > constants.TIME_SLOT) {
	  Level.#TIMER = 0;
	  const enemySpecs = this.levelData[this.waveIndex++];
	  if (typeof enemySpecs != "undefined") {
		for (let i=0; i<enemySpecs.length; i++) {
		  const data = enemySpecs[i];
		  Enemy.spawn(this.ctx, data.x, data.y, data.color, data.updater);
		}
		console.log("Time for a new wave!", this.waveIndex);
	  }
	  this.waveIndex = this.waveIndex % this.levelData.length;
	}
  }

  draw(dt) {
  }
}
