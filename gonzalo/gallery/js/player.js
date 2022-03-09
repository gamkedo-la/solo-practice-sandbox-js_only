import {Enemy} from "./enemy.js";
import {Projectile} from "./projectile.js";

export class Player {
  static avatarHeight = 24;
  static avatarWidth = 8;
  static reticleSpeed = 270;
  static avatarSpeed = 120;
  static timeBetweenShots = 1/9;

  static getAxis = function(up, down, left, right) {
	let axis = { x: 0, y: 0 };

	if (up) axis.y += -1;
	else if (down) axis.y += 1;

	if (left) axis.x += -1;
	else if (right) axis.x += 1;

	return axis;
  }

  static clampNorm = function(vel, max) {
	const n = Math.sqrt(Math.pow(vel.x, 2) + Math.pow(vel.y, 2));
	const f = Math.min(n, max) / n;
	return {x: f*vel.x, y: f*vel.y};
  }

  static onHitTarget = function(dt, shot) {
	for (const enemy of Enemy.alive()) {
	  const dist = Math.sqrt(Math.pow(enemy.x - shot.target.x, 2) + Math.pow(enemy.y - shot.target.y, 2));
		if (dist <= 16) {
		  enemy.live = false;
		}
	}
  }
  
  constructor (canvasContext, input) {
	this.ctx = canvasContext;
	this.input = input;
	this.avatarPos = {x: 100, y: this.ctx.canvas.height - Player.avatarHeight};
	this.reticlePos = {x: 104, y: this.ctx.canvas.height/2};
	this.shots = [];
	this.shotDelay = 0;
	this.hitTargetHooks = [Player.onHitTarget];
  }

  update(dt) {
	this.shots = this.shots.filter(shot => shot.live);
	if (!this.input.shoot) {
	  if (this.input.left) {
		this.avatarPos.x -= Player.avatarSpeed*dt;
	  }
	  if (this.input.right) {
		this.avatarPos.x += Player.avatarSpeed*dt;
	  }
	} else if (this.shotDelay <= 0) {
	  this.shots.push(Projectile.get(
		this.ctx,
		8,
		Player.avatarWidth/2,
		{x: this.avatarPos.x + Player.avatarWidth/2, y: this.avatarPos.y},
		{x: this.reticlePos.x, y: this.reticlePos.y, height: 3},
		10,
		this.hitTargetHooks,
	  ));
	  this.shotDelay = Player.timeBetweenShots;
	}
	this.shots.forEach(shot => shot.update(dt));
	this.shotDelay -= dt;
	const cv = Player.getAxis(this.input.up, this.input.down, this.input.left, this.input.right);
	if (!(cv.x === 0 && cv.y === 0)) {
	  const vel = Player.clampNorm({
		x: cv.x*Player.reticleSpeed,
		y: cv.y*Player.reticleSpeed,
	  }, Player.reticleSpeed);
	  this.reticlePos.x += vel.x*dt;
	  this.reticlePos.y += vel.y*dt;
	}
	if (this.avatarPos.x < 0) {
	  this.avatarPos.x = 0;
	}
	if (this.avatarPos.x  > this.ctx.canvas.width - Player.avatarWidth) {
	  this.avatarPos.x = this.ctx.canvas.width - Player.avatarWidth;
	}
	if (this.reticlePos.x < Player.avatarWidth/2) {
	  this.reticlePos.x = Player.avatarWidth/2;
	}
	if (this.reticlePos.x  > this.ctx.canvas.width - Player.avatarWidth/2) {
	  this.reticlePos.x = this.ctx.canvas.width - Player.avatarWidth/2;
	}
	if (this.reticlePos.y < Player.avatarWidth/2) {
	  this.reticlePos.y = Player.avatarWidth/2;
	}
	if (this.reticlePos.y  > this.ctx.canvas.height - Player.avatarHeight) {
	  this.reticlePos.y = this.ctx.canvas.height - Player.avatarHeight;
	}
  }

  draw() {
	this.ctx.strokeStyle = this.input.shoot ? "lime" : "red";
	if (this.input.shoot) {
	  this.ctx.setLineDash([2, 4]);
	  this.ctx.beginPath();
	  this.ctx.moveTo(Math.round(this.avatarPos.x + Player.avatarWidth/2), Math.round(this.avatarPos.y));
	  this.ctx.lineTo(Math.round(this.reticlePos.x), Math.round(this.reticlePos.y));
	  // this.ctx.stroke();
	  this.ctx.setLineDash([]);
	}
	this.ctx.beginPath();
	this.ctx.arc(this.reticlePos.x, this.reticlePos.y, Math.round(Player.avatarWidth), 0, 2*Math.PI);
	this.ctx.stroke();
	this.ctx.fillStyle = "lime";
	this.ctx.fillRect(Math.round(this.avatarPos.x), Math.round(this.avatarPos.y), Player.avatarWidth, Player.avatarHeight);
	this.shots.forEach(shot => shot.draw());
  }
}
