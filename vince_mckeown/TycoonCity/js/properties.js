function propertyClass() {
	
	this.reset = function(){				
		if(this.homeX == undefined) {
			for(var i=0; i<roomGrid.length; i++){
				if( roomGrid[i] == TILE_PROPERTY) {
					var tileRow = Math.floor(i/MAP_COLS);
					var tileCol	= i%MAP_COLS;
					this.homeX = tileCol * TILE_W;
					this.homeY = tileRow * TILE_H;
					roomGrid[i] = TILE_GRASS;
					break;
				}
			}
		}
		this.x = this.homeX;
		this.y = this.homeY;
	}

	
	this.init = function(whichGraphic, whichName) {
		this.graphic = whichGraphic;
		this.myName = whichName;
		this.reset();
	}	
	 		
	this.draw = function(){
		drawBitmapAtLocation(this.graphic, this.x, this.y)
	}
}