const ROOM_W = 50;
const ROOM_H = 50;
const ROOM_COLS = 16;
const ROOM_ROWS = 13;


//Not used yet
var roomGrid = [
					6, 4, 4, 4, 4, 4, 4, 4, 4,10, 4,4,4,4,4,4,
					4, 4, 5, 4, 4, 1, 1, 1, 1, 1, 1,1,1,1,1,4,
					4,10, 6, 7, 6, 1, 1, 3, 1, 1, 1,1,1,1,1,4,
					4, 4, 4, 6, 1, 1, 1, 1, 1, 1, 1,1,0,1,1,4,
					4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1,1,1,1,4,
					4, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1,1,2,1,1,4,
					4, 1, 1,10,10,10, 1, 4, 7, 4, 1,1,1,1,1,4,
					4, 1, 0,10,11,10,10, 4, 4, 4, 1,1,1,1,1,6,
					4, 1, 1,10,10,10, 1, 1, 1, 1, 1,4,4,4,4,6,				
					4, 1, 3, 1, 0, 1, 1, 1, 1, 0, 1,4,9,4,4,6,
					4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,4,4,4,5,7,
					4, 4, 4, 7, 8, 4, 4, 4, 4, 4, 4,4,4,4,4,4
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
			//drawImageTile(eachRow, eachCol, Math.floor(Math.random() * 1));
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
		canvasContext.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2 + (index < 4 ? 5 : 0));  
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