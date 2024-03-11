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

class UIScrollBox extends UIElement {
	constructor(name, x, y, w, h) {
		super(name, x, y, w, h);

		this.mask = this.addPart(new UIMaskBox("Scroll Mask", borderSize, borderSize, this.w - borderBack, this.h - borderBack));
		this.padding = 10;
		this.minOffsetX = 0;
		this.minOffsetY = 0;
		this.maxOffsetX = 0;
		this.maxOffsetY = 0;

		this.addPart = function(part) {
			let newPart = this.mask.addPart(part);
			this.findMaxOffset();
			this.validateScrollPosition();

			return newPart;
		}
		this.removePart = function(part) {
			this.mask.removePart(part);
			this.findMaxOffset();
			this.validateScrollPosition();
		}
	}

	scrollUp() {
		this.mask.addOffsetY(40);
		this.validateScrollPosition();
	}

	scrollDown() {
		this.mask.addOffsetY(-40);
		this.validateScrollPosition();
	}

	scrollLeft() {
		this.mask.addOffsetX(40);
		this.validateScrollPosition();
	}


	scrollRight() {
		this.mask.addOffsetX(-40);
		this.validateScrollPosition();
	}

	findMaxOffset() {
		this.maxOffsetX = 0;
		this.maxOffsetY = 0;
		this.minOffsetX = 0;
		this.minOffsetY = 0;
		for (let i = 0; i < this.mask.active.length; i++) {
			let part = this.mask.active[i];
			if (part.xoff + part.w + this.padding - this.mask.w > this.maxOffsetX) {
				this.maxOffsetX = part.xoff + part.w + this.padding - this.mask.w;
			}
			if (part.yoff + part.h + this.padding - this.mask.h > this.maxOffsetY) {
				this.maxOffsetY = part.yoff + part.h + this.padding - this.mask.h;
			}
			if (part.xoff - this.padding < this.minOffsetX) {
				this.minOffsetX = part.xoff - this.padding;
			}
			if (part.yoff - this.padding < this.maminOffsetY) {
				this.mminOffsetY = part.yoff - this.padding;
			}
		}
		this.maxOffsetX *= -1;
		this.maxOffsetY *= -1;
		this.minOffsetX *= -1;
		this.minOffsetY *= -1;
	}

	findScrollOffsetMagX() {
		var xOffsetMag = (this.mask.xoffset - this.minOffsetX) / (this.maxOffsetX - this.minOffsetX);
		if (Number.isNaN(xOffsetMag)) xOffsetMag = 0;
		return xOffsetMag;
	}

	findScrollOffsetMagY() {
		var yOffsetMag = (this.mask.yoffset - this.minOffsetY) / (this.maxOffsetY - this.minOffsetY);
		if (Number.isNaN(yOffsetMag)) yOffsetMag = 0;
		return yOffsetMag;
	}

	setOffestFromMagX(mag) {
		var offset = this.minOffsetX + mag * (this.maxOffsetX - this.minOffsetX);
		this.mask.setOffsetX(offset);
	}
	setOffestFromMagY(mag) {
		var offset = this.minOffsetY + mag * (this.maxOffsetY - this.minOffsetY);
		this.mask.setOffsetY(offset);
	}

	validateScrollPosition() {
		if (this.maxOffsetX >= this.minOffsetX) { //Not enough to scroll
			this.mask.setOffsetX(this.minOffsetX);
		} else 
		if (this.mask.xoffset > this.minOffsetX) { //Hit the left
			this.mask.setOffsetX(this.minOffsetX);
		} else 
		if (this.mask.xoffset < this.maxOffsetX) { //Hit the right
			this.mask.setOffsetX(this.maxOffsetX);
		}

		if (this.maxOffsetY >= this.minOffsetY) { //Not enough to scroll
			this.mask.setOffsetY(this.minOffsetY);
		} else 
		if (this.mask.yoffset > this.minOffsetY) { //Hit the top
			this.mask.setOffsetY(this.minOffsetY);
		} else 
		if (this.mask.yoffset < this.maxOffsetY) { //Hit the bottom
			this.mask.setOffsetY(this.maxOffsetY);
		}
	}
}

class UIXYHandle extends UIElement {
	constructor(name, x, y, w, h) {
		super(name, x, y, w, h);
		
		this.xScrollMag = 0;
		this.yScrollMag = 0;

		this.handle = this.addPart(new UIElement("handle", 0, 0, this.w, this.h));
		this.grabbed = false;
		this.grabbedX = -1;
		this.grabbedY = -1;
		this.handleX = -1;
		this.handleY = -1;
		this.handle.onLeftMouseClick = function() { 
			this.parent.grabbed = true; 
			this.parent.grabbedX = mouseX;
			this.parent.grabbedY = mouseY;
			this.parent.handleX = this.xoff;
			this.parent.handleY = this.yoff;
		}
		this.handle.onDraw = function() {
			colorRect(this.x, this.y, this.w, this.h, 'blue');
			colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'skyblue');
		}
	}

	onUpdate() {
		if (!mouseIsDown) {
			this.grabbed = false;
		}

		if (this.grabbed) {
			var newX = this.handleX + mouseX - this.grabbedX;
			var newY = this.handleY + mouseY - this.grabbedY;

			if (newX < 0) newX = 0;
			if (newY < 0) newY = 0;
			newX = Math.round(newX);
			newY = Math.round(newY);
			if (newX > this.w - this.handle.w) newX = this.w - this.handle.w;
			if (newY > this.h - this.handle.h) newY = this.h - this.handle.h;

			this.handle.updatePosition(newX, newY);

			var newXScrollMag = newX / (this.w - this.handle.w);
			var newYScrollMag = newY / (this.h - this.handle.h);
			if (Number.isNaN(newXScrollMag)) newXScrollMag = 0;
			if (Number.isNaN(newYScrollMag)) newYScrollMag = 0;

			var oldXScrollMag = this.xScrollMag;
			var oldYScrollMag = this.yScrollMag;
			this.xScrollMag = newXScrollMag;
			this.yScrollMag = newYScrollMag;
			if (newXScrollMag != oldXScrollMag || newYScrollMag != oldYScrollMag) this.onValueChanged();
		}
	}

	onDraw() {
		colorRect(this.x, this.y, this.w, this.h, 'blue');
		colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'dodgerblue');
	}

	scaleHandle(wScale, hScale) {
		if (wScale < 0) wScale = 0;
		if (hScale < 0) hScale = 0;
		if (wScale > 1) wScale = 1;
		if (hScale > 1) hScale = 1;
		if (Number.isNaN(wScale)) wScale = 0;
		if (Number.isNaN(hScale)) hScale = 0;

		this.handle.w = this.w * wScale;
		this.handle.h = this.h * hScale;

		if (this.handle.w < 10) this.handle.w = 10;
		if (this.handle.h < 10) this.handle.h = 10;

		let newX = (this.w - this.handle.w) * this.xScrollMag;
		let newY = (this.h - this.handle.h) * this.yScrollMag;
		this.handle.updatePosition(newX, newY);
	}

	setHandleLocationScaled(x, y) {
		if (x < 0) x = 0;
		if (y < 0) y = 0;
		if (x > 1) x = 1;
		if (y > 1) y = 1;
		if (Number.isNaN(x)) x = 0;
		if (Number.isNaN(y)) y = 0;

		this.xScrollMag = x;
		this.yScrollMag = y;

		let newX = (this.w - this.handle.w) * this.xScrollMag;
		let newY = (this.h - this.handle.h) * this.yScrollMag;
		this.handle.updatePosition(newX, newY);
	}

	onValueChanged() {}
}

class UIScrollBoxH extends UIElement {
	constructor(name, x, y, w, h) {
		super(name, x, y, w, h);

		this.scrollBox = this.addPart(new UIScrollBox("Scroll Box", 0, 0, this.w, this.h - 10));

		this.scrollLButton = this.addPart(new UIButton("Scroll Left", 0, this.h-10, 10, 10));
		this.scrollRButton = this.addPart(new UIButton("Scroll Right", this.w-10, this.h-10, 10, 10));
		this.scrollBar = this.addPart(new UIXYHandle("Scroll Bar", 10, this.h-10, this.w-20, 10));

		this.scrollLButton.scrollBox = this.scrollBox;
		this.scrollRButton.scrollBox = this.scrollBox;
		this.scrollBar.scrollBox = this.scrollBox;

		this.scrollLButton.onClick = function() {
			this.scrollBox.scrollLeft();

			this.parent.scrollBar.setHandleLocationScaled(this.scrollBox.findScrollOffsetMagX(), 0);
		}
		this.scrollRButton.onClick = function() {
			this.scrollBox.scrollRight();

			this.parent.scrollBar.setHandleLocationScaled(this.scrollBox.findScrollOffsetMagX(), 0);
		}
		this.scrollBar.onValueChanged = function() {
			this.scrollBox.setOffestFromMagX(this.xScrollMag);

			this.parent.scrollBar.setHandleLocationScaled(this.scrollBox.findScrollOffsetMagX(), 0);
		}

		this.addPart = function(part) {
			let newPart = this.scrollBox.addPart(part);

			let xScale = this.scrollBox.w / -this.scrollBox.maxOffsetX;
			this.scrollBar.scaleHandle(xScale, 1);

			this.scrollBar.setHandleLocationScaled(this.scrollBox.findScrollOffsetMagX(), 0);

			return newPart;
		}
		this.removePart = function(part) {
			this.scrollBox.removePart(part);
			
			let xScale = this.scrollBox.w / -this.scrollBox.maxOffsetX;
			this.scrollBar.scaleHandle(xScale, 1);

			this.scrollBar.setHandleLocationScaled(this.scrollBox.findScrollOffsetMagX(), 0);
		}
	}
}

class UIScrollBoxV extends UIElement {
	constructor(name, x, y, w, h) {
		super(name, x, y, w, h);

		this.scrollBox = this.addPart(new UIScrollBox("Scroll Box", 0, 0, this.w-10, this.h));

		this.scrollUButton = this.addPart(new UIButton("Scroll Up", this.w-10, 0, 10, 10));
		this.scrollDButton = this.addPart(new UIButton("Scroll Down", this.w-10, this.h-10, 10, 10));
		this.scrollBar = this.addPart(new UIXYHandle("Scroll Bar", this.w-10, 10, 10, this.h-20));

		this.scrollUButton.scrollBox = this.scrollBox;
		this.scrollDButton.scrollBox = this.scrollBox;
		this.scrollBar.scrollBox = this.scrollBox;

		this.scrollUButton.onClick = function() {
			this.scrollBox.scrollUp();

			this.parent.scrollBar.setHandleLocationScaled(0, this.scrollBox.findScrollOffsetMagY());
		}
		this.scrollDButton.onClick = function() {
			this.scrollBox.scrollDown();

			this.parent.scrollBar.setHandleLocationScaled(0, this.scrollBox.findScrollOffsetMagY());
		}
		this.scrollBar.onValueChanged = function() {
			this.scrollBox.setOffestFromMagY(this.yScrollMag);

			this.parent.scrollBar.setHandleLocationScaled(0, this.scrollBox.findScrollOffsetMagY());
		}

		this.addPart = function(part) {
			let newPart = this.scrollBox.addPart(part);

			let yScale = this.scrollBox.h / -this.scrollBox.maxOffsetY;
			this.scrollBar.scaleHandle(1, yScale);

			this.scrollBar.setHandleLocationScaled(0, this.scrollBox.findScrollOffsetMagY());

			return newPart;
		}
		this.removePart = function(part) {
			this.scrollBox.removePart(part);

			let yScale = this.scrollBox.h / -this.scrollBox.maxOffsetY;
			this.scrollBar.scaleHandle(1, yScale);

			this.scrollBar.setHandleLocationScaled(0, this.scrollBox.findScrollOffsetMagY());
		}
	}
}

class UIScrollBoxHV extends UIElement {
	constructor(name, x, y, w, h) {
		super(name, x, y, w, h);

		this.scrollBox = this.addPart(new UIScrollBox("Scroll Box", 0, 0, this.w-10, this.h-10));

		this.scrollLButton = this.addPart(new UIButton("Scroll Left", 0, this.h-10, 10, 10));
		this.scrollRButton = this.addPart(new UIButton("Scroll Right", this.w-20, this.h-10, 10, 10));
		this.scrollUButton = this.addPart(new UIButton("Scroll Up", this.w-10, 0, 10, 10));
		this.scrollDButton = this.addPart(new UIButton("Scroll Down", this.w-10, this.h-20, 10, 10));
		this.scrollBarH = this.addPart(new UIXYHandle("Scroll Bar Horizontal", 10, this.h-10, this.w-30, 10));
		this.scrollBarV = this.addPart(new UIXYHandle("Scroll Bar Vertical", this.w-10, 10, 10, this.h-30));

		this.scrollLButton.scrollBox = this.scrollBox;
		this.scrollRButton.scrollBox = this.scrollBox;
		this.scrollUButton.scrollBox = this.scrollBox;
		this.scrollDButton.scrollBox = this.scrollBox;
		this.scrollBarH.scrollBox = this.scrollBox;
		this.scrollBarV.scrollBox = this.scrollBox;

		this.scrollLButton.onClick = function() {
			this.scrollBox.scrollLeft();

			this.parent.scrollBarH.setHandleLocationScaled(this.scrollBox.findScrollOffsetMagX(), 0);
		}
		this.scrollRButton.onClick = function() {
			this.scrollBox.scrollRight();

			this.parent.scrollBarH.setHandleLocationScaled(this.scrollBox.findScrollOffsetMagX(), 0);
		}
		this.scrollUButton.onClick = function() {
			this.scrollBox.scrollUp();

			this.parent.scrollBarV.setHandleLocationScaled(0, this.scrollBox.findScrollOffsetMagY());
		}
		this.scrollDButton.onClick = function() {
			this.scrollBox.scrollDown();

			this.parent.scrollBarV.setHandleLocationScaled(0, this.scrollBox.findScrollOffsetMagY());
		}
		this.scrollBarH.onValueChanged = function() {
			this.scrollBox.setOffestFromMagX(this.xScrollMag);

			this.parent.scrollBarH.setHandleLocationScaled(this.scrollBox.findScrollOffsetMagX(), 0);
		}
		this.scrollBarV.onValueChanged = function() {
			this.scrollBox.setOffestFromMagY(this.yScrollMag);

			this.parent.scrollBarV.setHandleLocationScaled(0, this.scrollBox.findScrollOffsetMagX());
		}

		this.addPart = function(part) {
			let newPart = this.scrollBox.addPart(part);

			let xScale = this.scrollBox.w / -this.scrollBox.maxOffsetX;
			this.scrollBarH.scaleHandle(xScale, 1);
			this.scrollBarH.setHandleLocationScaled(this.scrollBox.findScrollOffsetMagX(), 0);

			let yScale = this.scrollBox.h / -this.scrollBox.maxOffsetY;
			this.scrollBarV.scaleHandle(1, yScale);
			this.scrollBarV.setHandleLocationScaled(0, this.scrollBox.findScrollOffsetMagY());

			return newPart;
		}
		this.removePart = function(part) {
			this.scrollBox.removePart(part);
			
			let xScale = this.scrollBox.w / -this.scrollBox.maxOffsetX;
			this.scrollBarH.scaleHandle(xScale, 1);
			this.scrollBarH.setHandleLocationScaled(this.scrollBox.findScrollOffsetMagX(), 0);

			let yScale = this.scrollBox.h / -this.scrollBox.maxOffsetY;
			this.scrollBarV.scaleHandle(1, yScale);
			this.scrollBarV.setHandleLocationScaled(0, this.scrollBox.findScrollOffsetMagY());
		}
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
		colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'skyblue');

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
		if (!mouseIsDown || mouseX < 0 || mouseY < 0 || mouseX >= this.mi().w || mouseY >= this.mi().h) {
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
	constructor(name, x, y, w, h, text = "", textAlignment = "left") {
		super(name, x, y, w, h);

		this.size = 14;
		this.textAlignment = textAlignment;
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

		this.dropdown = this.addPart(new UIDropdownList(this.name + " dropdown list", 0, 0, 0, 0), false);
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

		this.active.length = 0;

		var height = this.list.length * (this.size + 3);
		var y = this.center ? -height * 0.5 : 0;
		if (this.y + y < 0) y -= this.y + y;
		if (this.y + height + y > canvas.height) y -= this.y + height + y - canvas.height;

		this.dropdown.updatePosition(0, y, this.w, height);
		this.dropdown.setActive(this.open);
	}

	closeList() {
		if (this.active.length > 0) this.active.length = 0;
		this.open = false;
		mouseJustPressed = false;
	}

	openList() {
		this.dropdown.setActive(true);
		this.open = true;
		this.dropdown.justOpened = true;
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