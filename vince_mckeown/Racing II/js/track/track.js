const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

var levelOne = 
	[
	50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  3,  3, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 50,  1,  1, 50,
	50,  1,  1, 51, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 50,
	50,  1,  1, 51, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 50,
	50, 52, 52, 51, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 50,
	50, 51, 51, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,  1,  1, 50,
	50,  1,  1, 51, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 50,
	50,  1,  1, 51, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 50,
	50,  0,  0, 51, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 50,
	50,  0,  0, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 50,  1,  1, 50,
	50,  0,  0,  2,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,  
	50,  0,  0,  2,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,	
	50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50
	];
	
var levelTwo = 
	[
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,  
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,	
	50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50
	];
	
var levelThree = 
	[
	50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,  
	50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 50,	
	50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50
	];
	
var levelList = [levelOne, levelTwo, levelThree];
var levelNow = 0;
var trackGrid = [];
// 0 through 49 are dedicated for road tiles				
const TRACK_PLAYER = 0;
const TRACK_ROAD = 1;
const TRACK_FINISH = 2;
const TRACK_ROAD_AAA = 3;
const TRACK_ROAD_BBB = 4;
const TRACK_ROAD_CCC = 5;

// 50 through 99 are dedicated for track obstacles
const TRACK_WALL = 50;
const TRACK_GRASS = 51;
const TRACK_OIL_SLICK = 52;
const TRACK_NORTH_RAMP = 53;


function nextLevel() {
	levelNow++;
	if(levelNow >= levelList.length) {
		levelNow = 0;
	}
	loadLevel(levelList[levelNow]);
}

function loadLevel(whichLevel) {	
	trackGrid = whichLevel.slice();
	console.log('Car Pic: ' + carPic);
	console.log('X: ' + playerOne.x + ' Y: ' + playerOne.y);
	playerOne.carReset(carPic, "Car 1", false); 
	playerTwo.carReset(carPic2, "Car 2", true);
	playerThree.carReset(carPic2, "Car 3", true);
	playerFour.carReset(carPic2, "Car 4", true);
	playerFive.carReset(carPic2, "Car 5", true);
	playerSix.carReset(carPic2, "Car 6", true);
	playerSeven.carReset(carPic2, "Car 7", true);
	playerEight.carReset(carPic2, "Car 8", true);
}
		
function drawTracks(){
	var trackIndex = 0;
	var trackLeftEdgeX = 0;
	var trackTopEdgeY = 0;
	var spriteSheet = roadSpriteSheet;
	
	for(var eachRow = 0; eachRow<TRACK_ROWS; eachRow++){
		
		trackLeftEdgeX = 0;
		
		for(var eachCol=0; eachCol<TRACK_COLS; eachCol++) {
			
			var trackTypeHere = trackGrid[trackIndex];
			var imageOffsetY = 0;
			if (trackTypeHere >= 0 && trackTypeHere < 50){
				spriteSheet = roadSpriteSheet;
				if (trackTypeHere > 9 && trackTypeHere <= 19){
					imageOffsetY = TRACK_H;
				} else if (trackTypeHere > 19 && trackTypeHere <= 29){
					imageOffsetY = TRACK_H * 2;
				} else if (trackTypeHere > 29 && trackTypeHere <= 39){
					imageOffsetY = TRACK_H * 3;
				} else if (trackTypeHere > 39 && trackTypeHere <= 49){
					imageOffsetY = TRACK_H * 4;
				}
			}
			else if (trackTypeHere >= 50 && trackTypeHere < 100){
				spriteSheet = trackobstaclesSpriteSheet;
				var trackTypeHere = trackTypeHere - 50;
				if (trackTypeHere > 9 && trackTypeHere <= 19){
					imageOffsetY = TRACK_H;
				} else if (trackTypeHere > 19 && trackTypeHere <= 29){
					imageOffsetY = TRACK_H * 2;
				} else if (trackTypeHere > 29 && trackTypeHere <= 39){
					imageOffsetY = TRACK_H * 3;
				} else if (trackTypeHere > 39 && trackTypeHere <= 49){
					imageOffsetY = TRACK_H * 4;
				}
			}
			
			if (tileTypeHasRoadTransparency(trackTypeHere)) {
				canvasContext.drawImage( roadSpriteSheet, 0, 0, TRACK_W, TRACK_H, trackLeftEdgeX, trackTopEdgeY, TRACK_W, TRACK_H);
				//canvasContext.drawImage(trackPics[TRACK_ROAD], trackLeftEdgeX, trackTopEdgeY);
			}
			
			canvasContext.drawImage( spriteSheet, trackTypeHere * TRACK_W, imageOffsetY, TRACK_W, TRACK_H, trackLeftEdgeX, trackTopEdgeY, TRACK_W, TRACK_H);

			//canvasContext.drawImage(trackPics[trackTypeHere], trackLeftEdgeX, trackTopEdgeY);
				
			trackIndex++;
			trackLeftEdgeX += TRACK_W;
				
		} // end of each col
		
		trackTopEdgeY += TRACK_H;
		
	} // end of each row
}

function tileTypeHasRoadTransparency(checkTileType){
	return	(
			checkTileType == TRACK_OIL_SLICK || 
			checkTileType == TRACK_OIL_SLICK
			);
}



function isWallAtTileCoord(trackTileCol, trackTileRow){
				var trackIndex = trackTileCol + TRACK_COLS*trackTileRow;
				return (trackGrid[trackIndex] == TRACK_WALL);
}

function rowColToArrayIndex(col, row) {
	return col + TRACK_COLS * row;
}			

			
function getTrackAtPixelCoord(pixelX,pixelY){
	var tileCol = pixelX / TRACK_W;		
	var tileRow = pixelY / TRACK_H;
				
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);
				
	if(tileCol < 0 || tileCol >= TRACK_COLS || tileRow < 0 || tileRow >= TRACK_ROWS) {
		return TRACK_WALL; // This returns Track Wall to prevent out of bounds as a wall.
	}
				
	var trackIndex = trackTileToIndex(tileCol, tileRow);
	return (trackGrid[trackIndex]);
}		

			
function trackTileToIndex(tileCol, tileRow) {
	return(tileCol + TRACK_COLS*tileRow);
}
			