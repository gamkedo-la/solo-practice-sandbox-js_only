export class Level {
  static maxTargets = 10;
  static gridWidth = 20;
  static gridHeight = 11;
  static tileSize = 16; // pixels

  static getXForGridIndex(i) {
	return i % Level.gridWidth;
  }

  static getYForGridIndex(i) {
	return Math.floor(i/Level.gridWidth);
  }

  constructor(ctx) {
	this.ctx = ctx;

	const gridSize = Level.gridWidth * Level.gridHeight;
	// Populate targets in grid
	this.targets = {};
	while (Object.keys(this.targets).length < Level.maxTargets) {
	  const i = Math.floor(Math.random() * gridSize);
	  if (!Object.keys(this.targets).includes(i)) {
		this.targets[i] = {
		  live: true,
		  x: Level.getXForGridIndex(i)*Level.tileSize,
		  y: Level.getYForGridIndex(i)*Level.tileSize,
		};
	  }
	}
  }

  update(dt) {

  }

  draw(dt) {
	const ctx = this.ctx;
	Object.values(this.targets).filter(target => target.live).forEach(target => {
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
	  Object.values(targets).filter(target => target.live).forEach(target => {
		const dist = Math.sqrt(Math.pow(target.x - shot.target.x, 2) + Math.pow(target.y - shot.target.y, 2));
		if (dist <= 16) {
		  target.live = false;
		}
	  });	  
	};
	return hitTargetHook;
  }
}
