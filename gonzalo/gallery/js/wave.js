import {Enemy} from "./enemy.js";

export class Wave {
  constructor(ctx, showDelay, showTimeOffset, hideDelay, hideTimeOffset, enemySpecs) {
	this.ctx = ctx;
	this.live = true;
	this.showDelay = showDelay;
	this.showTimeOffset = showTimeOffset;
	this.hideDelay = hideDelay;
	this.hideTimeOffset = hideTimeOffset;
	this.enemySpecs = enemySpecs;
	this.timer = 0;
  }

  update(dt) {
	if (!this.live) {
	  return;
	}
	this.timer += dt;
	if (this.timer >= this.showDelay) {
	  this.live = false;
	  for (let i=0; i<this.enemySpecs.length; i++) {
		const data = this.enemySpecs[i];
		  Enemy.spawn(this.ctx, data.x, data.y, this.showTimeOffset*i, this.hideDelay + this.hideTimeOffset*i + this.showTimeOffset*(this.enemySpecs.length - i - 1), data.role);
	  }
	}
  }
  // draw() {
  // 	const ctx = this.ctx;
  // }
}
