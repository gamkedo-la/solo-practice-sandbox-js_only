const RUN_SPEED = 4.0;
const JUMP_POWER = 12.0;

function playerClass(){
  this.x = 0;
  this.y = 0;
  this.speedX = 0;
  this.speedY = 0;
  this.radius = 10;
  this.sx = 0;
  this.sy = 0;
  this.height = 32;
  this.width = 100;
  this.health = 10;
  this.timer = 0;
  this.tookHit = false;
  this.vulnerable = true;
  
  this.onGround = false;

  this.reset = function() {
		for(var i=0; i<levelList[levelNow].length; i++){
			if( levelList[levelNow][i] == TILE_PLAYER) {
				var tileRow = Math.floor(i/TILE_COLS);
				var tileCol	= i%TILE_COLS;
				var tileLeftEdgeX = 0;
				var tileTopEdgeY = 0;

				this.x = tileCol * TILE_W + 0.5 * TILE_W; 
				this.y = tileRow * TILE_H + 0.5 * TILE_H; 

				levelList[levelNow][i] = TILE_EMPTY;
        this.health = 2;
				break;
			}
		}
  }
    
  this.move = function(){
      if(this.onGround) {
        this.speedX *= GROUND_FRICTION;
      } else {
        this.speedX *= AIR_RESISTANCE;
        this.speedY += GRAVITY;
        if(this.speedY > this.radius) { // cheap test to ensure can't fall through floor
          this.SpeedY = this.radius;
        }
      }
    
      if(holdLeft) {
        this.speedX = -RUN_SPEED;
        this.sy = 32;
      }
      if(holdRight) {
        this.speedX = RUN_SPEED;
        this.sy = 0;
      }

     // console.log("SpeedY: " + this.speedY)
      if(this.speedY <= 0.6 && isBrickAtPixelCoord(this.x,this.y-this.radius)) {
        ///console.log("Hit Ground")
        this.y = (Math.floor( this.y / TILE_H )) * TILE_H + this.radius;
        this.speedY = 0.0;
      }
      
      if(this.speedY > 0.6 && isBrickAtPixelCoord(this.x,this.y+this.radius)) {
        this.y = (1+Math.floor( this.y / TILE_H )) * TILE_H - this.radius;
        this.onGround = true;
        this.speedY = 0;
        //console.log("On Ground")
      } else if(!isBrickAtPixelCoord(this.x,this.y+this.radius)) {
        this.onGround = false;
        //console.log("Not on ground")
      }
      
      if(this.speedX < 0 && isBrickAtPixelCoord(this.x-this.radius,this.y)) {
        this.x = (Math.floor( this.x / TILE_W )) * TILE_W + this.radius;
        //console.log("side collision")
      }

      if(this.speedX > 0 && isBrickAtPixelCoord(this.x+this.radius,this.y)) {
        this.x = (1+Math.floor( this.x / TILE_W )) * TILE_W - this.radius;
        //console.log("side collision")
      }

      //refactor - check for collisions
      //slimes
      for(var i = 0; i < slimeList.length; i++){
        let enemyX = slimeList[i].x;
        let enemyY = slimeList[i].y;
        
        let playerWidth = this.x + 32;
        let playerHeight = this.y + 32;

        //console.log(this.y <= enemyY)// && playerHeight > enemyY)
      
        if(this.x < enemyX && playerWidth > enemyX &&
           this.y <= enemyY && playerHeight > enemyY){
             slimeList[i].collision = true;
             this.hit(1)
        } else {
          slimeList[i].collision = false;
        }
      }

      //Tile Collisions
      let walkIntoTileIndex = getTileTypeAtPixelCoord(this.x, this.y);
      let walkIntoTileType = levelList[levelNow][walkIntoTileIndex];

      switch(walkIntoTileType) {
        case TILE_HEALTH_POTION_SMALL:
          this.health++;  
          levelList[levelNow][walkIntoTileIndex] = TILE_EMPTY;
        break;
        case TILE_HEALTH_POTION_MEDIUM:
          this.health = this.health + 2;  
          levelList[levelNow][walkIntoTileIndex] = TILE_EMPTY;
        break;
        default:
				break
      }
      
      this.x += this.speedX; // move the jumper based on its current horizontal speed 
      this.y += this.speedY; // same as above, but for vertical
    }

  this.invulnerableTiming = function(){
    if(this.tookHit){
      this.vulnerable = false;
      this.timer++;
    }
    if(this.timer > 50){
      this.vulnerable = true;
      this.timer = 0;
      this.tookHit = false;
    }
  }

  this.hit = function(amount){
    if(this.vulnerable){
      this.tookHit = true;
      let damage = amount;
      this.health = this.health - damage;
      if(this.health <= 0){
        console.log("Died");
        nextLevel();
      }    
    }
  }

  this.draw = function(){
    canvasContext.drawImage(playerPic,this.sx,this.sy, 32, 32, this.x, this.y-16, 32, 32);
  }
}