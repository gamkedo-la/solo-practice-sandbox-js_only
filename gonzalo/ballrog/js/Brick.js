const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
const TOP_MARGIN = 2*BRICK_H;
const BRICK_TYPES = {
	empty: 0,
	onehit: 1,
	twohit: 2,
	threehit: 3,
	unbreakable: 4
};
const EMPTY = 0;
const ONEHIT = 1;
const TWOHIT = 2;
const THREEHIT = 3;
const UNBREAKABLE = 4;
const BRICK_IMAGES = {
	[ONEHIT]: brick1Pic,
	[TWOHIT]: brick2Pic,
	[THREEHIT]: brick3Pic,
	[UNBREAKABLE]: brick4Pic
};
const masterGrid = [
	0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
	0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
	0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	2, 0, 2, 0, 2, 2, 0, 2, 0, 2,
	0, 0, 0, 0, 0, 3, 0, 0, 0, 0,
	0, 0, 0, 4, 0, 3, 0, 0, 0, 0,
	0, 0, 0, 0, 4, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var bricksLeft = 0;
var resetBricksOnNextPaddleHit = false;

function drawBricks() {
	for (var eachCol=0; eachCol<BRICK_COLS; eachCol++) {
		for (var eachRow=0; eachRow<BRICK_ROWS; eachRow++) {
			var brick = getBrickAtTileCoord(eachCol, eachRow);
		    if(typeof(brick) != "undefined" && brick != EMPTY) {
				// TODO: get brick index here to find brick type
				var brickLeftEdgeX = eachCol * BRICK_W;
				var brickTopEdgeY = eachRow * BRICK_H + TOP_MARGIN;
				if (typeof(BRICK_IMAGES[brick]) == "undefined") {
					console.log("BAD IMAGE FOR", brick);
				}
				drawBitMap(BRICK_IMAGES[brick], brickLeftEdgeX, brickTopEdgeY);
		    }
		}
	}
}

function resetBricks() {
	brickGrid = masterGrid.slice();
	bricksLeft = brickGrid.filter(brick => brick != EMPTY && brick != UNBREAKABLE).length;
}

function getBrickAtTileCoord(brickTileCol, brickTileRow) {
	var brickIndex = brickTileCol + BRICK_COLS * brickTileRow;
	if (typeof(brickGrid[brickIndex]) == "undefined") {
		console.log('BAD BRICK AT', brickIndex);
	}
	return brickGrid[brickIndex];
}

function checkForAndRemoveBrickAtPixelCoord(pixelX, pixelY) {
	var tileX = Math.floor(pixelX / BRICK_W);
	var tileY = Math.floor(pixelY / BRICK_H);
	var brickIndex = tileX + BRICK_COLS * tileY;
	var brickPresent = false;
	if (brickIndex < BRICK_COLS * BRICK_ROWS) {
		brickPresent = brickGrid[brickIndex] == 1;
		brickGrid[brickIndex] = 0;
	}
	return brickPresent;
}

function brickToTileIndex(tileCol, tileRow) {
	return tileCol + BRICK_COLS * tileRow;
}

function handleBrickHit(evt) {
	var brick = brickGrid[evt.detail.index];
	if (brick != EMPTY && brick != UNBREAKABLE) {
		brickGrid[evt.detail.index] -= 1;
		if (brickGrid[evt.detail.index] == EMPTY) {
			bricksLeft--;
			resetBricksOnNextPaddleHit = bricksLeft <= 0;
			let brickRemovedEvent = new CustomEvent('brickRemoved', {detail: evt.detail});
			canvas.dispatchEvent(brickRemovedEvent);
		}
	}
}
