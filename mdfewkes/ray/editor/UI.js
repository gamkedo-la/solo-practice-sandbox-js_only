const borderSize = 3;
const borderBack = borderSize * 2;

var displaytext = "test";

function MainInterface(screenWidth, screenHeight) {
	this.name = "Main Interface";
	this.x = 0;
	this.y = 0;
	this.w = screenWidth;
	this.h = screenHeight;

	this.parts = [
		new UIElement("topPane", 0, 0, this.w, 30, this),
		new WallPane("wallPane", 0, 30, 0, 0, this),
		new AudioPane("audioPane", 0, 30, 150, 200, this),
		new EntityPane("entityPane", 0, 30, 150, 200, this),
		new SelectionPane("selectionPane", 0, this.h, 200, 200, this),
	]
	this.active = [
		this.parts[4],
		this.parts[1],
		this.parts[0],
	]

	this.parts[0].addPart(new UIButtonWToolTip("wallModeButton", 5, 5, 20, 20, this.parts[0], "Wall Mode"));
	this.parts[0].addPart(new UIButtonWToolTip("audioModeButton", 28, 5, 20, 20, this.parts[0], "Audio Mode"));
	this.parts[0].addPart(new UIButtonWToolTip("entityModeButton", 51, 5, 20, 20, this.parts[0], "Entity Mode"));
	this.parts[0].addPart(new UIToggleWToolTip("snapToggle", 97, 5, 20, 20, this.parts[0], "Snap to nearest wall anchor", true));

	this.parts[0].parts[0].activate = function() {
		switchMode(WALL_MODE); 
		mainInterface.parts[1].setActive(true);
		mainInterface.parts[2].setActive(false);
		mainInterface.parts[3].setActive(false);
	};
	this.parts[0].parts[1].activate = function() {
		switchMode(AUDIO_MODE); 
		mainInterface.parts[1].setActive(false);
		mainInterface.parts[2].setActive(true);
		mainInterface.parts[3].setActive(false);
	};
	this.parts[0].parts[2].activate = function() {
		switchMode(ENTITY_MODE); 
		mainInterface.parts[1].setActive(false);
		mainInterface.parts[2].setActive(false);
		mainInterface.parts[3].setActive(true);
};
	this.parts[0].parts[3].onTrue = function() {snapToNearWallPoint = true};
	this.parts[0].parts[3].onFalse = function() {snapToNearWallPoint = false};

	this.updateUI = function() {
		if (mouseJustPressed && isInElement(this, mouseX, mouseY)) {
			leftMouseClick(mouseX, mouseY);
		}
	}

	this.drawUI = function() {
		for (var i = 0; i < this.active.length; i++) {
			this.active[i].draw();
		}

		displaytext = getDisplayText();
		colorText(displaytext, this.x + this.w - borderBack, 15 + borderSize, "darkblue", "15px Arial", "right");
	}

	function leftMouseClick(x, y) {
		for (var i = mainInterface.active.length -1; i >= 0; i--) {
			if (isInElement(mainInterface.active[i], x, y)) {
				mainInterface.active[i].leftMouseClick(x, y);

				mouseJustPressed = false;

				break;
			}
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

	addPart(part, isActive = true) {
		this.parts.push(part);
		if (isActive) this.active.push(part);
	}

	setMostActive() {
		this.parent.active.push(this.parent.active.splice(this.parent.active.indexOf(this), 1)[0]);
	}

	setActive(isActive) {
		if (isActive && !this.parent.active.includes(this)) {
			this.parent.active.push(this);
		}
		if (!isActive && this.parent.active.includes(this)) {
			this.parent.active.splice(this.parent.active.indexOf(this), 1);
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

	updatePosition(x = this.xoff, y = this.yoff, w = this.w, h = this.h, parent = this.parent) {
		this.parent = parent;
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

	draw() {
		colorRect(this.x, this.y, this.w, this.h, 'blue');
		colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'lightblue');

		for (var i = 0; i < this.active.length; i++) {
			this.active[i].draw();
		}
	}
}

class UIButton extends UIElement {
	constructor(name, x, y, w, h, parent) {
		super(name, x, y, w, h, parent);
	}

	leftMouseClick(x, y) {
		this.setMostActive();
		this.activate();
	}

	draw() {
		colorRect(this.x, this.y, this.w, this.h, 'blue');
		colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'lightblue');

		if (isInElement(this, mouseX, mouseY)) {
			colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'dodgerblue');
			if (mouseJustPressed) colorCircle(this.x + this.w * 0.5, this.y + this.h * 0.5, (this.w + this.h) * 0.25 + 10, 'white');
		}
	}

	activate() {
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

	activate() {
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

	activate() {
		this.parent.parent.active.splice(this.parent.parent.active.indexOf(this.parent), 1);
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

	draw() {
		colorRect(this.x, this.y, this.w, this.h, 'blue');
		colorRect(this.x + borderSize, this.y + borderSize, this.w - borderBack, this.h - borderBack, 'skyblue');

		if (!mouseIsDown || mouseX < 0 || mouseX >= eCanvas.width || mouseY < 0 || mouseY >= eCanvas.height) {
			this.grabbed = false;
		}

		if (this.grabbed) {
			var newX = this.parentX + mouseX - this.grabbedX;
			var newY = this.parentY + mouseY - this.grabbedY;
			this.parent.updatePosition(newX, newY);
		}
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
		if (this.y + height + y > eCanvas.height) y -= this.y + height + y - eCanvas.height
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

		for (var i = 0; i < this.active.length; i++) {
			this.active[i].draw();
		}
	}

	updatePosition(x = this.xoff, y = this.yoff, w = this.w, h = this.h, parent = this.parent) {
		super.updatePosition(x, y, w, h, parent);
		this.updateListElement();
	}
}

class UIDropdownList extends UIElement {
	constructor(name, x, y, w, h, parent) {
		super(name, x, y, w, h, parent);

		this.justOpened = true;
	}

	draw() {
		if (mouseJustPressed && !this.justOpened) {
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






class WallPane extends UIElement {
	constructor(name, x, y, w, h, parent) {
		super(name, x, y, 30, 76, parent);

		this.addPart(new UIButtonWToolTip("singleWallMode", 5, 5, 20, 20, this, "Add Walls"));
		this.addPart(new UIButtonWToolTip("multiWallMode", 5, 28, 20, 20, this, "Add Connected Walls"));
		this.addPart(new UIButtonWToolTip("selectWallMode", 5, 51, 20, 20, this, "Select Wall"));

		this.parts[0].activate = function() {wallMode = ADD_SINGLE_WALL;};
		this.parts[1].activate = function() {wallMode = ADD_MULTI_WALLS;};
		this.parts[2].activate = function() {wallMode = SELECT_WALL;};
	}

}

class AudioPane extends UIElement {
	constructor(name, x, y, w, h, parent) {
		super(name, x, y, 30, 76, parent);

		this.addPart(new UIButtonWToolTip("addAudioNodeMode", 5, 5, 20, 20, this, "Add Audio Nodes"));
		this.addPart(new UIButtonWToolTip("generateAudioGeo", 5, 28, 20, 20, this, "GenerateAudioGeo"));
		this.addPart(new UIButtonWToolTip("selectAudioNodeMode", 5, 51, 20, 20, this, "Select Audio Nodes"));

		this.parts[0].activate = function() {audioMode = ADD_AUDIO;};
		this.parts[1].activate = function() {generateAudGeo();};
		this.parts[2].activate = function() {audioMode = SELECT_AUDIO;};
	}
	
}

class EntityPane extends UIElement {
	constructor(name, x, y, w, h, parent) {
		super(name, x, y, 30, 76, parent);
	}
	
}

class SelectionPane extends UIElement{
	constructor(name, x, y, w, h, parent) {
		super(name, x, y - h, w, h, parent);

		this.bottom = y;
	}

	draw() {
		if (selectedElement == null) {
			this.h = 30;
			this.w = 200;
		} else {
			if (editMode == WALL_MODE) {
				this.h = 90;
				this.w = 200;
			}
			if (editMode == AUDIO_MODE) {
				this.h = 75;
				this.w = 200;
			}
			if (editMode == ENTITY_MODE) {
				this.h = 100;
				this.w = 200;
			}
		}
		this.y = this.bottom - this.h;

		super.draw();

		if (selectedElement != null) {
			if (editMode == WALL_MODE) {
				var textP1 = "p1 {x: " + selectedElement.p1.x + ", y: " + selectedElement.p1.y + "}";
				var textP2 = "p2 {x: " + selectedElement.p2.x + ", y: " + selectedElement.p2.y + "}";
				var textColor = "Color: " + selectedElement.color;
				colorText(textP1, this.x + borderSize + 20, this.y + 15 + borderSize, "darkblue");
				colorText(textP2, this.x + borderSize + 20, this.y + 30 + borderSize, "darkblue");
				colorText(textColor, this.x + borderSize + 20, this.y + 45 + borderSize, "darkblue");

			}
			if (editMode == AUDIO_MODE) {
				var index = audGeoPoints.indexOf(selectedElement);
				var textPos = index + " {x: " + selectedElement.x + ", y: " + selectedElement.y + "}";
				colorText(textPos, this.x + borderSize + 20, this.y + 15 + borderSize, "darkblue");

				if (currentAudGeo.length > 0 
					&& currentAudGeo[index].point.x == selectedElement.x 
					&& currentAudGeo[index].point.y == selectedElement.y) {

					var textConnected = "[";
					for (var i in currentAudGeo[index].connections) {
						textConnected = textConnected + " " + currentAudGeo[index].connections[i];
					}
					textConnected = textConnected + " ]";
					colorText(textConnected, this.x + borderSize + 20, this.y + 30 + borderSize, "darkblue");
				}

			}
			if (editMode == ENTITY_MODE) {

			}
		}
		var pos = getMousePositionInWorldSpace();
		var text = "{x: " + pos.x + ", y: " + pos.y + "}";
		colorText(text, this.x + this.w*0.5, this.bottom - 13 + borderSize, "darkblue", "15px Arial", "center");
	}

}