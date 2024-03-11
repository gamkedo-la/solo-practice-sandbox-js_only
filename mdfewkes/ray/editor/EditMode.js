const WALL_MODE = 0;
const AUDIO_MODE = 1;
const ENTITY_MODE = 2;

const ADD_SINGLE_WALL = 0;
const ADD_MULTI_WALLS = 1;
const SELECT_WALL = 2;

const ADD_AUDIO = 0;
const SELECT_AUDIO = 1;

var editMode = WALL_MODE;
var lastPoint = null;
var snapToNearWallPoint = true;
var snapDistance = 5;
var selectDistance = 5;
var selectedElement = null;

var actionListUndoStack = [];
var actionListRedoStack = [];
var MAX_UNDO = 200;

var wallMode = SELECT_WALL;
var wallColor = "purple";
var wallTexture = new Image();
wallTexture.src = './images/text2Texture100x100.png';

var audioMode = SELECT_AUDIO;

function driveEditor() {
	if (ctrlKey && zKey) {
		undoAction();
		zKey = false;
	}
	if (ctrlKey && yKey) {
		redoAction();
		yKey = false;
	}

	if (editMode == WALL_MODE) runWallMode();
	if (editMode == AUDIO_MODE) runAudioMode()
	if (editMode == ENTITY_MODE) runEntityMode()
}

function switchMode(newMode) {
	lastPoint = null;
	selectedElement = null;
	editMode = newMode;
}

function getDisplayText() {
	var returnText = "";
	switch (editMode) {
		case WALL_MODE:
			returnText = "Wall: ";
			switch (wallMode) {
				case ADD_SINGLE_WALL:
					returnText = returnText + "Add Wall";
					break;
				case ADD_MULTI_WALLS:
					returnText = returnText + "Add Multi-Wall";
					break;
				case SELECT_WALL:
					returnText = returnText + "Select Wall";
					break;
			}
			break;
		case AUDIO_MODE:
			returnText = "Audio: ";
			switch (audioMode) {
				case ADD_AUDIO:
					returnText = returnText + "Add Audio Node";
					break;
				case SELECT_AUDIO:
					returnText = returnText + "Select Audio Node";
					break;
			}
			break;
		case ENTITY_MODE:
			returnText = "Entity: TODO";
			break;
	}

	return returnText;
}

function runWallMode() {
	if (mouseJustPressed) {
		var mousePos = getMousePositionInWorldSpace();
		if (lastPoint != null && lastPoint.x == mousePos.x && lastPoint.y == mousePos.y) return; //Return early if mouse pos hasnt changed

		if (wallMode == ADD_SINGLE_WALL) {
			if (lastPoint == null) {
				lastPoint = mousePos;
			} else if (lastPoint != null) {
				performAction(new addWallAction(lastPoint, mousePos));
				lastPoint = null;
			}
		}

		if (wallMode == ADD_MULTI_WALLS) {
			if (lastPoint == null) {
				lastPoint = mousePos;
			} else if (lastPoint != null) {
				performAction(new addWallAction(lastPoint, mousePos));
				lastPoint = mousePos;

				//Code to connect textures between walls
			}
		}

		if (wallMode == SELECT_WALL) {
			selectedElement = null;
			var lastDistance = selectDistance*2;
			for (var i = 0; i < walls.length; i++) {
				var newDistance = distanceBetweenTwoPoints(mousePos, getNearestPointOnLine(walls[i].p1, walls[i].p2, mousePos));
				if (newDistance < selectDistance && newDistance < lastDistance) {
					selectedElement = walls[i];
					lastDistance = newDistance;
				}
			}
		}
	}

	if (delKey && selectedElement != null) {
		performAction(new deleteWallAction());
		delKey = false;
	}

	if (selectedElement != null) {
		var p1 = getWorldPositionInScreenSpace(selectedElement.p1);
		var p2 = getWorldPositionInScreenSpace(selectedElement.p2);
		colorLine(p1.x, p1.y, p2.x, p2.y, 5, "white");
		colorLine(p1.x, p1.y, p2.x, p2.y, 3, selectedElement.color);
		colorEmptyCircle(p1.x, p1.y, 3, "grey");
		colorEmptyCircle(p2.x, p2.y, 3, "grey");
	}

	colorEmptyCircle(mouseX, mouseY, 5, "white");
	if (lastPoint != null) {
		var pos = getWorldPositionInScreenSpace(lastPoint);
		colorEmptyCircle(pos.x, pos.y, 3, "grey");
		colorLine(pos.x - 5, pos.y, pos.x + 5, pos.y, 1, "grey");
		colorLine(pos.x, pos.y - 5, pos.x, pos.y + 5, 1, "grey");
	}
}

function runAudioMode() {
	if (mouseJustPressed) {
		var mousePos = getMousePositionInWorldSpace();

		if (audioMode == ADD_AUDIO) {
			performAction(new addAudioNodeAction({x: mousePos.x, y: mousePos.y}));
		}

		if (audioMode == SELECT_AUDIO) {
			selectedElement = null;
			var lastDistance = selectDistance*2;
			for (var i = 0; i < audGeoPoints.length; i++) {
				var newDistance = distanceBetweenTwoPoints(mousePos, audGeoPoints[i]);
				if (newDistance < selectDistance && newDistance < lastDistance) {
					selectedElement = audGeoPoints[i];
					lastDistance = newDistance;
				}
			}
		}
	}

	if (delKey && selectedElement != null) {
		performAction(new deleteAudioNodeAction());
		delKey = false;
	}

	if (selectedElement != null) {
		var pos = getWorldPositionInScreenSpace(selectedElement);
		colorEmptyCircle(pos.x, pos.y, 3, "blue");
	}

	colorEmptyCircle(mouseX, mouseY, 5, "lightblue");
}

function runEntityMode() {
}

function outputLevelJSONtoConsole() {
	var newLevel = {};

	newLevel.playerStart = currentMap.playerStart;
	newLevel.topColor = currentMap.topColor;
	newLevel.bottomColor = currentMap.bottomColor;
	if (walls.length > 0) {
		newLevel.walls = walls;
	}
	if (gameObjects.length > 0) {
		newLevel.entities = gameObjects;
		for(var i = 0; i < newLevel.entities.length; i++) {
			delete newLevel.entities[i].distance;
		}
	}
	console.log(JSON.stringify(newLevel));
}

function createLevelFromJSON(levelJSON) {
	var newLevel = new LevelClass();
	newLevel.levelJSON = levelJSON;

	return newLevel;
}

function loadLevel(level) {
	gameObjects.length = 0;
	walls.length = 0;
	level.onLoad = function(){};
	currentMap = level.load();
}

function getMousePositionInWorldSpace() {
	var pos = {x: mouseX + player.x - eCanvas.width/2, y: mouseY + player.y - eCanvas.height/2};
	var newPos = {x: Math.round(pos.x), y: Math.round(pos.y)};
	var lastDistance = snapDistance * 2;

	if (snapToNearWallPoint) {
		for (var i = 0; i < walls.length; i++) {
			var newDistanceP1 = distanceBetweenTwoPoints(pos, walls[i].p1);
			var newDistanceP2 = distanceBetweenTwoPoints(pos, walls[i].p2);

			if (newDistanceP1 < snapDistance && newDistanceP1 < lastDistance) {
				newPos = walls[i].p1;
				lastDistance = newDistanceP1;
			}

			if (newDistanceP2 < snapDistance && newDistanceP2 < lastDistance) {
				newPos = walls[i].p2;
				lastDistance = newDistanceP2;
			}
		}
	}

	return newPos;
}

function getWorldPositionInScreenSpace(pos) {
	return {x: pos.x - player.x + eCanvas.width/2, y: pos.y - player.y + eCanvas.height/2}
}

function performAction(action) {
	actionListUndoStack.push(action);
	actionListRedoStack.length = 0;
	action.execute();

	if (actionListUndoStack.length > MAX_UNDO) {
		actionListUndoStack.splice(actionListUndoStack.length - MAX_UNDO, 1);
	}
}

function undoAction() {
	if (actionListUndoStack.length == 0) return;

	var action = actionListUndoStack.pop();
	actionListRedoStack.push(action);
	action.undo();
}

function redoAction() {
	if (actionListRedoStack == 0) return;

	var action = actionListRedoStack.pop();
	actionListUndoStack.push(action);
	action.redo();
}

function addWallAction(point1, point2) {
	var wall = null;
	var lastSelected = null;

	this.execute = function() {
		wall = new WallClass();
		wall.p1 = point1;
		wall.p2 = point2;
		wall.color = wallColor;
		wall.texture = wallTexture;

		lastSelected = selectedElement;
		selectedElement = wall;

		return this;
	}

	this.undo = function() {
		walls.splice(walls.indexOf(wall), 1);

		selectedElement = lastSelected;
		if (lastPoint == wall.p2) {
			lastPoint = wall.p1;
		}
	}

	this.redo = function() {
		walls.push(wall);

		selectedElement = wall;
		if (lastPoint == wall.p1) {
			lastPoint = wall.p2;
		}
	}
}

function deleteWallAction() {
	var wall = null;

	this.execute = function() {
		wall = selectedElement;

		walls.splice(walls.indexOf(wall), 1);
		selectedElement = null;

		return this;
	}

	this.undo = function() {
		walls.push(wall);

		selectedElement = wall;
	}

	this.redo = function() {
		walls.splice(walls.indexOf(selectedElement), 1);

		selectedElement = null;
	}
}

function addAudioNodeAction(position) {
	var audGeoPoint = null;
	var lastSelected = null;

	this.execute = function() {
		audGeoPoint = position;

		// Code to push position away from edges
		var overlapingPointsList = getOverlappingWallEdgesAsPointPairList(audGeoPoint);
		var pushVector = {x:0, y:0};
		for (var i = 0; i < overlapingPointsList.length; i++) {
			var pointPairAsDirection = subtractVectors(overlapingPointsList[i][0], overlapingPointsList[i][1]);
			pointPairAsDirection = normalizeVector(pointPairAsDirection);
			pointPairAsDirection = scaleVector(pointPairAsDirection, (snapDistance - distanceBetweenTwoPoints(audGeoPoint, overlapingPointsList[i][0])) / snapDistance);
			pushVector = addVectors(pushVector, pointPairAsDirection);
		}
		pushVector = normalizeVector(pushVector);
		audGeoPoint = addVectors(audGeoPoint, pushVector);

		audGeoPoints.push(audGeoPoint);

		lastSelected = selectedElement;
		selectedElement = audGeoPoint;

		generateAudGeo();

		return this;
	}

	this.undo = function() {
		audGeoPoints.splice(audGeoPoints.indexOf(audGeoPoints), 1);

		selectedElement = lastSelected;
		
		generateAudGeo();
	}

	this.redo = function() {
		audGeoPoints.push(audGeoPoint);
		selectedElement = audGeoPoints[audGeoPoints.length-1];	

		selectedElement = audGeoPoint;	
		
		generateAudGeo();
	}
}

function deleteAudioNodeAction() {
	var audGeoPoint = null;

	this.execute = function() {
		audGeoPoint = selectedElement;

		audGeoPoints.splice(audGeoPoints.indexOf(audGeoPoint), 1);

		selectedElement = null;
		
		generateAudGeo();

		return this;
	}

	this.undo = function() {
		audGeoPoints.push(audGeoPoint);

		selectedElement = audGeoPoint;
		
		generateAudGeo();
	}

	this.redo = function() {
		audGeoPoints.splice(audGeoPoints.indexOf(audGeoPoint), 1);

		selectedElement = null;
		
		generateAudGeo();
	}
}