var displaytext = "test";
var mainInterface;

function setupUI(screenWidth, screenHeight) {
	mainInterface = new UIMainInterface("Main Interface", screenWidth, screenHeight);

	mainInterface.addPart(new UIElement("topPane", 0, 0, screenWidth, 30), true);
	mainInterface.addPart(new WallPane("wallPane", 0, 30, 0, 0), true);
	mainInterface.addPart(new AudioPane("audioPane", 0, 30, 150, 200), false);
	mainInterface.addPart(new EntityPane("entityPane", 0, 30, 150, 200), false);
	mainInterface.addPart(new SelectionPane("selectionPane", 0, screenHeight, 200, 200), true);

	mainInterface.parts[0].addPart(new UIButtonWToolTip("wallModeButton", 5, 5, 20, 20, "Wall Mode"));
	mainInterface.parts[0].addPart(new UIButtonWToolTip("audioModeButton", 28, 5, 20, 20, "Audio Mode"));
	mainInterface.parts[0].addPart(new UIButtonWToolTip("entityModeButton", 51, 5, 20, 20, "Entity Mode"));
	mainInterface.parts[0].addPart(new UIToggleWToolTip("snapToggle", 97, 5, 20, 20, "Snap to nearest wall anchor", true));
	mainInterface.parts[0].addPart(new UITextLabel("modetextlabel", screenWidth/2, 20, 0, 0, "", "center"));

	mainInterface.parts[0].parts[0].onClick = function() {
		switchMode(WALL_MODE); 
		mainInterface.parts[1].setActive(true);
		mainInterface.parts[2].setActive(false);
		mainInterface.parts[3].setActive(false);
	};
	mainInterface.parts[0].parts[1].onClick = function() {
		switchMode(AUDIO_MODE); 
		mainInterface.parts[1].setActive(false);
		mainInterface.parts[2].setActive(true);
		mainInterface.parts[3].setActive(false);
	};
	mainInterface.parts[0].parts[2].onClick = function() {
		switchMode(ENTITY_MODE); 
		mainInterface.parts[1].setActive(false);
		mainInterface.parts[2].setActive(false);
		mainInterface.parts[3].setActive(true);
	};
	mainInterface.parts[0].parts[3].toggle = true;
	mainInterface.parts[0].parts[3].onTrue = function() {snapToNearWallPoint = true;};
	mainInterface.parts[0].parts[3].onFalse = function() {snapToNearWallPoint = false;};
	mainInterface.parts[0].parts[4].onUpdate = function() {this.label = getDisplayText();};

	mainInterface.onDraw = function() {
		mainInterface.parts[0].parts[4].updatePosition(eCanvas.width/2, 20, 0, 0);

		canvas = eCanvas;
		canvasContext = eCanvasContext;
		drawMapView();
		driveEditor();
	}

}




class WallPane extends UIElement {
	constructor(name, x, y, w, h) {
		super(name, x, y, 30, 76);

		this.addPart(new UIButtonWToolTip("singleWallMode", 5, 5, 20, 20, "Add Walls"));
		this.addPart(new UIButtonWToolTip("multiWallMode", 5, 28, 20, 20, "Add Connected Walls"));
		this.addPart(new UIButtonWToolTip("selectWallMode", 5, 51, 20, 20, "Select Wall"));

		this.parts[0].onClick = function() {wallMode = ADD_SINGLE_WALL;};
		this.parts[1].onClick = function() {wallMode = ADD_MULTI_WALLS;};
		this.parts[2].onClick = function() {wallMode = SELECT_WALL;};
	}

}

class AudioPane extends UIElement {
	constructor(name, x, y, w, h) {
		super(name, x, y, 30, 76);

		this.addPart(new UIButtonWToolTip("addAudioNodeMode",    5, 5,  20, 20, "Add Audio Nodes"));
		this.addPart(new UIButtonWToolTip("selectAudioNodeMode", 5, 28, 20, 20, "Select Audio Nodes"));
		//this.addPart(new UIButtonWToolTip("recalculateAudioGeo", 5, 51, 20, 20, "Recalculate Audio Geo"));

		this.parts[0].onClick = function() {audioMode = ADD_AUDIO;};
		this.parts[1].onClick = function() {audioMode = SELECT_AUDIO;};
		//this.parts[2].onClick = function() {generateAudGeo();};

		generateAudGeo();
	}

	setActive(active) {
		super.setActive(active);

		if (active) {
			populateAudioNodesFromWallEdges();
			cullAudioNodesThatDontConnectToPoint(currentMap.playerStart);
		}
	}
	
}

class EntityPane extends UIElement {
	constructor(name, x, y, w, h) {
		super(name, x, y, 30, 76, parent);
	}
	
}

class SelectionPane extends UIElement{
	constructor(name, x, y, w, h) {
		super(name, x, y - h, w, h);

		this.bottom = y;

		this.audioButtons = [
			this.addPart(new UIButton("nudgeLeft", 150, 150, 10, 10), false),
			this.addPart(new UIButton("nudgeUp", 160, 140, 10, 10), false),
			this.addPart(new UIButton("nudgeRight", 170, 150, 10, 10), false),
			this.addPart(new UIButton("nudgeDown", 160, 160, 10, 10), false)
		];
		this.audioButtons[0].onClick = function() {
			if (selectedElement!= null) {
				selectedElement.x += -1;
				selectedElement.x = roundToDecimalPlace(selectedElement.x, 2);
			}
		};
		this.audioButtons[1].onClick = function() {
			if (selectedElement!= null) {
				selectedElement.y += -1;
				selectedElement.y = roundToDecimalPlace(selectedElement.y, 2);
			}
		};
		this.audioButtons[2].onClick = function() {
			if (selectedElement!= null) {
				selectedElement.x += 1;
				selectedElement.x = roundToDecimalPlace(selectedElement.x, 2);
			}
		};
		this.audioButtons[3].onClick = function() {
			if (selectedElement!= null) {
				selectedElement.y += 1;
				selectedElement.y = roundToDecimalPlace(selectedElement.y, 2);
			}
		};
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
				this.h = 90;
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
				if (index == undefined) index = 0;
				var textPos = index + " {x: " + selectedElement.x.toFixed(2) + ", y: " + selectedElement.y.toFixed(2) + "}";
				colorText(textPos, this.x + borderSize + 20, this.y + 15 + borderSize, "darkblue");

				if (currentAudGeo.length > 0 && currentAudGeo.length-1 >= index
					&& currentAudGeo[index].point.x == selectedElement.x 
					&& currentAudGeo[index].point.y == selectedElement.y) {

					var textConnected = "[";
					for (var i in currentAudGeo[index].connections) {
						textConnected = textConnected + " " + currentAudGeo[index].connections[i];
					}
					textConnected = textConnected + " ]";
					colorText(textConnected, this.x + borderSize + 20, this.y + 30 + borderSize, "darkblue");
				}

				for (var i = 0; i < this.audioButtons.length; i++) {
					this.audioButtons[i].setActive(true);
				}

			} else {
				for (var i = 0; i < this.audioButtons.length; i++) {
					this.audioButtons[i].setActive(false);
				}
			}

			if (editMode == ENTITY_MODE) {

			}

		} else {
			for (var i = 0; i < this.audioButtons.length; i++) {
				this.audioButtons[i].setActive(false);
			}
		}

		var pos = getMousePositionInWorldSpace();
		var text = "{x: " + pos.x + ", y: " + pos.y + "}";
		colorText(text, this.x + this.w*0.5, this.bottom - 13 + borderSize, "darkblue", "15px Arial", "center");
	}

}