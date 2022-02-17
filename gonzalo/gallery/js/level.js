export class Level {
  static maxTargets = 10;

  constructor(ctx) {
	this.ctx = ctx;
	const row = Math.round(this.ctx.canvas.height/4);
	const col = Math.round(this.ctx.canvas.width/3);
	this.targets = [
	  {x: col, y: row, live: true},
	  {x: col*1.5, y: row, live: true},
	  {x: col*2, y: row, live: true},
	];
  }

  update(dt) {

  }

  draw(dt) {
	const ctx = this.ctx;
	this.targets.filter(target => target.live).forEach(target => {
	  ctx.fillStyle = "pink";
	  ctx.beginPath();
	  ctx.arc(target.x, target.y, 10, 0, 2*Math.PI);
	  ctx.closePath();
	  ctx.fill();
	});
  }

  getHitTargetHook() {
	const targets = this.targets;
	const hitTargetHook = function(dt, shot) {
	  targets.filter(target => target.live).forEach(target => {
		const dist = Math.sqrt(Math.pow(target.x - shot.target.x, 2) + Math.pow(target.y - shot.target.y, 2));
		if (dist <= 16) {
		  target.live = false;
		}
	  });	  
	};
	return hitTargetHook;
  }
}
