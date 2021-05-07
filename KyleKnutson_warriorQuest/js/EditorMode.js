/*
	-draw the a blank tiled map
	-create image-buttons for each different tile
	-image-button stores Tile_id
	-click on blank map tiles to store value of tile at map-index
	-refresh map
	-when done editing a map, click --"CREATE MAP DATA"-- to display "text version" of Map data.
	-create more
	-when done editing, click --"Return To Title Screen"-- to leave Editor Mode
*/



let freshMap = 	[	00, 00, 00, 00, 00, 00, 00, 02, 00, 00, 00, 00, 00, 00, 00, 00,
					00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
					00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
					00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
					00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
					00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
					00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
					00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
					00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
					00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
					00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
					00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, ];




freshMap = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
			 1, 0, 0, 0, 0, 4, 1, 1, 1, 1, 1, 1, 0, 4, 7, 1, 
			 1, 0, 1, 1, 1, 1, 1, 1, 8, 6, 0, 5, 0, 0, 0, 1, 
			 1, 0, 1, 1, 1, 7, 5, 0, 6, 6, 1, 1, 0, 0, 0, 1, 
			 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 
			 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 
			 1, 1, 5, 1, 1, 1, 4, 0, 0, 0, 0, 5, 0, 0, 0, 1, 
			 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 6, 1, 1, 1, 
			 1, 0, 0, 0, 1, 1, 4, 0, 0, 0, 0, 1, 6, 1, 4, 1, 
			 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 6, 1, 6, 1, 
			 1, 1, 3, 1, 1, 1, 1, 1, 0, 1, 1, 1, 6, 6, 6, 1, 
			 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1 ]





let storedTileValue;


// ------ COPIED FUNCTION FROM WORLD.JS --------
// --- MAY REPURPOSE FOR FINDING MOUSE X/Y ONCLICK ----
// ------------------------------------------------
// function getTileIndexAtPixelCoord(atX, atY) {
// 	var warriorWorldCol = Math.floor(atX / WORLD_W);
// 	var warriorWorldRow = Math.floor(atY / WORLD_H);
// 	var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

// 	console.log(worldIndexUnderWarrior);

// 	if(warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
// 		warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {
// 		return worldIndexUnderWarrior;
// 	} // end of valid col and row
// 	return undefined;
// } // end of warriorWorldHandling func


function setStoredTileValue(val) {
	storedTileValue = val;
	console.log(storedTileValue)

	return storedTileValue;
}

var imageList = [
		// {varName: warriorPic, theFile: "warrior.png"},
		{varName: warriorFacingNorth, 	theFile: "images/warrior-face-north.png"},
		{varName: warriorFacingEast, 	theFile: "images/warrior-face-east.png"},
		{varName: warriorFacingSouth, 	theFile: "images/warrior-face-south.png"},
		{varName: warriorFacingWest, 	theFile: "images/warrior-face-west.png"},
		{varName: emptyHeart, 			theFile: "images/heart_empty.png"},
		{varName: leftHalfHeart, 		theFile: "images/heart_left_half.png"},
		{varName: rightHalfHeart, 		theFile: "images/heart_right_half.png"},

		{varName: tile_Ground, 		theFile: "images/tile_ground.png", 	tileValue: 00},
		{varName: tile_Wall, 		theFile: "images/tile_wall.png", 	tileValue: 01},
		{varName: tile_Chest, 		theFile: "images/tile_chest.png", 	tileValue: 03},
		{varName: tile_GoldenKey, 	theFile: "images/tile_key.png", 	tileValue: 4},
		{varName: tile_Door, 		theFile: "images/tile_door.png", 	tileValue: 5},
		{varName: tile_Spikes, 		theFile: "images/tile_spikes.png", 	tileValue: 6},
		{varName: tile_Food, 		theFile: "images/tile_food.png", 	tileValue: 7},
		{varName: tile_Potion, 		theFile: "images/tile_potion.png", 	tileValue: 8}

	];

function setupTileButtons() {
	let tileButtonContainer = document.getElementById('editor-mode');
	let htmlString = "";
	let i;
	for(i=7; i<imageList.length; i++) {
		htmlString += `<input id=${imageList[i].tileValue} type='image' src=${imageList[i].theFile} onClick="setStoredTileValue(${imageList[i].tileValue})"></input> `;
	} // end of Loop

	tileButtonContainer.innerHTML += htmlString;

	let btn = document.createElement('button');
	btn.innerHTML = 'Generate Level Data';
	btn.addEventListener('click', generateReadableMapData);
	tileButtonContainer.appendChild(btn);

}

function generateReadableMapData() {
	let freshMapText = freshMap+'';
	let readableString ='[ ' + freshMapText.replace(/,/g , ", ") + ' ]';
	
	console.log(readableString)
}


