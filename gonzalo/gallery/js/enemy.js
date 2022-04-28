function stand(actor, dt) {
}

function stageLeft(actor, dt) {
  if (actor.visible && actor.live) {
	actor.x -= 80*dt;
  }
  if (actor.x < 20) {
	actor.live = false;
  }
}

function stageRight(actor, dt) {
  if (actor.visible && actor.live) {
	actor.x += 80*dt;
  }
  if (actor.x - 20 > actor.ctx.canvas.width) {
	actor.live = false;
  }
}


export const CHARACTERS = {
  ghost: {costume: "ghost.png", role: stand, animations: []},
  zombie: {costume: "zombie.png", role: stand, animations: []},
};

export class Enemy {
  static #INSTANCES = [];
  static #ROLES = {
	default: stand,
	static: stand,
	stageLeft: stageLeft,
	stageRight: stageRight,
  }
  static alive = function* () {
	for (const enemy of this.#INSTANCES) {
	  if (enemy.live) {
		yield enemy;
	  }
	}
  }

  static spawn(ctx, x, y, showDelay, hideDelay, role) {
	let enemy = this.#INSTANCES.filter(e => !e.live).pop();
	if (typeof enemy == "undefined") {
	  enemy = new Enemy(ctx, x, y, showDelay, hideDelay, role);
	  this.#INSTANCES.push(enemy);
	  console.log("Created new enemy", enemy);
	} else {
	  enemy.init(x, y, showDelay, hideDelay, role);
	  console.log("Recycled enemy", enemy);
	}
	return enemy;
  }

  constructor(ctx, x, y, showDelay, hideDelay, role) {
	this.ctx = ctx;
	this.init(x, y, showDelay, hideDelay, role);
  }

  init(x, y, showDelay, hideDelay, role) {
	this.timer = 0;
	this.showDelay = showDelay;
	this.hideDelay = hideDelay;
	this.visible = false;
	this.live = true;
	this.x = x;
	this.y = y;
	this.role = Enemy.#ROLES[role];
  }

  update(dt) {
	if (!this.live) {
	  return;
	}
	this.timer += dt;
	if (!this.visible && this.timer >= this.showDelay) {
	  this.visible = true;
	  this.timer = 0;
	}
	if (this.visible && this.timer >= this.hideDelay) {
	  this.visible = false;
	  this.live = false;
	}
	this.role(this, dt);
  }

  draw() {
	if (!this.visible) {
	  return;
	}
	this.ctx.fillStyle = "pink";
	this.ctx.beginPath();
	this.ctx.arc(Math.round(this.x), Math.round(this.y), 10, 0, 2*Math.PI);
	this.ctx.closePath();
	this.ctx.fill();
  }
}
