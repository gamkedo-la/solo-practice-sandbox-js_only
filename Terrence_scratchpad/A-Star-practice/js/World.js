// A-Star implementation based on http://buildnewgames.com/astar/ 
// by Gamkedo's own Christer "McFunkpants" Kaitila! ツ
// --> www.mcfunkypants.com <--

const BRICK_SIDE = 40;
const BRICK_GAP = 1;
const BRICK_COLS = 20;
const BRICK_ROWS = 15;

const GROUND = 0;
const BRICK = 1;
const PATH = 1;

var world = [[]];
var rollForBrick = 0.80;

function createWorld() { 
	for (var x = 0; x < BRICK_COLS; x++) {
		world[x] = [];

		for (var y=0; y < BRICK_ROWS; y++) {
			if (Math.random() > rollForBrick) {
				world[x][y] = BRICK;
			} else {
				world[x][y] = GROUND;
			}
		}
	} // end of for x < BRICK_COLS

	var entityPositions = [[sliderX,sliderY],[enemyX,enemyY]];
	for (pos of entityPositions) {
		if (isBrickAtPixelCoord(pos[0],pos[1])) {
			var x = pos[0] / BRICK_SIDE;
			var y = pos[1] / BRICK_SIDE;
			x = Math.floor(x);
			y = Math.floor(y);
			world[x][y] = GROUND;
			console.log("BRICK was placed on player object, made to GROUND");
		}
	} // end of for pos of entityPositions
} // end of createWorld()
  
function isBrickAtPixelCoord(hitPixelX, hitPixelY) {
	var tileCol = hitPixelX / BRICK_SIDE;
	var tileRow = hitPixelY / BRICK_SIDE;

	// using Math.floor to round down to the nearest whole number
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);

	// first check whether the slider is within any part of the brick wall
	if(tileCol < 0 || tileCol >= BRICK_COLS ||
	   tileRow < 0 || tileRow >= BRICK_ROWS) {
		return false;
	}

	return (world[tileCol][tileRow] == BRICK);
}

function pixelCoordToWorldTilePos (coordX, coordY) {
	var tileCol = coordX / BRICK_SIDE;
	var tileRow = coordY / BRICK_SIDE;

	// using Math.floor to round down to the nearest whole number
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);

	return worldTilePos = {x: tileCol, y: tileRow};
}

function WorldTilePosToCenteredTileCoord (worldTile) {
	var worldTileToPixelCoord = worldTile * BRICK_SIDE + BRICK_SIDE/2;

	return pixelCoord = worldTileToPixelCoord;
}

function drawBricks() {
	for(var eachCol=0; eachCol<BRICK_COLS; eachCol++) { // in each column...
  		for(var eachRow=0; eachRow<BRICK_ROWS; eachRow++) { // in each row within that col
		    if(isBrickAtTileCoord(eachCol, eachRow) ) {
				var brickLeftEdgeX = eachCol * BRICK_SIDE;
				var brickTopEdgeY = eachRow * BRICK_SIDE;
				colorRect(brickLeftEdgeX, brickTopEdgeY,
				BRICK_SIDE - BRICK_GAP, BRICK_SIDE - BRICK_GAP, 'blue');
    		} // end of isBrickAtTileCoord()
    		for (var i = 0; i < currentPath.length; i++) {
    			if ([eachCol,eachRow] === currentPath[i]) {
					var brickLeftEdgeX = eachCol * BRICK_SIDE;
					var brickTopEdgeY = eachRow * BRICK_SIDE;
					colorRect(brickLeftEdgeX, brickTopEdgeY,
					BRICK_SIDE - BRICK_GAP, BRICK_SIDE - BRICK_GAP, 'grey');
				}
    		} // end of for i < currentPath.length
  		} // end of for eachRow
	} // end of for eachCol
} // end of drawBricks()

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
	return (world[brickTileCol][brickTileRow] == BRICK);
}