const TILE_W = 50;
const TILE_H = 50;
const MAP_COLS = 16;
const MAP_ROWS = 12;

var roomGrid = [
					1,0,2,1,0,0,0,0,0,0,0,0,0,2,0,0,
					0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,
					2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
					0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,
					0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,
					0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,
					0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,
					0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,
					0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,			
					2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
					0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,
					0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0
					];
					
	const TILE_GRASS = 0;
	const TILE_PROPERTY = 1;
	const TILE_ROAD = 2;


function tileTypeHasTransparency(checkTileType){
	return 
}
					
function drawLandScape(){
	var tileIndex = 0;
	var tileLeftEdgeX = 0;
	var tileTopEdgeY = 0;
	
	for(var eachRow = 0; eachRow<MAP_ROWS; eachRow++){
		
		tileLeftEdgeX = 0;
		
		for(var eachCol=0; eachCol<MAP_COLS; eachCol++) {
			
			var trackTypeHere = roomGrid[tileIndex];
			
			if(tileTypeHasTransparency(trackTypeHere)) {
				canvasContext.drawImage(trackPics[TILE_ROAD], tileLeftEdgeX, tileTopEdgeY);
			}
			canvasContext.drawImage(trackPics[trackTypeHere], tileLeftEdgeX, tileTopEdgeY);
			tileIndex++;
			tileLeftEdgeX += TILE_W;
				
		} // end of each col
		
		tileTopEdgeY += TILE_H;
		
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
	var tileCol = pixelX / TILE_W;		
	var tileRow = pixelY / TILE_H;
				
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);
				
	if(tileCol < 0 || tileCol >= MAP_COLS || 
		tileRow < 0 || tileRow >= MAP_ROWS) {
		document.getElementById("debugText").innerHTML = "out of bounds: " +pixelX+", "+pixelY;
		return undefined; // checking for out of bounds 
	}
				
	var tileIndex = roomTileToIndex(tileCol, tileRow);
	return tileIndex;
}		

			
function roomTileToIndex(tileCol, tileRow) {
	return(tileCol + MAP_COLS*tileRow);
}
			