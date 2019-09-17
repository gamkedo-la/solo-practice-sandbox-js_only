const ROOM_W = 50;
const ROOM_H = 50;
const ROOM_COLS = 16;
const ROOM_ROWS = 16;

var roomGrid = [
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
					1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,
					1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,
					1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
					1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
					1,0,0,1,1,3,1,1,3,1,1,1,1,1,3,1,
					1,0,0,1,1,0,0,1,0,5,0,1,0,0,0,1,
					1,0,0,1,1,0,0,1,0,0,0,1,5,0,0,1,
					1,0,0,1,1,0,0,1,0,0,0,1,0,0,0,1,
					1,0,0,1,1,0,0,1,0,0,0,1,0,0,0,1,
					1,0,0,1,1,0,0,1,1,1,1,1,0,0,0,1,				
					1,0,0,1,0,0,4,0,0,1,1,1,0,0,0,1,
					1,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,
					1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1
					];
					
	const TILE_ROAD = 0;
	const TILE_WALL = 1;
	const TILE_PLAYER = 2;
	const TILE_YELLOW_DOOR = 3;
	const TILE_FINISH = 4;
	const TILE_YELLOW_KEY = 5;

function tileTypeHasTransparency(checkTileType){
	return (checkTileType == TILE_FINISH ||
			checkTileType == TILE_YELLOW_DOOR ||
			checkTileType == TILE_YELLOW_KEY);
	}
					
function drawTracks(){
	var tileIndex = 0;
	var tileLeftEdgeX = 700
	var tileTopEdgeY = 0;
	var isoTileLeftEdgeX = 0;
	var isoTileTopEdgeY = 0;
	
	for(var eachRow = 0; eachRow < ROOM_ROWS; eachRow++){
		tileLeftEdgeX = 700;
		
		for(var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
			var trackTypeHere = roomGrid[tileIndex];
			tileLeftEdgeX += ROOM_W;
			isoTileLeftEdgeX = (tileLeftEdgeX - tileTopEdgeY)/2;
			isoTileTopEdgeY = (tileLeftEdgeX + tileTopEdgeY)/4;
			canvasContext.drawImage(trackPics[trackTypeHere], isoTileLeftEdgeX, isoTileTopEdgeY);
			tileIndex++;
		} // end of each col
		
		tileTopEdgeY += ROOM_H;
		//isoTileTopEdgeY = (tileLeftEdgeX + tileTopEdgeY)/2;
		
	} // end of each row
}



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
			