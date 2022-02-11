import {Input} from "./input.js";

let dt = 0;
let last = window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
const UPDATE_STEP = 1/60;

const PLAYER_HEIGHT = 24;
const PLAYER_WIDTH = 8;
const PLAYER_SPEED = 120;
const RETICLE_SPEED = 270;
const TIME_BETWEEN_SHOTS = 1/5;

class Game {
  constructor() {
	this.canvas = document.getElementById("gameCanvas");
	this.ctx = this.canvas.getContext("2d");

	this.input = new Input();
	this.playerPos = {x: 100, y: this.canvas.height - PLAYER_HEIGHT};
	this.reticlePos = {x: 104, y: this.canvas.height/2};
	this.shots = [];
	this.shotDelay = 0;
  }
  
  update(dt) {
	this.shots = this.shots.filter(shot => shot.live);
	if (this.input.shoot && this.shotDelay <= 0) {
	  const initialPos = {
		x: this.playerPos.x + PLAYER_WIDTH/2,
		y: this.playerPos.y
	  };
	  const targetPos = {x: this.reticlePos.x, y: this.reticlePos.y};
	  this.shots.push({
		position: initialPos,
		velocity: {
		  x: 9*(targetPos.x - initialPos.x),
		  y: 9*(targetPos.y - initialPos.y)
		},
		target: targetPos,
		live: true
	  });
	  this.shotDelay = TIME_BETWEEN_SHOTS;
	} else {
		if (this.input.left) {
			this.playerPos.x -= Math.round(PLAYER_SPEED*dt);
		}
		if (this.input.right) {
			this.playerPos.x += Math.round(PLAYER_SPEED*dt);
		}
	}
	this.shots.forEach(shot => {
	  shot.position.x += Math.round(shot.velocity.x*dt);
	  shot.position.y += Math.round(shot.velocity.y*dt);
	  // TODO: replace this with raycasting hit detection
	  shot.live = !(shot.position.x - shot.target.x < 10 && shot.position.y - shot.target.y < 10);
	});
	this.shotDelay -= dt;
	if (this.input.left) {
		this.reticlePos.x -= Math.round(RETICLE_SPEED*dt);
	  }
	  if (this.input.right) {
		this.reticlePos.x += Math.round(RETICLE_SPEED*dt);
	  }
	if (this.input.up) {
	  this.reticlePos.y -= Math.round(RETICLE_SPEED*dt);
	}
	if (this.input.down) {
	  this.reticlePos.y += Math.round(RETICLE_SPEED*dt);
	}
	if (this.playerPos.x < 0) {
	  this.playerPos.x = 0;
	}
	if (this.playerPos.x  > this.canvas.width - PLAYER_WIDTH) {
	  this.playerPos.x = this.canvas.width - PLAYER_WIDTH;
	}
	if (this.reticlePos.x < PLAYER_WIDTH/2) {
	  this.reticlePos.x = PLAYER_WIDTH/2;
	}
	if (this.reticlePos.x  > this.canvas.width - PLAYER_WIDTH/2) {
	  this.reticlePos.x = this.canvas.width - PLAYER_WIDTH/2;
	}
	if (this.reticlePos.y < PLAYER_WIDTH/2) {
	  this.reticlePos.y = PLAYER_WIDTH/2;
	}
	if (this.reticlePos.y  > this.canvas.height - PLAYER_HEIGHT) {
	  this.reticlePos.y = this.canvas.height - PLAYER_HEIGHT;
	}
  }

  draw() {
	this.ctx.fillStyle = "gray";
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.ctx.strokeStyle = this.input.shoot ? "lime" : "red";
	if (this.input.shoot) {
	  this.ctx.setLineDash([2, 4]);
	  this.ctx.beginPath();
	  this.ctx.moveTo(this.playerPos.x + PLAYER_WIDTH/2, this.playerPos.y);
	  this.ctx.lineTo(this.reticlePos.x, this.reticlePos.y);
	  // this.ctx.stroke();
	  this.ctx.setLineDash([]);
	}
	this.ctx.beginPath();
	this.ctx.arc(this.reticlePos.x, this.reticlePos.y, Math.round(PLAYER_WIDTH), 0, 2*Math.PI);
	this.ctx.stroke();
	this.ctx.fillStyle = "lime";
	this.ctx.fillRect(this.playerPos.x, this.playerPos.y, PLAYER_WIDTH, PLAYER_HEIGHT);
	this.shots.forEach(shot => {
	  this.ctx.strokeStyle = "yellow";
	  this.ctx.beginPath();
	  this.ctx.arc(shot.position.x, shot.position.y, Math.round(PLAYER_WIDTH/2), 0, 2*Math.PI);
	  this.ctx.stroke();
	});
  }
}

const game = new Game();

function runGameStep(browserTimeStamp) {
  dt += Math.min(1, (browserTimeStamp - last) / 1000);
  while (dt > UPDATE_STEP) {
    dt -= UPDATE_STEP;
    game.update(UPDATE_STEP);
  }
  game.draw();
  last = browserTimeStamp;
  window.requestAnimationFrame(runGameStep);
}

window.onload = function() {
  startGame();
  // inputManager.initialize();
  // assetLoader.loadAssets().then(startGame);
};

function startGame(values) {
  console.log("starting game");
  window.requestAnimationFrame(runGameStep);
}

