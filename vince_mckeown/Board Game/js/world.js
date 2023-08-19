const ROOM_W = 50;
const ROOM_H = 50;
const ROOM_COLS = 16;
const ROOM_ROWS = 13;


//Not used yet
var roomGrid = [
					6, 4, 4, 4, 4, 4, 4, 4, 4,10, 4, 4, 4, 4, 4, 4,
					4, 4, 5, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
					4,10, 6, 7, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
					4, 4, 4, 6, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4,
					4, 1, 1,10, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 4,
					4, 1, 1,10, 1, 1, 1, 4, 4, 4, 1, 1, 2, 1, 1, 4,
					4, 1,10,11,10,10, 1, 4, 7, 4, 1, 1, 1, 1, 1, 4,
					4, 1,10,11,11,10,10, 4, 4, 4, 1, 1, 1, 3, 1, 6,
					4, 1,10,10,10,10, 1, 1, 1, 1, 1, 4, 4, 4, 4, 6,				
					4, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 4, 9, 4, 4, 6,
					4, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 4, 4, 4, 5, 7,
					4, 4, 4, 7, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
					];
					
	const WATER1 = 1;
	const LAND_1 = 4;
	const LAND_2 = 5;
	const LAND_3 = 6;
	const LAND_4 = 7;
	
function tileTypeHasTransparency(checkTileType){
	//return (checkTileType == TILE_FINISH ||
			//checkTileType == TILE_YELLOW_DOOR ||
			//checkTileType == TILE_YELLOW_KEY);
	}
	
function getTileTypeAtPixelCoord(atX, atY) {
	var trackCol = Math.floor(atX / ROOM_W);
	var trackRow = Math.floor(atY / ROOM_H);
	var trackIndexUnderVehicle = rowColToArrayIndex(trackCol, trackRow);

	return trackIndexUnderVehicle;
}

function rowColToArrayIndex(col, row) {
	return col + getCurrentTrackCols() * row;
}

function getCurrentTrackCols() {
	return 12;
}
					
function drawTracks(){
	var tileIndex = 0;
	var tileLeftEdgeX = 0;
	var tileTopEdgeY = 0;
	
	//floor
	for(var eachRow = 0; eachRow<ROOM_ROWS; eachRow++){
		tileLeftEdgeX = 0;
		for(var eachCol=0; eachCol<ROOM_COLS; eachCol++) {
			var trackTypeHere = roomGrid[tileIndex];
			drawImageTile(eachRow, eachCol, trackTypeHere);
			tileIndex++;
			tileLeftEdgeX += ROOM_W;
		} 
		tileTopEdgeY += ROOM_H;
	} // end of each row
	//walls
	for(var eachRow = 0; eachRow<ROOM_ROWS; eachRow++){
		tileLeftEdgeX = 0;
		for(var eachCol=0; eachCol<ROOM_COLS; eachCol++) {
			var trackTypeHere = roomGrid[tileIndex];
			drawImageTile(eachRow, eachCol, trackTypeHere);
			tileIndex++;
			tileLeftEdgeX += ROOM_W;
		} 
		tileTopEdgeY += ROOM_H;
	} // end of each row

}

function drawImageTile(x, y, index) {
		if (!canvasContext) {
			return;
		}
		canvasContext.save();
		canvasContext.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);  
		canvasContext.drawImage(grassPic, index * tileWidth, 0, tileWidth, grassPic.height,
			-tileWidth / 2, 0, tileWidth, grassPic.height);

		canvasContext.restore();
	}