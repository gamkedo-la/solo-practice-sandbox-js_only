var borderSize = 1;
var borderBack = 3;//borderSize * 2;

class UIElement {
	constructor(name, x, y, w, h) {
		this.name = name;
		this.parent = {x:0, y:0};
		this._mi = null;

		this.parts = [];
		this.active = [];

		this.updatePosition(x, y, w, h);
	}

	update() {
		for (var i = this.active.length-1; i >= 0; i--) {
			this.active[i].update();
		}

		this.onUpdate();
	}

	onUpdate() {}

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

	leftMouseClick(x, y) {
		this.setMostActive();

		for (var i = this.active.length -1; i >= 0; i--) {
			if (isInElement(this.active[i], x, y)) {
				this.active[i].leftMouseClick(x, y);
				mouseJustPressed = false;
				return;
			}
		}

		this.onLeftMouseClick();
	}

	onLeftMouseClick() {
	}

	addPart(part, isActive = true) {
		part.parent = this;
		part.updatePosition();

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

	setMostActive() {
		if (!this.isActive()) {
			this.setActive();
			return;
		}

		this.parent.active.splice(this.parent.active.indexOf(this), 1);
		this.parent.active.push(this);
	}

	setLeastActive() {
		if (!this.isActive()) {
			this.setActive();
			return;
		}

		this.parent.active.splice(this.parent.active.indexOf(this), 1);
		this.parent.active.unshift(this);
	}

	setActive(isActive = true) {
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

	updatePosition(x = this.xoff, y = this.yoff, w = this.w, h = this.h) {
		this.w = w;
		this.h = h;
		this.xoff = x;
		this.yoff = y;
		this.x = this.xoff + this.parent.x;
		this.y = this.yoff + this.parent.y;

		for (var i = 0; i < this.parts.length; i++) {
			this.parts[i].updatePosition();
		}
	}

	mi() {
		if (this._mi == null) {
			this._mi = this.parent.mi();
		}

		return this._mi;
	}
}

function isInElement(uiElement, x, y) {
    var topLeftX = uiElement.x;
    var topLeftY = uiElement.y;
    var bottomRightX = topLeftX + uiElement.w;
    var bottomRightY = topLeftY + uiElement.h;
    var boolResult = (x >= topLeftX && x <= bottomRightX &&
        y >= topLeftY && y <= bottomRightY);
    // console.log("topLeftX: " + topLeftX + " TopeLeftY: " + topLeftY + " bottomRightX: " + bottomRightX + " bottomRightY: " + bottomRightY);
    return boolResult;
}

class UIMainInterface extends UIElement {
	constructor(name, screenWidth, screenHeight) {
		super(name, 0, 0, screenWidth, screenHeight);
		this._mi = this;

		this.lateDraw = [];
	}

	draw() {
		super.draw();

		for (var i = 0; i < this.lateDraw.length; i++) {
			this.lateDraw[i].lateDraw();
		}

		this.lateDraw.length = 0;
	}

	onUpdate() {
		if (mouseJustPressed /*&& isInElement(this, mouseX, mouseY)*/) {
			this.leftMouseClick(mouseX, mouseY);
		}
	}

	onDraw() {}
	setMostActive() {}
	setLeastActive() {}
	setActive(isActive) {}
	isActive() { return true; }
}

class UIMaskBox extends UIElement {
	constructor(name, x, y, w, h) {
		super(name, x, y, w, h);

		this.xoffset = 0;
		this.yoffset = 0;
		this.offsetChanged = false;

		this.canvas = document.createElement("Canvas");
		this.canvasContext = this.canvas.getContext("2d");

		this.canvas.width = canvas.width;
		this.canvas.height = canvas.height;

		this.drawBorder = false;
	}

	onUpdate() {
		if (!this.offsetChanged) return;

		this.x += this.xoffset;
		this.y += this.yoffset;

		for (var i = 0; i < this.active.length; i++) {
			this.active[i].updatePosition();
		}

		this.x -= this.xoffset;
		this.y -= this.yoffset;
	}

	draw() {
		var stowCanvas = canvas;
		var stowContext = canvasContext;
		canvas = this.canvas;
		canvasContext = this.canvasContext;

		if (this.drawBorder) {
			super.onDraw();
		} else {
			colorRect(this.x, this.y, this.w, this.h, 'lightblue');		
		}

		for (var i = 0; i < this.active.length; i++) {
			this.active[i].draw();
		}

		canvas = stowCanvas;
		canvasContext = stowContext;

		this.onDraw();
	}

	onDraw() {
		canvasContext.drawImage( 
			this.canvas,
			this.x, this.y, 
			this.w, this.h,
			this.x, this.y,
			this.w, this.h
		);
	}

	setOffset(x, y) {
		this.xoffset = x;
		this.yoffset = y;
		this.offsetChanged = true;
	}

	setOffsetX(x) {
		this.setOffset(x, this.yoffset);
	}

	setOffsetY(y) {
		this.setOffset(this.xoffset, y);
	}

	addOffset(x, y) {
		this.setOffset(this.xoffset + x, this.yoffset + y);
	}

	addOffsetX(x) {
		this.addOffset(x, 0);
	}

	addOffsetY(y) {
		this.addOffset(0, y);
	}
}

class UIButton extends UIElement {
	constructor(name, x, y, w, h) {
		super(name, x, y, w, h);
	}

	onLeftMouseClick() {
		this.onClick();
	}

	onDraw() {
		super.onDraw();

		if (isInElement(this, mouseX, mouseY)) {
			colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'dodgerblue');
			if (mouseJustPressed) {
				colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'white');
			}
		}
	}

	onClick() {
		console.log("clicked " + this.name);
	}
}

class UICloseButton extends UIButton {
	onDraw() {
		super.onDraw();

		colorLine(this.x, this.y, this.x + this.w, this.y + this.h, 3, 'blue');
		colorLine(this.x, this.y + this.h, this.x + this.w, this.y, 3, 'blue');
	}

	onLeftMouseClick() {
		super.onLeftMouseClick();
		this.parent.setActive(false);
	}
}

class UIButtonWToolTip extends UIButton {
	constructor(name, x, y, w, h, tipText = "") {
		super(name, x, y, w, h);

		this.toolTip = tipText;
		this.textAlignment = "start";
	}

	onDraw() {
		super.onDraw();

		if (this.toolTip != "" && isInElement(this, mouseX, mouseY)) {
			this.mi().lateDraw.push(this);
		}
	}

	lateDraw() {
		colorText(this.toolTip, mouseX+1, mouseY+1, "white", "14px Arial", this.textAlignment);
		colorText(this.toolTip, mouseX-1, mouseY+1, "white", "14px Arial", this.textAlignment);
		colorText(this.toolTip, mouseX+1, mouseY-1, "white", "14px Arial", this.textAlignment);
		colorText(this.toolTip, mouseX-1, mouseY-1, "white", "14px Arial", this.textAlignment);
		colorText(this.toolTip, mouseX,   mouseY,   "black", "14px Arial", this.textAlignment);
	}
}

class UIToggle extends UIButton {
	constructor(name, x, y, w, h) {
		super(name, x, y, w, h);

		this.toggle = false;
	}

	onDraw() {
		super.onDraw();

		if (this.toggle) {
			colorRect(this.x + borderSize*2, this.y + borderSize*2, this.w - borderBack*2, this.h - borderBack*2, 'blue');		
		}
	}

	onLeftMouseClick() {
		this.toggle = this.toggle ? false : true;

		if (this.toggle) this.onTrue();
		else this.onFalse();

		super.onLeftMouseClick();
	}

	onClick() {}
	onTrue() {}
	onFalse() {}
}

class UIToggleWToolTip extends UIToggle {
	constructor(name, x, y, w, h, tipText = "") {
		super(name, x, y, w, h);

		this.toolTip = tipText;
		this.textAlignment = "start";
	}

	onDraw() {
		super.onDraw();

		if (this.toolTip != "" && isInElement(this, mouseX, mouseY)) {
			this.mi().lateDraw.push(this);
		}
	}

	lateDraw() {
		colorText(this.toolTip, mouseX+1, mouseY+1, "white", "14px Arial", this.textAlignment);
		colorText(this.toolTip, mouseX-1, mouseY+1, "white", "14px Arial", this.textAlignment);
		colorText(this.toolTip, mouseX+1, mouseY-1, "white", "14px Arial", this.textAlignment);
		colorText(this.toolTip, mouseX-1, mouseY-1, "white", "14px Arial", this.textAlignment);
		colorText(this.toolTip, mouseX,   mouseY,   "black", "14px Arial", this.textAlignment);
	}
}

class UIMoveBar extends UIElement {
	constructor(name, x, y, w, h) {
		super(name, x, y, w, h);

		this.grabbed = false;
		this.grabbedX = -1;
		this.grabbedY = -1;
		this.parentX = -1;
		this.parentY = -1;
	}

	onLeftMouseClick() {
		this.grabbed = true;
		this.grabbedX = mouseX;
		this.grabbedY = mouseY;
		this.parentX = this.parent.x;
		this.parentY = this.parent.y;
	}

	onUpdate() {
		if (!mouseIsDown || mouseX < 0 || mouseY < 0 || mouseX >= this.mi.w || mouseY >= this.mi.h) {
			this.grabbed = false;
		}

		if (this.grabbed) {
			var newX = this.parentX + mouseX - this.grabbedX;
			var newY = this.parentY + mouseY - this.grabbedY;

			this.parent.updatePosition(newX, newY);
		}
	}

	onDraw() {
		super.onDraw();
		colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'skyblue');
	}
}

class UITextLabel extends UIElement {
	constructor(name, x, y, w, h, text = "") {
		super(name, x, y, w, h);

		this.size = 14;
		this.textAlignment = "left";
		this.label = text;
	}

	onDraw() {
		colorText(this.label, this.x, this.y, 'black', this.size + "px Arial", this.textAlignment)
	}
}

class UIDropdown extends UIElement {
	constructor(name, x, y, w, h) {
		super(name, x, y, w, h);

		this.value = 0;
		this.list = [];
		this.size = 14;
		this.center = false;
		this.textAlignment = "center";

		this.open = false;
		this.updateListElement();
	}

	onLeftMouseClick() {
		if (!this.open) {
			this.openList();
		}
	}

	onDraw() {
		colorRect(this.x, this.y, this.w, this.h, 'blue');
		colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'skyblue');
		colorText(this.list[this.value], this.x + this.w * 0.5, this.y + this.size, 'black', this.parent.size + "px Arial", this.textAlignment);
	}

	updatePosition(x = this.xoff, y = this.yoff, w = this.w, h = this.h) {
		super.updatePosition(x, y, w, h);
		this.updateListElement();
	}

	updateListElement() {
		if (this.list == undefined) return;

		this.parts.length = 0;
		this.active.length = 0;
		var height = this.list.length * (this.size + 3);
		var y = this.center ? -height * 0.5 : 0;
		if (this.y + y < 0) y -= this.y + y;
		if (this.y + height + y > canvas.height) y -= this.y + height + y - canvas.height
		this.addPart(new UIDropdownList(this.name + " dropdown list", 0, y, this.w, height, this), this.open);
	}

	closeList() {
		if (this.active.length > 0) this.active.length = 0;
		this.open = false;
		mouseJustPressed = false;
	}

	openList() {
		this.active.push(this.parts[0]);
		this.open = true;
		this.parts[0].justOpened = true;
	}
}

class UIDropdownList extends UIElement {
	constructor(name, x, y, w, h) {
		super(name, x, y, w, h);

		this.justOpened = false;
	}

	onUpdate() {
		if (mouseJustPressed && !this.justOpened) {
			if (isInElement(this, mouseX, mouseY)) {
				this.parent.value = this.quantizeMousePositionY();
				mouseJustPressed = false;
				mouseJustReleased = true;
			}
			this.parent.closeList();
			return;
		}

		this.justOpened = false;
	}

	onDraw() {
		colorRect(this.x, this.y, this.w, this.h, 'blue');
		colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'skyblue');

		var value = this.parent.value;
		if (isInElement(this, mouseX, mouseY)) {
			value = this.quantizeMousePositionY();

		}
		colorRect(this.x + borderSize, this.y + borderSize + value * (this.parent.size + 3), this.w - borderBack, (this.parent.size + 3) - borderBack, 'lightcyan');


		var list = this.parent.list;
		for (var i = 0; i < list.length; i++) {
			colorText(list[i], this.x + this.w * 0.5, this.y + (this.parent.size + 3) * i + this.parent.size - 1, 'black', this.parent.size - 1 + "px Arial", this.parent.textAlignment);
		}
	}

	quantizeMousePositionY() {
		return Math.min(Math.floor((mouseY - this.y) / (this.parent.size + 3)), this.parent.list.length - 1);
	}
}