var rockBulletList = [];

function addRockBullet(){
	var tempBullet = new rockBulletClass();
	rockBulletList.push(tempBullet);
}

function rockBulletClass(){
	this.x = 370;
	this.y = 0;
	this.width = 10	
    this.height = 10;
	this.isoEnemyFootY = 30;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
	
	this.maxHealth = 1;
	this.speed = 10;
	this.health = this.maxHealth;
	
	this.movementTimer = 0;
	this.moveNorth = false;
	this.moveEast = false;
	this.moveSouth = true;
	this.moveWest = false;
	this.moveNorth = true;
	this.canMoveEast = true;
	this.canMoveSouth = true;
	this.canMoveWest = true;

    this.movement = function() {
		var nextX = this.x; 
		var nextY = this.y; 

        if(this.moveSouth){
            nextY += this.speed;
        }

        this.x = nextX;
        this.y = nextY;
    }

    this.draw = function(){
        gameCoordToIsoCoord(this.x,this.y);
       // colorRect(isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, 200, 200, 'red');
        canvasContext.drawImage(rockBulletPic,isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y);
    }

}