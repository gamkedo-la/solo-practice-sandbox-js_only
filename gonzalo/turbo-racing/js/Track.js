const TRACK_W = 40;
const TRACK_H = 40 ;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var framesPerSecond = 30;
var trackGrid = [
    4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, ////
    4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, ////
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ////
    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, ////
    1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1, ////
    1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, ////
    1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, ////
    1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, ////
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1, ////
    1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1, ////
    1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, ////
    1, 1, 1, 5, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, ////
    1, 0, 3, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, ////
    1, 0, 3, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, ////
    1, 1, 1, 5, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1
];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

function drawTracks() {
    var trackIndex = 0;
    var trackLeftEdgeX = 0;
    var trackTopEdgeY = 0;
    for (var eachRow=0; eachRow<TRACK_ROWS; eachRow++) {
	trackLeftEdgeX = 0;
	for (var eachCol=0; eachCol<TRACK_COLS; eachCol++) {
	    var trackTypeHere = trackGrid[trackIndex];
	    canvasContext.drawImage(trackPics[trackTypeHere], trackLeftEdgeX, trackTopEdgeY);
	    trackIndex++;
	    trackLeftEdgeX += TRACK_W;
	}
	trackTopEdgeY += TRACK_H;
    }
}

function checkForAndRemoveTrackAtPixelCoord(pixelX, pixelY) {
    var tileX = Math.floor(pixelX / TRACK_W);
    var tileY = Math.floor(pixelY / TRACK_H);
    var trackIndex = tileX + TRACK_COLS * tileY;
    var trackPresent = false;
    if (trackIndex < TRACK_COLS * TRACK_ROWS) {
	trackPresent = trackGrid[trackIndex] == TRACK_WALL;
	trackGrid[trackIndex] = TRACK_ROAD;
    }
    return trackPresent;
}

function trackToTileIndex(tileCol, tileRow) {
    return tileCol + TRACK_COLS * tileRow;
}

function getTrackAtPixelCoord(pixelX, pixelY) {
    var tileCol = Math.floor(pixelX / TRACK_W);
    var tileRow = Math.floor(pixelY / TRACK_H);
    if (tileCol < 0 || tileCol >= TRACK_COLS ||
	tileRow < 0 || tileRow >= TRACK_ROWS) {
	return TRACK_WALL;
    }

    var trackIndex = trackToTileIndex(tileCol, tileRow);
    return trackGrid[trackIndex];
}
