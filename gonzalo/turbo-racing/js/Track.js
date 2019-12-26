const track = new (function() {
	const TILE_WIDTH = 40;
	const TILE_HEIGHT = 40;
	const COLS = 20;
	const ROWS = 15;
	const GRID = [
		 4,  4, 10,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  9,  4, ////
		 4, 10, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 12,  9, ////
		10, 11,  0,  0,  0,  0,  0,  0,  6,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  8, ////
		11,  0,  0,  0,  0, 10,  1,  1,  1,  1,  1,  1,  1,  1,  1,  9,  0,  0,  0,  8, ////
		 7,  0,  6,  0, 10,  9,  7,  4,  4,  4,  4,  4,  4,  4,  4, 10,  9,  0,  0,  8, ////
	  	 7,  0,  0, 10, 11, 12,  1,  1,  9,  4, 10,  1,  1,  1,  1, 11,  8,  0,  0,  8, ////
		 7,  0,  0,  8,  0,  0,  0,  0,  8,  4,  8,  0,  0,  0,  0,  0,  8,  0,  0,  8, ////
		 7,  0,  6,  8,  0,  0,  0,  0, 12,  1,  9,  0,  0,  0,  0,  0,  8,  0,  0,  8, ////
		 7,  0,  0,  8,  0,  0,  0,  0,  0,  0, 14,  0,  0,  5,  0,  0,  8,  0,  0,  8, ////
		 8,  0,  0,  8,  0,  0,  5,  0,  0,  0,  5,  0,  0,  8,  0,  0,  8,  0,  0,  8, ////
		 8,  2,  2,  8,  0, 10,  1,  9,  0,  0,  0,  0,  0,  8,  0,  0,  5,  0,  0,  8, ////
		13,  1,  1,  5,  0,  8,  7,  8,  0,  0,  0,  0,  0,  8,  0,  0,  0,  0,  0,  8, ////
		 8,  0,  3,  0,  0,  8,  4, 12,  1,  9,  0,  0, 10,  9,  0,  0,  0,  0,  0, 10, ////
		 8,  0,  3,  0,  0,  8,  7,  4,  7, 12,  1,  1, 11, 12,  9,  0,  0,  0, 10, 11, ////
		12,  1,  1,  5,  1, 11,  4,  7,  4,  4,  7,  4,  4,  4, 12,  1,  1,  1, 11,  4
	];
	const TILE_INDEX = {
		_default: Number.MAX_SAFE_INTEGER,
		road: 0,
		wall: 1,
		player: 2,
		goal: 3,
		tree: 4,
		flag: 5,
		oil: 6,
		grass: 7,
		wallSide: 8,
		wallCornerNE: 9,
		wallCornerNW: 10,
		wallCornerSE: 11,
		wallCornerSW: 12,
		wallJoin: 13,
		pillar: 14,
		pillarE: 15,
		pillarW: 16
	};
	const TILE_TYPES = {
		[TILE_INDEX.road]: {
			imageId: 'TRACK_ROAD',
			driveable: true,
			onDrive: (car)=>{car.canSteer = true}
		},
		[TILE_INDEX.wall]: {
			imageId: 'TRACK_WALL',
			driveable: false,
			onDrive: ()=>{}
		},
		[TILE_INDEX.player]: {
			imageId: 'TRACK_ROAD',
			driveable: true,
			onDrive: ()=>{}
		},
		[TILE_INDEX.goal]: {
			imageId: 'TRACK_GOAL',
			driveable: true,
			onDrive: function(car) {
				document.getElementById("debugText").innerHTML = car.myName + " hit the goal line";
				takenPlayerTiles.splice(0, takenPlayerTiles.length);
				p1.carReset();
				p2.carReset();
		}},
		[TILE_INDEX.tree]: {
			imageId: 'TRACK_TREE',
			driveable: true,
			onDrive: ()=>{}
		},
		[TILE_INDEX.flag]: {
			imageId: 'TRACK_FLAG',
			driveable: false,
			onDrive: ()=>{}
		},
		[TILE_INDEX.oil]: {
			imageId: 'TRACK_OIL',
			driveable: true,
			onDrive: (car) => {car.canSteer = false}
		},
		[TILE_INDEX.grass]: {
			imageId: 'TRACK_GRASS',
			driveable: true,
			onDrive: (car) => {car.carSpeed /= 2}
		},
		[TILE_INDEX.wallSide]: {
			imageId: 'TRACK_WALL_SIDE',
			driveable: false,
			onDrive: ()=>{}
		},
		[TILE_INDEX.wallCornerNE]: {
			imageId: 'TRACK_WALL_NE',
			driveable: false,
			onDrive: ()=>{},
		},
		[TILE_INDEX.wallCornerNW]: {
			imageId: 'TRACK_WALL_NW',
			driveable: false,
			onDrive: ()=>{}
		},
		[TILE_INDEX.wallCornerSE]: {
			imageId: 'TRACK_WALL_SE',
			driveable: false,
			onDrive: ()=>{},
		},
		[TILE_INDEX.wallCornerSW]: {
			imageId: 'TRACK_WALL_SW',
			driveable: false,
			onDrive: ()=>{},
		},
		[TILE_INDEX.wallJoin]: {
			imageId: 'TRACK_WALL_JOIN',
			driveable: false,
			onDrive: ()=>{},
		},
		[TILE_INDEX.pillar]: {
			imageId: 'TRACK_PILLAR',
			driveable: false,
			onDrive: ()=>{},
		},
		[TILE_INDEX.pillarE]: {
			imageId: 'TRACK_PILLAR_E',
			driveable: false,
			onDrive: ()=>{},
		},
		[TILE_INDEX.pillarW]: {
			imageId: 'TRACK_PILLAR_W',
			driveable: false,
			onDrive: ()=>{},
		},
		[TILE_INDEX._default]: {
			imageId: 'TRACK_WALL',
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
				if (tileTypeHere.imageId) {
					canvasContext.drawImage(imageLoader.getImage(tileTypeHere.imageId), trackLeftEdgeX, trackTopEdgeY);
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
