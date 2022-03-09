import {Enemy} from "./enemy.js";

export class Wave {
  constructor(ctx, showDelay, showTimeOffset, hideDelay, hideTimeOffset, positions) {
	this.ctx = ctx;
	this.live = true;
	this.showDelay = showDelay;
	this.showTimeOffset = showTimeOffset;
	this.hideDelay = hideDelay;
	this.hideTimeOffset = hideTimeOffset;
	this.positions = positions;
	this.timer = 0;
  }

  update(dt) {
	if (!this.live) {
	  return;
	}
	this.timer += dt;
	if (this.timer >= this.showDelay) {
	  this.live = false;
	  for (let i=0; i<this.positions.length; i++) {
		const pos = this.positions[i];
		Enemy.spawn(this.ctx, pos.x, pos.y, this.showTimeOffset*i, this.hideDelay + this.hideTimeOffset*i + this.showTimeOffset*(this.positions.length - i - 1));
	  }
	}
  }
  // draw() {
  // 	const ctx = this.ctx;
  // }
}
