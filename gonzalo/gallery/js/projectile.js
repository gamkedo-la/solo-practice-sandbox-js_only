export class Projectile {
  static #INSTANCES = [];
  static get(canvasContext, speed, radius, initialPos, target, damage, hooks) {
	const deadInstances = Projectile.#INSTANCES.filter(p => !p.live);
	if (deadInstances.length) {
	  return deadInstances[0].recycle(speed, radius, initialPos, target, damage, hooks);
	} else {
	  const projectile = new Projectile(canvasContext, speed, radius, initialPos, target, damage, hooks);
	  Projectile.#INSTANCES.push(projectile);
	  return projectile;
	}
  }

  /**
   * Create a projectile
   * @param {CanvasRenderingContext2D} canvasContext - for drawing
   * @param {number} speed - velocity vector
   * @param {{x: number, y: number}} initialPos - initial projectile position
   * @param {{x: number, y: number}} target - projectile target rectangle
   * @param {number} damage - damage projectile deals
   * @param {function[]} hooks - callbacks to call when projectile reaches target
   */
  constructor(canvasContext, speed, radius, initialPos, target, damage, hooks) {
	this.ctx = canvasContext;
	this.#init(speed, radius, initialPos, target, damage, hooks);
  }

  update(dt) {
	this.position.x += this.velocity.x*dt;
	this.position.y += this.velocity.y*dt;
	if (this.position.y - this.target.height < this.target.y) {
	  this.live = false;
	  this.hooks.forEach(hook => hook(dt, this));
	}
  }

  #init(speed, radius, initialPos, target, damage, hooks) {
	this.position = initialPos;
	this.radius = radius;
	this.target = target;
	this.velocity = {
	  x: speed*(this.target.x - this.position.x),
	  y: speed*(this.target.y - this.position.y)
	};
	this.hooks = hooks;
	this.live = true;
	return this;
  }

  recycle(speed, radius, initialPos, target, damage, hooks) {
	this.#init(speed, radius, initialPos, target, damage, hooks);
	return this;
  }

  draw() {
	  this.ctx.strokeStyle = "yellow";
	  this.ctx.beginPath();
	  const shotDrawPos = {
		x: this.position.y - 4 < this.target.y ? this.target.x : this.position.x,
		y: this.position.y - 4 < this.target.y ? this.target.y : this.position.y,
	  };
	  this.ctx.arc(Math.round(shotDrawPos.x), Math.round(shotDrawPos.y), Math.round(this.radius), 0, 2*Math.PI);
	  this.ctx.stroke();
  }
}
