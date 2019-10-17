ratNames = [ "rat"];

ratClass.prototype = new enemyClass();
function ratClass() {
	this.width = 58; 
	this.height = 33; 
	this.maxHealth = 4;
	this.speed = 4;
	
	this.superClassReset = this.ratReset;
	this.ratReset = function() {
		this.speed = 4;
		this.hitPoints = this.maxHitPoints;
	}
					
	this.superClassInitialize = this.init;
	this.init = function(whichGraphic, whichName, whichTile) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.myTile = whichTile;
		this.ratReset();
	}	
	 
	this.superClassMove = this.movement;
	this.movement = function() {
		
	}
	
	this.superClassDraw = this.draw;
	this.draw = function(){
		gameCoordToIsoCoord(this.x,this.y);
		colorText(this.myName, isoDrawX + 20, isoDrawY - 30, "black", "8px Arial Black");
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height, 
								isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.height);
		//displays health
		colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, 24, 9, "red");
		colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, (this.health / this.maxHealth) * 24, 9, "green");
		canvasContext.drawImage(healthbarPic,isoDrawX-(this.width/2), isoDrawY-this.height - 20);
		//colorRect(this.miniMapX, this.miniMapY, 10, 10, "green");	
	}
}