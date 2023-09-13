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

var wallMode = SELECT_WALL;
var wallColor = "purple";
var wallTexture = new Image();
wallTexture.src = './images/text2Texture100x100.png';

var audioMode = SELECT_AUDIO;

function driveEditor() {
	if (editMode == WALL_MODE) runWallMode();
	if (editMode == AUDIO_MODE) runAudioMode()
	if (editMode == ENTITY_MODE) runEntityMode()
}

function switchMode(newMode) {
	editMode = newMode;
	lastPoint = null;
	selectedElement = null;
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
				var newWall = new WallClass();
				newWall.p1 = lastPoint;
				newWall.p2 = mousePos;
				newWall.color = wallColor;
				newWall.texture = wallTexture;

				lastPoint = null;
				selectedElement = newWall;
			}
		}

		if (wallMode == ADD_MULTI_WALLS) {
			if (lastPoint == null) {
				lastPoint = mousePos;
			} else if (lastPoint != null) {
				var newWall = new WallClass();
				newWall.p1 = lastPoint;
				newWall.p2 = mousePos;
				newWall.color = wallColor;
				newWall.texture = wallTexture;

				//if (walls.length > 1) newWall.textureOffset = distanceBetweenTwoPoints(walls[walls.length-2].p2, lastPoint) + walls[walls.length-2].textureOffset;

				lastPoint = mousePos;
				selectedElement = newWall;
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
		walls.splice(walls.indexOf(selectedElement), 1);
		delKey = false;
		selectedElement = null;
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
			audGeoPoints.push({x: mousePos.x, y: mousePos.y});
			selectedElement = audGeoPoints[audGeoPoints.length-1];
			generateAudGeo();
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
		audGeoPoints.splice(audGeoPoints.indexOf(selectedElement), 1);
		delKey = false;
		selectedElement = null;
		generateAudGeo();
	}

	if (selectedElement != null) {
		var pos = getWorldPositionInScreenSpace(selectedElement);
		colorEmptyCircle(pos.x, pos.y, 3, "blue");
	}

	colorEmptyCircle(mouseX, mouseY, 5, "lightblue");
}

function runEntityMode() {

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