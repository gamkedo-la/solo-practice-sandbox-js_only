const borderSize = 3;
const borderBack = borderSize * 2;

class UIElement {
	constructor(name, x, y, w, h, parent) {
		this.name = name;
		this.parent = parent;
		this.xoff = x;
		this.yoff = y;
		this.x = this.xoff + this.parent.x;
		this.y = this.yoff + this.parent.y;
		this.w = w;
		this.h = h;

		this.parts = [];
		this.active = [];
	}

	update() {
		for (var i = 0; i < this.active.length; i++) {
			this.active[i].update();
		}
	}

	draw() {
		colorRect(this.x, this.y, this.w, this.h, 'blue');
		colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'lightblue');

		for (var i = 0; i < this.active.length; i++) {
			this.active[i].draw();
		}
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
		if (this.parent.active.includes(this)) {
			return true;
		} else {
			return false;
		}
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
    // console.log("topLeftX: " + topLeftX + " TopeLeftY: " + topLeftY + " bottomRightX: " + bottomRightX + " bottomRightY: " + bottomRightY);
    return boolResult;
}

class UIMainInterface extends UIElement {
	constructor(screenWidth, screenHeight) {
		super("", 0, 0, screenWidth, screenHeight, {x:0, y:0});
	}

	update() {
		super.update();

		if (Key.isJustPressed(Key.MOUSE_LEFT) && isInElement(this, mouseX, mouseY)) {
			leftMouseClick(mouseX, mouseY);
		}
	}

	draw() {
		for (var i = 0; i < this.active.length; i++) {
			this.active[i].draw();
		}
	}

	setMostActive() {}

	setActive(isActive) {}

	isActive() { return true; }

	updatePosition(x, y, w, h) {}
}

class UIButton extends UIElement {
	constructor(name, x, y, w, h, parent) {
		super(name, x, y, w, h, parent);
	}

	leftMouseClick(x, y) {
		this.setMostActive();
		this.onClick();
	}

	draw() {
		colorRect(this.x, this.y, this.w, this.h, 'blue');
		colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'lightblue');

		if (isInElement(this, mouseX, mouseY)) {
			colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'dodgerblue');
			if (Key.isJustPressed(Key.MOUSE_LEFT)) colorCircle(this.x + this.w * 0.5, this.y + this.h * 0.5, (this.w + this.h) * 0.25 + 10, 'white');
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

	draw() {
		super.draw();

		if (this.toolTip != "" && isInElement(this, mouseX, mouseY)) {
			this.setMostActive();
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

	draw() {
		super.draw();

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
	draw() {
		super.draw();

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
		this.setMostActive();

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
	}

	draw() {
		colorRect(this.x, this.y, this.w, this.h, 'blue');
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

	draw() {
		colorText(this.label, this.x, this.y, 'black', this.size + "px Arial", this.textAlignment)
	}
}

class UIDropdown extends UIElement {
	constructor(name, x, y, w, h, parent) {
		super(name, x, y, w, h, parent);

		this.value = 0;
		this.list = [];
		this.size = 14;
		this.center = false;
		this.textAlignment = "center";

		this.open = false;
		this.listElement;
		this.updateListElement();
		this.activeIndex = -1;
	}

	updateListElement() {
		this.parts.length = 0;
		this.active.length = 0;
		var height = this.list.length * (this.size + 3);
		var y = this.center ? -height * 0.5 : 0;
		if (this.y + y < 0) y -= this.y + y;
		if (this.y + height + y > screenHeight) y -= this.y + height + y - screenHeightc
		this.addPart(new UIDropdownList(this.name + " dropdown list", 0, y, this.w, height, this), this.open);
		this.listElement = this.parts[0];
	}

	closeList() {
		if (this.active.length > 0) this.active.length = 0;
		this.open = false;
	}

	leftMouseClick(x, y) {
		this.setMostActive();

		if (!this.open) {
			this.active.push(this.parts[0]);
			this.open = true;
			//mouseJustPressed = false;
			this.listElement.justOpened = true;
		}
	}

	draw() {
		colorRect(this.x, this.y, this.w, this.h, 'blue');
		colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'skyblue');
		colorText(this.list[this.value], this.x + this.w * 0.5, this.y + this.size, 'black', this.parent.size + "px Arial", this.textAlignment);

		super.draw();
	}

	updatePosition(x = this.xoff, y = this.yoff, w = this.w, h = this.h) {
		super.updatePosition(x, y, w, h);
		this.updateListElement();
	}
}

class UIDropdownList extends UIElement {
	constructor(name, x, y, w, h, parent) {
		super(name, x, y, w, h, parent);

		this.justOpened = true;
	}

	draw() {
		if (Key.isJustPressed(Key.MOUSE_LEFT) && !this.justOpened) {
			if (isInElement(this, mouseX, mouseY)) {
				this.parent.value = this.quantizeMousePosition();
			}
			this.parent.closeList();
			return;
		}

		colorRect(this.x, this.y, this.w, this.h, 'blue');
		colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'skyblue');

		var value = this.parent.value;
		if (isInElement(this, mouseX, mouseY)) {
			value = this.quantizeMousePosition();

		}
		colorRect(this.x + borderSize, this.y + borderSize + value * (this.parent.size + 3), this.w - borderBack, (this.parent.size + 3) - borderBack, 'lightcyan');


		var list = this.parent.list;
		for (var i = 0; i < list.length; i++) {
			colorText(list[i], this.x + this.w * 0.5, this.y + (this.parent.size + 3) * i + this.parent.size - 1, 'black', this.parent.size - 1 + "px Arial", this.parent.textAlignment);
		}

		this.justOpened = false;
	}

	quantizeMousePosition() {
		return Math.min(Math.floor((mouseY - this.y) / (this.parent.size + 3)), this.parent.list.length - 1);
	}
}
