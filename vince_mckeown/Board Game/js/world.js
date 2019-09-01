const ROOM_W = 50;
const ROOM_H = 50;
const ROOM_COLS = 16;
const ROOM_ROWS = 12;

//Not used yet
var roomGrid = [
					1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,				
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
					];
					
	const water = 1;
	const land = 2;
	


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
			console.log(trackTypeHere);
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