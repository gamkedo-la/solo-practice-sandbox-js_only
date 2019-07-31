const track = new (function() {
	const TILE_WIDTH = 40;
	const TILE_HEIGHT = 40;
	const COLS = 20;
	const ROWS = 15;
	const GRID = [
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
	const TILE_INDEX = {
		_default: Number.MAX_SAFE_INTEGER,
		road: 0,
		wall: 1,
		player: 2,
		goal: 3,
		tree: 4,
		flag: 5
	};
	const TILE_TYPES = {
		[TILE_INDEX.road]: {
			image: imageLoader.getImage('TRACK_ROAD'),
			driveable: true,
			onDrive: ()=>{}
		},
		[TILE_INDEX.wall]: {
			image: imageLoader.getImage('TRACK_WALL'),
			driveable: false,
			onDrive: ()=>{}
		},
		[TILE_INDEX.player]: {
			image: imageLoader.getImage('TRACK_ROAD'),
			driveable: true,
			onDrive: ()=>{}
		},
		[TILE_INDEX.goal]: {
			image: imageLoader.getImage('TRACK_GOAL'),
			driveable: true,
			onDrive: function(car) {
				document.getElementById("debugText").innerHTML = car.myName + " hit the goal line";
				takenPlayerTiles.splice(0, takenPlayerTiles.length);
				p1.carReset();
				p2.carReset();
		}},
		[TILE_INDEX.tree]: {
			image: imageLoader.getImage('TRACK_TREE'),
			driveable: true,
			onDrive: ()=>{}
		},
		[TILE_INDEX.flag]: {
			image: imageLoader.getImage('TRACK_FLAG'),
			driveable: true,
			onDrive: ()=>{}
		},
		[TILE_INDEX._default]: {
			image: imageLoader.getImage('TRACK_WALL'),
			driveable: false,
			onDrive: ()=>{}
		}
	};
	const takenPlayerTiles = [];

	this.getTileAtPixelCoord = function(X, Y) {
		const tileCol = Math.floor(X / TILE_WIDTH);
		const tileRow = Math.floor(Y / TILE_HEIGHT);
		if (tileCol < 0 || tileCol >= COLS ||
			tileRow < 0 || tileRow >= ROWS) {
			return TILE_TYPES[TILE_INDEX._default];
		}
		const trackIndex = this.trackToTileIndex(tileCol, tileRow);
		return TILE_TYPES[GRID[trackIndex]];
	};

	this.trackToTileIndex = function(tileCol, tileRow) {
		return tileCol + COLS * tileRow;
	};

	this.draw = function() {
		let trackIndex = 0;
		let trackLeftEdgeX = 0;
		let trackTopEdgeY = 0;
		for (let eachRow=0; eachRow<ROWS; eachRow++) {
			trackLeftEdgeX = 0;
			for (let eachCol=0; eachCol<COLS; eachCol++) {
				let tileTypeHere = TILE_TYPES[GRID[trackIndex]];
				if (tileTypeHere.image) {
					canvasContext.drawImage(tileTypeHere.image, trackLeftEdgeX, trackTopEdgeY);
				}
				trackIndex++;
				trackLeftEdgeX += TILE_WIDTH;
			}
			trackTopEdgeY += TILE_HEIGHT;
		}
	};

	this.getFreePlayerTileCoord = function() {
		for(let i=0; i<GRID.length; i++){
			let tileKey = GRID[i];
			if(tileKey == TILE_INDEX.player && !takenPlayerTiles.includes(i)) {
				let tileRow = Math.floor(i/COLS);
				let tileCol = i % COLS;
				let homeX = tileCol * TILE_WIDTH + 0.5*TILE_WIDTH;
				let homeY = tileRow * TILE_HEIGHT + 0.5*TILE_HEIGHT;
				takenPlayerTiles.push(i);
				return [homeX, homeY];
			}
		}
		return [-1, -1];
	}
})();

function checkForAndRemoveTrackAtPixelCoord(pixelX, pixelY) {
    var tileX = Math.floor(pixelX / TRACK_W);
    var tileY = Math.floor(pixelY / TRACK_H);
    var trackIndex = tileX + TRACK_COLS * tileY;
    var trackPresent = false;
    if (trackIndex < TRACK_COLS * TRACK_ROWS) {
		trackPresent = trackGrid[trackIndex] == trackTypes[1];
		trackGrid[trackIndex] = trackTypes[0];
    }
    return trackPresent;
}
