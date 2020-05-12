function propertyClass() {
					
	this.init = function(whichGraphic, whichName, xPos, yPos) {
		this.graphic = whichGraphic;
		this.myName = whichName;
		this.x = xPos;
		this.y = yPos;
	}	
	 		
	this.draw = function(){
		drawBitmapAtLocation(this.graphic, this.x, this.y)
	}
}