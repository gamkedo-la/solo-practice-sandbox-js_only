import {constants} from "./constants.js";
import {Input} from "./input.js";


export class Editor {
  constructor(ctx, input) {
	this.ctx = ctx;
	this.input = input;
	this.enabled = true;
	this.input.onRelease(Input.EDIT, event => this.toggle());
	this.components = {
	  timeSlider: new TimeSlider(this),
	  enemyPalette: new EnemyPalette(this, ctx.canvas.width - 32),
	};
	this.dragObj = {};
	this.isDragging = false;
	this.data = Array(Math.ceil(TimeSlider.MAX_TIME/constants.TIME_SLOT));
  }

  update(dt) {
	if (!this.isDragging) {
	  if (this.input.mouseButtonHeld && this.input.mousePos.y < this.components.timeSlider.containerY) {
		const mouseX = this.input.mousePos.x;
		const mouseY = this.input.mousePos.y;
		const dragFromPalette = mouseX >= this.components.enemyPalette.containerX;
		if (dragFromPalette) {
		  for (const box of this.components.enemyPalette.enemyBoxes) {
			if (mouseX > box.x && mouseX < box.x + box.width && mouseY > box.y && mouseY < box.y + box.height) {
			  this.isDragging = true;
			  this.dragObj = {
				x: box.x,
				y: box.y,
				width: box.width,
				height: box.height,
				enemy: Object.assign({}, box.enemy),
			  };
			  break;
			}
		  }
		} else {
		  const enemies = this.getEnemiesForTime();
		  for (const [i, enemy] of enemies.entries()) {
			if (mouseX > enemy.x && mouseX < enemy.x + enemy.width && mouseY > enemy.y && mouseY < enemy.y + enemy.height) {
			  this.isDragging = true;
			  Object.assign(this.dragObj, {
				x: enemy.x,
				y: enemy.y,
				width: enemy.width,
				height: enemy.height,
				enemy: enemy,
			  });
			  enemies.splice(i, 1);
			  break;
			}
		  }
		}
	  } else {
		for (const component of Object.values(this.components)) {
		  component.update(this.input, dt);
		}
	  }
	}
	if (this.isDragging) {
	  if (this.input.mouseButtonHeld) {
		this.dragObj.x = this.input.mousePos.x;
		this.dragObj.y = this.input.mousePos.y;
	  } else {
		this.isDragging = false;
		if (this.dragObj.x > 0 && this.dragObj.x + this.dragObj.width < this.components.enemyPalette.containerX && this.dragObj.y < this.components.timeSlider.containerY) {
		  // drop on stage
		  this.dragObj.enemy.x = this.dragObj.x;
		  this.dragObj.enemy.y = this.dragObj.y;
		  this.dragObj.enemy.width = this.dragObj.width;
		  this.dragObj.enemy.height = this.dragObj.height;
		  this.dragObj.enemy.alive = true;
		  this.dropEnemy();
		}
	  }
	}
  }

  getTimeIndex() {
	return this.components.timeSlider.selectedTime/constants.TIME_SLOT;
  }

  dropEnemy() {
	const index = this.getTimeIndex();
	if (typeof this.data[index] === "undefined") {
	  this.data[index] = [];
	}
	this.data[index].push(this.dragObj.enemy);
	console.log("DATA UPDATED", this.data);
  }

  getEnemiesForTime() {
	return this.data[this.getTimeIndex()] || [];
  }

  draw() {
	for (const component of Object.values(this.components)) {
	  component.draw(this.ctx);
	}
	for (const enemy of this.getEnemiesForTime()) {
	  this.ctx.fillStyle = enemy.color;
	  this.ctx.fillRect(Math.round(enemy.x), Math.round(enemy.y), enemy.width, enemy.height);
	}
	const timeIndex = this.getTimeIndex();
	const oldAlpha = this.ctx.globalAlpha;
	this.ctx.globalAlpha = 0.3;

	for (let i=0; i<this.data.length; i++) {
	  const enemies = this.data[i];
	  if (i >= timeIndex || typeof enemies === "undefined") {
		continue;
	  }
	  const time = (timeIndex - i)*constants.TIME_SLOT;
	  for (const enemy of enemies) {
		this.ctx.fillStyle = enemy.color;
		const updated = enemy.updater(enemy, time/1000);
		if (updated.alive) {
		  this.ctx.fillRect(Math.round(updated.x), Math.round(updated.y), enemy.width, enemy.height);
		}
	  }
	}
	this.ctx.globalAlpha = oldAlpha;
	if (this.isDragging) {
	  this.ctx.fillStyle = this.dragObj.enemy.color;
	  const oldAlpha = this.ctx.globalAlpha;
	  this.ctx.globalAlpha = 0.5;
	  this.ctx.fillRect(Math.round(this.dragObj.x), Math.round(this.dragObj.y), this.dragObj.width, this.dragObj.height);
	  this.ctx.globalAlpha = oldAlpha;
	}
  }

  toggle() {
	this.enabled = !this.enabled;
  }
}

class TimeSlider {
  static SPEED = 2;
  static MAX_TIME = 20000; // ms
  static HEIGHT = 24;
  
  constructor(editor) {
	this.editor = editor;
	this.sliderPos = 0;
	this.containerY = this.editor.ctx.canvas.height - TimeSlider.HEIGHT;
	this.isDragging = false;
	this.selectedTime = 0; // in ms
	this.sliderWidth = Math.floor(this.timeToPos(constants.TIME_SLOT)) - 2;
  }

  pos2Time(pos) {
	const time = Math.round((TimeSlider.MAX_TIME / (this.editor.ctx.canvas.width)) * pos);
	return time - (time % constants.TIME_SLOT);
  }

  timeToPos(time) {
	return ((this.editor.ctx.canvas.width) / TimeSlider.MAX_TIME) * time;
  }
  
  update(input, dt) {
	// TODO: implement discrete steps
	if (input.left) {
	  this.selectedTime = Math.max(0, this.selectedTime - TimeSlider.TIME_SLOT);
	  this.sliderPos = this.timeToPos(this.selectedTime);
	  console.log("Changed time slider position", this.sliderPos, "TIME:", this.selectedTime);
	}
	if (input.right) {
	  this.selectedTime = Math.max(TimeSlider.MAX_TIME, this.selectedTime + TimeSlider.TIME_SLOT);
	  this.sliderPos = this.timeToPos(this.selectedTime);
	  console.log("Changed time slider position", this.sliderPos, "TIME:", this.selectedTime);
	}
	if (input.mouseButtonHeld && input.mousePos.y >= this.containerY) {
	  this.sliderPos = Math.min(Math.max(input.mousePos.x, 0), this.editor.ctx.canvas.width - 10);
	  this.isDragging = true;
	} else if (!input.mouseButtonHeld && this.isDragging) {
	  this.isDragging = false;
	  this.selectedTime = this.pos2Time(this.sliderPos);
	  this.sliderPos = this.timeToPos(this.selectedTime) + 1;
	  console.log("Changed time slider position", this.sliderPos, "TIME:", this.selectedTime);
	}
  }

  draw(ctx) {
	ctx.fillStyle = "pink";
	ctx.fillRect(0, this.containerY, ctx.canvas.width, ctx.canvas.height);
	ctx.strokeStyle = "#000";
	for (let t=0; t<=TimeSlider.MAX_TIME; t+=constants.TIME_SLOT) {
	  const pos = Math.round(this.timeToPos(t));
	  ctx.beginPath();
	  ctx.moveTo(pos, this.containerY);
	  ctx.lineTo(pos, ctx.canvas.height);
	  ctx.lineWidth = 1;
	  ctx.stroke();
	  ctx.closePath();
	}
	ctx.fillStyle = "brown";
	ctx.fillRect(Math.round(this.sliderPos), this.containerY, this.sliderWidth, ctx.canvas.height);
  }
}

function updateGhost(ghost, dt) {
  const speed = 20;
  const updated = Object.create(ghost);
  updated.x += speed*dt;
  return updated;
}

function updateGoblin(goblin, dt) {
  const speed = 32;
  const updated = Object.create(goblin);
  updated.x += speed*dt;
  return updated;
}

function updateZombie(zombie, dt) {
  const speed = 10;
  const updated = Object.create(zombie);
  updated.x += speed*dt;
  return updated;
}

function updateSkeleton(skeleton, dt) {
  const speed = 24;
  const updated = Object.create(skeleton);
  updated.y += speed*dt;
  return updated;
}

class EnemyPalette {
  static margin = 4;
  static boxSize = 24;
  
  constructor(editor, containerX) {
	this.editor = editor;
	this.containerX = containerX;
	this.height = editor.ctx.canvas.height - 24;
	this.enemies = [
	  {name: "GHOST", color: "pink", updater: updateGhost},
	  {name: "GOBLIN", color: "red", updater: updateGoblin},
	  {name: "ZOMBIE", color: "orange", updater: updateZombie},
	  {name: "SKELETON", color: "magenta", updater: updateSkeleton},
	  {name: "EVILEYE", color: "yellow", updater: updateGhost},
	];
	const enemyBoxX = this.containerX + EnemyPalette.margin;
	this.enemyBoxes = this.enemies.map((enemy, i) => ({
	  x: enemyBoxX,
	  y: EnemyPalette.boxSize*i + EnemyPalette.margin*(i + 1),
	  width: EnemyPalette.boxSize,
	  height: EnemyPalette.boxSize,
	  enemy: enemy,
	}));
	this.isDragging = false;
	this.dragObj = {};
  }

  update(input, dt) {
  }

  draw(ctx) {
	ctx.fillStyle = "salmon";
	ctx.fillRect(this.containerX, 0, ctx.canvas.width, this.height);
	this.enemyBoxes.forEach(box => {
	  ctx.fillStyle = box.enemy.color;
	  ctx.fillRect(box.x, box.y, EnemyPalette.boxSize, EnemyPalette.boxSize);
	});
	if (this.isDragging) {
	  ctx.strokeStyle = "lime";
	  ctx.strokeRect(Math.round(this.dragObj.x), Math.round(this.dragObj.y), EnemyPalette.boxSize, EnemyPalette.boxSize);
	}
  }
}
