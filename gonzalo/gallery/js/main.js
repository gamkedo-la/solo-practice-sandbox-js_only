let dt = 0;
let last = window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
const UPDATE_STEP = 1/60;

const PLAYER_HEIGHT = 24;
const PLAYER_WIDTH = 8;
const PLAYER_SPEED = 120;
const RETICLE_SPEED = 270;
const TIME_BETWEEN_SHOTS = 1/4;

class Game {
  constructor() {
	this.canvas = document.getElementById("gameCanvas");
	this.ctx = this.canvas.getContext("2d");

	this.keys = {up: false, down: false, left: false, right: false, shoot: false};
	this.playerPos = {x: 100, y: this.canvas.height - PLAYER_HEIGHT};
	this.reticlePos = {x: 104, y: this.canvas.height/2};
	this.shots = [];
	this.shotDelay = 0;
	document.addEventListener("keydown", this.keyPress);
	document.addEventListener("keyup", this.keyRelease);
  }

  flipInputState(key, value) {
	switch (key) {
	case " ":
	  this.keys.shoot = value;
	  break;
	case "ArrowLeft":
	  this.keys.left = value;
	  break;
	case "ArrowRight":
	  this.keys.right = value;
	  break;
	case "ArrowUp":
	  this.keys.up = value;
	  break;
	case "ArrowDown":
	  this.keys.down = value;
	  break;
	}
  }

  keyPress(event) {
	if (event.key == "F12") {
	  return;
	}
	event.preventDefault();
	game.flipInputState(event.key, true);
  }

  keyRelease(event) {
	if (event.key == "F12") {
	  return;
	}
	event.preventDefault();
	game.flipInputState(event.key, false);
  }
  
  update(dt) {
	this.shots.forEach(shot => {
	  shot.position.x += Math.round(shot.velocity.x*dt);
	  shot.position.y += Math.round(shot.velocity.y*dt);
	  shot.live = !(shot.position.x - shot.target.x < 8 && shot.position.y - shot.target.y < 8);
	});
	this.shots = this.shots.filter(shot => shot.live);
	if (this.keys.shoot && this.shotDelay <= 0) {
	  const initialPos = {
		x: this.playerPos.x + PLAYER_WIDTH/2,
		y: this.playerPos.y
	  };
	  const targetPos = {x: this.reticlePos.x, y: this.reticlePos.y};
	  this.shots.push({
		position: initialPos,
		velocity: {
		  x: 8*(targetPos.x - initialPos.x),
		  y: 8*(targetPos.y - initialPos.y)
		},
		target: targetPos,
		live: true
	  });
	  console.log("Spawned shot", this.shots);
	  this.shotDelay = TIME_BETWEEN_SHOTS;
	} else {
		if (this.keys.left) {
			this.playerPos.x -= Math.round(PLAYER_SPEED*dt);
		}
		if (this.keys.right) {
			this.playerPos.x += Math.round(PLAYER_SPEED*dt);
		}
	}
	this.shotDelay -= dt;
	if (this.keys.left) {
		this.reticlePos.x -= Math.round(RETICLE_SPEED*dt);
	  }
	  if (this.keys.right) {
		this.reticlePos.x += Math.round(RETICLE_SPEED*dt);
	  }
	if (this.keys.up) {
	  this.reticlePos.y -= Math.round(RETICLE_SPEED*dt);
	}
	if (this.keys.down) {
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
	this.ctx.strokeStyle = this.keys.shoot ? "lime" : "red";
	if (this.keys.shoot) {
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
