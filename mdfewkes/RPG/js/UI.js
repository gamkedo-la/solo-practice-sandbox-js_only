const borderSize = 3;
const borderBack = borderSize * 2;

class UIElement {
	constructor(name, x, y, w, h, parent) {
		this.name = name;
		this.parent = parent;

		this.parts = [];
		this.active = [];

		this.updatePosition(x, y, w, h);

	}

	update() {
		for (var i = 0; i < this.active.length; i++) {
			this.active[i].update();
		}
	}

	draw() {
		this.onDraw();

		for (var i = 0; i < this.active.length; i++) {
			this.active[i].draw();
		}
	}

	onDraw() {
		colorRect(this.x, this.y, this.w, this.h, 'blue');
		colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'lightblue');		
	}

	addPart(part, isActive = true) {
		this.parts.push(part);
		if (isActive) this.active.push(part);
		return part;

	}

	removePart(part) {
		var partIndex = this.parts.indexOf(part);
		if (partIndex < 0) return;

		this.parts[partIndex].setActive(false);
		this.parts.splice(partIndex, 1);
	}

	addToParent() {
		this.parent.addPart(this);
	}

	removeFromParent() {
		this.parent.removePart(this);
	}

	setMostActive() {
		this.parent.active.push(this.parent.active.splice(this.parent.active.indexOf(this), 1)[0]);
	}

	setActive(isActive) {
		if (isActive && !this.isActive()) {
			this.parent.active.push(this);
			return;
		}
		if (!isActive && this.isActive()) {
			this.parent.active.splice(this.parent.active.indexOf(this), 1);
			return;
		}
	}

	isActive() {
		return this.parent.active.includes(this);
	}

	leftMouseClick(x, y) {
		this.setMostActive();

		for (var i = this.active.length -1; i >= 0; i--) {
			if (isInElement(this.active[i], x, y)) {
				this.active[i].leftMouseClick(x, y);
				break;
			}
		}
	}

	updatePosition(x = this.xoff, y = this.yoff, w = this.w, h = this.h) {
		this.xoff = x;
		this.yoff = y;
		this.x = this.xoff + this.parent.x;
		this.y = this.yoff + this.parent.y;
		this.w = w;
		this.h = h;

		for (var i = 0; i < this.parts.length; i++) {
			this.parts[i].updatePosition();
		}
	}
}

function isInElement(uiElement, x, y) {
	var topLeftX = uiElement.x;
	var topLeftY = uiElement.y;
	var bottomRightX = topLeftX + uiElement.w;
	var bottomRightY = topLeftY + uiElement.h;
	var boolResult = (x >= topLeftX && x <= bottomRightX &&
		y >= topLeftY && y <= bottomRightY);
	return boolResult;
}

class UIMainInterface extends UIElement {
	constructor(screenWidth, screenHeight) {
		super("", 0, 0, screenWidth, screenHeight, {x:0, y:0});
	}

	update() {
		super.update();

		if (Key.isJustPressed(Key.MOUSE_LEFT) /*&& isInElement(this, mouseX, mouseY)*/) {
			this.leftMouseClick(mouseX, mouseY);
		}
	}

	draw() {
		for (var i = 0; i < this.active.length; i++) {
			this.active[i].draw();
		}
	}

	onDraw() {}
	addToParent() {}
	removeFromParent() {}
	setMostActive() {}
	setActive(isActive) {}
	isActive() { return true; }
}

class UIButton extends UIElement {
	constructor(name, x, y, w, h, parent) {
		super(name, x, y, w, h, parent);
	}

	leftMouseClick(x, y) {
		super.leftMouseClick(x, y);
		this.onClick();
	}

	onDraw() {
		super.onDraw();

		if (isInElement(this, mouseX, mouseY)) {
			colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'dodgerblue');
			if (Key.isJustPressed(Key.MOUSE_LEFT)) {
				colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'white');
			}
		}
	}

	onClick() {
		console.log("click");
	}
}

class UIButtonWToolTip extends UIButton {
	constructor(name, x, y, w, h, parent, toolTip = "") {
		super(name, x, y, w, h, parent);

		this.toolTip = toolTip;
	}

	onDraw() {
		super.onDraw();

		if (this.toolTip != "" && isInElement(this, mouseX, mouseY)) {
			colorTextOutline(this.toolTip, mouseX + 14, mouseY + 11, "black", "white");
		}
	}
}

class UIToggleWToolTip extends UIButtonWToolTip {
	constructor(name, x, y, w, h, parent, toolTip = "", toggle = false) {
		super(name, x, y, w, h, parent);

		this.toolTip = toolTip;
		this.toggle = toggle;
	}

	onDraw() {
		super.onDraw();

		if (this.toggle) {
			colorRect(this.x + borderSize*2, this.y + borderSize*2, this.w - borderBack*2, this.h - borderBack*2, 'blue');		
		}
	}

	onClick() {
		this.toggle = this.toggle ? false : true;

		if (this.toggle) this.onTrue();
		else this.onFalse();
	}

	onTrue() {

	}

	onFalse() {

	}
}

class UICloseButton extends UIButton {
	onDraw() {
		super.onDraw();

		colorLine(this.x, this.y, this.x + this.w, this.y + this.h, 3, 'blue');
		colorLine(this.x, this.y + this.h, this.x + this.w, this.y, 3, 'blue');
	}

	onClick() {
		this.parent.setActive(false);
	}
}

class UIMoveBar extends UIElement {
	constructor(name, x, y, w, h, parent) {
		super(name, x, y, w, h, parent);

		this.grabbed = false;
		this.grabbedX = -1;
		this.grabbedY = -1;
		this.parentX = -1;
		this.parentY = -1;
	}

	leftMouseClick(x, y) {
		super.leftMouseClick(x, y);

		this.grabbed = true;
		this.grabbedX = mouseX;
		this.grabbedY = mouseY;
		this.parentX = this.parent.x;
		this.parentY = this.parent.y;
	}

	update() {
		if (!mouseIsDown || mouseX < 0 || mouseY < 0 || mouseX >= screenWidth || mouseY >= screenHeight) {
			this.grabbed = false;
		}

		if (this.grabbed) {
			var newX = this.parentX + mouseX - this.grabbedX;
			var newY = this.parentY + mouseY - this.grabbedY;
			this.parent.updatePosition(newX, newY);
		}

		super.update();
	}

	onDraw() {
		super.onDraw();
		colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'skyblue');
	}
}

class UITextLabel extends UIElement {
	constructor(name, x, y, w, h, parent) {
		super(name, x, y, w, h, parent);

		this.size = 14;
		this.textAlignment = "left";
		this.label = "";
	}

	onDraw() {
		colorText(this.label, this.x, this.y, 'black', this.size + "px Arial", this.textAlignment)
	}
}