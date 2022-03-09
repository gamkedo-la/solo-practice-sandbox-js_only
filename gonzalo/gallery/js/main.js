import {Input} from "./input.js";
import {Player} from "./player.js";
import {Level} from "./level.js";
import {Enemy} from "./enemy.js";

class Game {
  static dt = 0;
  static updateStep = 1/60;
  static last = window.performance && window.performance.now ? window.performance.now() : new Date().getTime();

  constructor() {
	this.canvas = document.getElementById("gameCanvas");
	this.ctx = this.canvas.getContext("2d");

	this.input = new Input();
	this.player = new Player(this.ctx, this.input);
	this.currentLevel = new Level(this.ctx);
  }

  start() {
	window.requestAnimationFrame(this.getAnimationFrameCallback());
  }

  update(dt) {
	this.currentLevel.update(dt);
	this.player.update(dt);
	for (const enemy of Enemy.alive()) {
	  enemy.update(dt);
	}
  }

  draw() {
	this.ctx.fillStyle = "gray";
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	this.currentLevel.draw();
	for (const enemy of Enemy.alive()) {
	  enemy.draw();
	}
	this.player.draw();
  }

  getAnimationFrameCallback() {
	const game = this;
	const runGameStep = function(browserTimeStamp) {
	  Game.dt += Math.min(1, (browserTimeStamp - Game.last) / 1000);
	  while (Game.dt > Game.updateStep) {
		Game.dt -= Game.updateStep;
		game.update(Game.updateStep);
	  }
	  game.draw();
	  Game.last = browserTimeStamp;
	  window.requestAnimationFrame(game.getAnimationFrameCallback());
	};
	return runGameStep;
  }
}

window.onload = function() {
  const game = new Game();
  game.start();
};
