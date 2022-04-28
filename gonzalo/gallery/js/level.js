import {Wave} from "./wave.js";

export class Level {
  static maxTargets = 10;
  static gridWidth = 20;
  static gridHeight = 11;
  static tileSize = 16; // pixels
  static targetSpeed = 100;
  static #WAVE_TIMER = 9;
  static #WAVE_DELAY = 10;

  static getXForGridIndex(i) {
	return i % Level.gridWidth;
  }

  static getYForGridIndex(i) {
	return Math.floor(i/Level.gridWidth);
  }

  constructor(ctx) {
	this.ctx = ctx;
	this.waveIndex = 0;
	this.waveData = [
	  {
		showDelay: 0,
		showTimeOffset: 0,
		hideDelay: 1,
		hideTimeOffset: 1,
		enemySpecs: [
		  {x: 100, y: 100, role: "static"},
		  {x: 120, y: 100, role: "static"},
		  {x: 140, y: 100, role: "static"},
		  {x: 160, y: 100, role: "static"} 
		],
	  },
	  {
		showDelay: 2,
		showTimeOffset: 1,
		hideDelay: 4,
		hideTimeOffset: 0,
		enemySpecs: [
		  {x: 100, y: 50, role: "static"},
		  {x: 120, y: 50, role: "static"},
		  {x: 140, y: 50, role: "static"},
		  {x: 160, y: 50, role: "static"}
		],
	  },
	  {
		showDelay: 5,
		showTimeOffset: 2,
		hideDelay: Infinity,
		hideTimeOffset: 0,
		enemySpecs: [
		  {x: 0, y: 128, role: "stageRight"},
		  {x: ctx.canvas.width + 10, y: 112, role: "stageLeft"}
		],
	  }
	];
	this.liveWaves = [];
  }

  update(dt) {
	Level.#WAVE_TIMER += dt;
	if (Level.#WAVE_TIMER >= Level.#WAVE_DELAY) {
	  Level.#WAVE_TIMER = 0;
	  this.waveIndex = (this.waveIndex + 1) % this.waveData.length;
	  const data = this.waveData[this.waveIndex];
	  const wave = new Wave(this.ctx, data.showDelay, data.showTimeOffset, data.hideDelay, data.hideTimeOffset, data.enemySpecs);
	  this.liveWaves.push(wave);
	  console.log("Time for a new wave!", wave);
	}
	this.liveWaves.forEach(wave => wave.update(dt));
	this.liveWaves = this.liveWaves.filter(wave => wave.live);
	this.targetPopUpTimer += dt;
	if (this.targetPopUpTimer > this.targetPopUpDelay) {
	  this.targetPopUpTimer = 0;
	  const hiddenTarget = this.targets.filter(target => target.live && target.visible != this.targetPopUp).shift();
	  if (typeof(hiddenTarget) == "undefined") {
		// all targets visible now, reset
		this.targetPopUp = !this.targetPopUp;
	  } else {
		hiddenTarget.visible = this.targetPopUp;
	  }
	}
  }

  draw(dt) {
	// this.liveWaves.forEach(wave => wave.draw());
  }
}
