const ROOM_W = 50;
const ROOM_H = 50;
const ROOM_COLS = 16;
const ROOM_ROWS = 13;

var roomGrid = [
					6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7,
					3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
					3, 0, 0, 0, 6, 1, 9, 9, 1, 9, 7, 0, 0, 0, 0, 2,
				   10, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2,
					3, 0, 0, 0,10, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2,
					6, 0, 1, 1, 3, 0,11, 0, 0, 0, 2, 5, 5, 5, 5, 4,
					3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2,
					3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2,
					3, 0,11, 0, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2,				
				   10, 0, 0, 0, 8, 5, 5, 5, 0, 5, 4, 0, 0,11, 0, 2,
					3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
					8, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4
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
//	return levelList[levelNow].cols;
}
					
function drawTracks(){
	var tileIndex = 0;
	var tileLeftEdgeX = 0;
	var tileTopEdgeY = 0;
	
	for(var eachRow = 0; eachRow<ROOM_ROWS; eachRow++){
		
		tileLeftEdgeX = 0;
		
		for(var eachCol=0; eachCol<ROOM_COLS; eachCol++) {
			
			var trackTypeHere = roomGrid[tileIndex];
			
			//if(tileTypeHasTransparency(trackTypeHere)) {
			//	canvasContext.drawImage(trackPics[TILE_ROAD], tileLeftEdgeX, tileTopEdgeY);
			//}
			drawImageTile(eachRow, eachCol, trackTypeHere);
			tileIndex++;
			tileLeftEdgeX += ROOM_W;
				
		} // end of each col
		
		tileTopEdgeY += ROOM_H;
		
	} // end of each row
}

function drawImageTile(x, y, index) {
		if (!canvasContext) {
			return;
		}
		canvasContext.save();
		canvasContext.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2 );  
		canvasContext.drawImage(spriteSheet1Pic, index * tileWidth, 0, tileWidth, spriteSheet1Pic.height,
			-tileWidth / 2, 0, tileWidth, spriteSheet1Pic.height);
		
		canvasContext.restore();
	}


////// Not used yet //////

/*
function isWallAtTileCoord(trackTileCol, trackTileRow){
				var tileIndex = roomTileToIndex(tileCol, tileRow);
				return tileIndex;
}

function rowColToArrayIndex(col, row) {
	return col + ROOM_COLS * row;
}			

			
function getTileIndexAtPixelCoord(pixelX,pixelY){
	var tileCol = pixelX / ROOM_W;		
	var tileRow = pixelY / ROOM_H;
				
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);
				
	if(tileCol < 0 || tileCol >= ROOM_COLS || 
		tileRow < 0 || tileRow >= ROOM_ROWS) {
		document.getElementById("debugText").innerHTML = "out of bounds: " +pixelX+", "+pixelY;
		return undefined; // checking for out of bounds 
	}
				
	var tileIndex = roomTileToIndex(tileCol, tileRow);
	return tileIndex;
}		

			
function roomTileToIndex(tileCol, tileRow) {
	return(tileCol + ROOM_COLS*tileRow);
}
*/			