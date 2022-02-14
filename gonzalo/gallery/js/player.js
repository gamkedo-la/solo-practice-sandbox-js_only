export class Player {
  static avatarHeight = 24;
  static avatarWidth = 8;
  static reticleSpeed = 270;
  static avatarSpeed = 120;
  static timeBetweenShots = 1/5;

  constructor (canvasContext, input) {
	this.ctx = canvasContext;
	this.input = input;
	this.avatarPos = {x: 100, y: this.ctx.canvas.height - Player.avatarHeight};
	this.reticlePos = {x: 104, y: this.ctx.canvas.height/2};
	this.shots = [];
	this.shotDelay = 0;
  }

  update(dt) {
	this.shots = this.shots.filter(shot => shot.live);
	if (this.input.shoot && this.shotDelay <= 0) {
	  const initialPos = {
		x: this.avatarPos.x + Player.avatarWidth/2,
		y: this.avatarPos.y
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
	  this.shotDelay = Player.timeBetweenShots;
	} else {
	  if (this.input.left) {
		this.avatarPos.x -= Math.round(Player.avatarSpeed*dt);
	  }
	  if (this.input.right) {
		this.avatarPos.x += Math.round(Player.avatarSpeed*dt);
	  }
	}
		this.shots.forEach(shot => {
	  shot.position.x += Math.round(shot.velocity.x*dt);
	  shot.position.y += Math.round(shot.velocity.y*dt);
	  // TODO: replace this with raycasting hit detection (maybe)
	  shot.live = !(shot.position.x - shot.target.x < 10 && shot.position.y - shot.target.y < 10);
	});
	this.shotDelay -= dt;
	if (this.input.left) {
		this.reticlePos.x -= Math.round(Player.reticleSpeed*dt);
	  }
	  if (this.input.right) {
		this.reticlePos.x += Math.round(Player.reticleSpeed*dt);
	  }
	if (this.input.up) {
	  this.reticlePos.y -= Math.round(Player.reticleSpeed*dt);
	}
	if (this.input.down) {
	  this.reticlePos.y += Math.round(Player.reticleSpeed*dt);
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
	  this.ctx.moveTo(this.avatarPos.x + Player.avatarWidth/2, this.avatarPos.y);
	  this.ctx.lineTo(this.reticlePos.x, this.reticlePos.y);
	  // this.ctx.stroke();
	  this.ctx.setLineDash([]);
	}
	this.ctx.beginPath();
	this.ctx.arc(this.reticlePos.x, this.reticlePos.y, Math.round(Player.avatarWidth), 0, 2*Math.PI);
	this.ctx.stroke();
	this.ctx.fillStyle = "lime";
	this.ctx.fillRect(this.avatarPos.x, this.avatarPos.y, Player.avatarWidth, Player.avatarHeight);
	this.shots.forEach(shot => {
	  this.ctx.strokeStyle = "yellow";
	  this.ctx.beginPath();
	  this.ctx.arc(shot.position.x, shot.position.y, Math.round(Player.avatarWidth/2), 0, 2*Math.PI);
	  this.ctx.stroke();
	});
  }
}
