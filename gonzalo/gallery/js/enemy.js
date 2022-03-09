export class Enemy {
  static #INSTANCES = [];
  static alive = function* () {
	for (const enemy of this.#INSTANCES) {
	  if (enemy.live) {
		yield enemy;
	  }
	}
  }

  static spawn(ctx, x, y, showDelay, hideDelay) {
	let enemy = this.#INSTANCES.filter(e => !e.live).pop();
	if (typeof enemy == "undefined") {
	  enemy = new Enemy(ctx, x, y, showDelay, hideDelay);
	  this.#INSTANCES.push(enemy);
	  console.log("Created new enemy", enemy);
	} else {
	  enemy.init(x, y, showDelay, hideDelay);
	  console.log("Recycled enemy", enemy);
	}
	return enemy;
  }

  constructor(ctx, x, y, showDelay, hideDelay) {
	this.ctx = ctx;
	this.init(x, y, showDelay, hideDelay);
  }

  init(x, y, showDelay, hideDelay) {
	this.timer = 0;
	this.showDelay = showDelay;
	this.hideDelay = hideDelay;
	this.visible = false;
	this.live = true;
	this.x = x;
	this.y = y;
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
