import {Input} from "./input.js";

export class Editor {
  static enemyTypes = [
	{},
	{},
	{},
	{},
	{},
  ];

  constructor(ctx, input) {
	this.ctx = ctx;
	this.input = input;
	this.enabled = true;
	this.input.onRelease(Input.EDIT, event => this.toggle());
	this.components = {
	  timeSlider: new TimeSlider(this),
	  enemyPalette: new EnemyPalette(this, ctx.canvas.width - 32),
	  stage: new Stage(ctx.canvas.width - 28, ctx.canvas.height - 24),
	};
	this.dragObj = {};
	this.isDragging = false;
  }

  update(dt) {
	if (!this.isDragging) {
	  if (this.input.mouseButtonHeld && this.input.mousePos.y < this.components.timeSlider.containerY) {
		const mouseX = this.input.mousePos.x;
		const mouseY = this.input.mousePos.y;
		const boxes = mouseX >= this.components.enemyPalette.containerX ? this.components.enemyPalette.enemyBoxes : this.components.stage.enemies;
		for (const box of boxes) {
		  if (mouseX > box.x && mouseX < box.x + box.width && mouseY > box.y && mouseY < box.y + box.height) {
			this.isDragging = true;
			Object.assign(this.dragObj, box);
			break;
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
		  this.components.stage.enemies.push(this.dragObj.enemy);
		}
	  }
	}
  }

  draw() {
	for (const component of Object.values(this.components)) {
	  component.draw(this.ctx);
	}
	if (this.isDragging) {
	  this.ctx.strokeStyle = "lime";
	  this.ctx.strokeRect(Math.round(this.dragObj.x), Math.round(this.dragObj.y), this.dragObj.width, this.dragObj.height);
	}
  }

  toggle() {
	this.enabled = !this.enabled;
  }
}

class Stage {
  constructor(width, height) {
	this.enemies = [];
	this.isDragging = false;
	this.dragObj = null;
	this.width = width;
	this.height = height;
  }

  update(input, dt) {
  }

  draw(ctx) {
	for (const enemy of this.enemies) {
	  ctx.fillStyle = "pink";
	  ctx.fillRect(Math.round(enemy.x), Math.round(enemy.y), enemy.width, enemy.height);
	}
  }
}

class TimeSlider {
  static SPEED = 2;
  
  constructor(editor) {
	this.editor = editor;
	this.sliderPos = 0;
	this.containerY = this.editor.ctx.canvas.height - 24;
  }


  update(input, dt) {
	if (input.left) {
	  this.sliderPos -= TimeSlider.SPEED;
	}
	if (input.right) {
	  this.sliderPos += TimeSlider.SPEED;
	}
	if (input.mouseButtonHeld && input.mousePos.y >= this.containerY) {
	  this.sliderPos = input.mousePos.x;
	}
	this.sliderPos = Math.min(Math.max(this.sliderPos, 0), this.editor.ctx.canvas.width - 10);
  }

  draw(ctx) {
	ctx.fillStyle = "pink";
	ctx.fillRect(0, this.containerY, ctx.canvas.width, ctx.canvas.height);
	ctx.fillStyle = "brown";
	ctx.fillRect(Math.round(this.sliderPos), this.containerY, 10, ctx.canvas.height);
  }
}

class EnemyPalette {
  static margin = 4;
  static boxSize = 24;
  
  constructor(editor, containerX) {
	this.editor = editor;
	this.containerX = containerX;
	this.height = editor.ctx.canvas.height - 24;
	this.enemies = [{}, {}, {}];
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
	ctx.fillStyle = "dimgray";
	this.enemyBoxes.forEach(box => {
	  // console.log("Drawing enemy", box, "at Y", box.y);
	  ctx.fillRect(box.x, box.y, EnemyPalette.boxSize, EnemyPalette.boxSize);
	});
	if (this.isDragging) {
	  ctx.strokeStyle = "lime";
	  ctx.strokeRect(Math.round(this.dragObj.x), Math.round(this.dragObj.y), EnemyPalette.boxSize, EnemyPalette.boxSize);
	}
  }
}
