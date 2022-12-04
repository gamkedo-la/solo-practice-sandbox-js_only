const WALL_MODE = 0;
const AUDIO_MODE = 1;
const ENTITY_MODE = 2;

const ADD_SINGLE_WALL = 0;
const ADD_MULTI_WALLS = 1;
const SELECT_WALL = 2;

var editMode = WALL_MODE;

var wallMode = ADD_SINGLE_WALL;
var lastWallPoint = null;
var wallColor = "purple";
var wallTexture = new Image();
wallTexture.src = './images/textTexture100x100.png';

function driveEditor() {
	if (editMode == WALL_MODE) runWallMode();
	if (editMode == AUDIO_MODE) runAudioMode()
	if (editMode == ENTITY_MODE) runEntityMode()
}

function runWallMode() {
	if (wallMode == ADD_SINGLE_WALL) {
		if (mouseJustPressed && lastWallPoint == null) {
			lastWallPoint = getMousePositionInWorldSpace();
		} else if (mouseJustPressed && lastWallPoint != null) {
			var newWall = new WallClass();
			newWall.p1 = lastWallPoint;
			newWall.p2 = getMousePositionInWorldSpace();
			newWall.color = wallColor;
			newWall.texture = wallTexture;

			lastWallPoint = null;
		}
	}

	if (wallMode == ADD_MULTI_WALLS) {
		if (mouseJustPressed && lastWallPoint == null) {
			lastWallPoint = getMousePositionInWorldSpace();
		} else if (mouseJustPressed && lastWallPoint != null) {
			var newWall = new WallClass();
			newWall.p1 = lastWallPoint;
			newWall.p2 = getMousePositionInWorldSpace();
			newWall.color = wallColor;
			newWall.texture = wallTexture;

			if (walls.length > 1) newWall.textureOffset = distanceBetweenTwoPoints(walls[walls.length-2].p2, lastWallPoint);

			lastWallPoint = getMousePositionInWorldSpace();
		}
	}

	colorEmptyCircle(mouseX, mouseY, 5, "white")
	if (lastWallPoint != null) {
		var pos = getWorldPositionInScreenSpace(lastWallPoint);
		//colorEmptyCircle(pos.x, pos.y, 3, "grey");
		colorLine(pos.x - 5, pos.y, pos.x + 5, pos.y, 1, "grey");
		colorLine(pos.x, pos.y - 5, pos.x, pos.y + 5, 1, "grey");
	}
}

function runAudioMode() {

}

function runEntityMode() {

}

function getWorldPositionInScreenSpace(pos) {
	return {x: pos.x - player.x + eCanvas.width/2, y: pos.y - player.y + eCanvas.height/2}
}