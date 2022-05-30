var slimeList = [];
var slimesKilled = 0;

function addSlime() {
    var tempEnemy = new slimeClass();
    slimeList.push(tempEnemy);
}

function slimeClass(){
  this.x = 0;
  this.y = 0;
  this.speedX = 0;
  this.speedY = 0;
  this.radius = 10;
  this.sx = 0;
  this.sy = 0;
  this.moveLeft = true;
  this.moveRight = false;
  
  this.onGround = false;

  this.reset = function() {
		for(var i=0; i<worldGrid.length; i++){
			if( worldGrid[i] == TILE_SLIME) {
				var tileRow = Math.floor(i/TILE_COLS);
				var tileCol	= i%TILE_COLS;
				var tileLeftEdgeX = 0;
				var tileTopEdgeY = 0;

				this.x = tileCol * TILE_W + 0.5 * TILE_W; 
				this.y = tileRow * TILE_H + 0.5 * TILE_H; 

				worldGrid[i] = TILE_EMPTY;
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

      if(this.x > 600){
          this.moveLeft = true;
          this.moveRight = false;
      } else if (this.x < 50){
          this.moveRight = true;
          this.moveLeft = false;
      } 
    
      if(this.moveLeft) {
        this.speedX = -RUN_SPEED;
        this.sy = 0;
      }
      if(this.moveRight) {
        this.speedX = RUN_SPEED;
        this.sy = 32;
      }

      if(this.speedY < 0 && isBrickAtPixelCoord(this.x,this.y-this.radius)) {
        this.y = (Math.floor( this.y / TILE_H )) * TILE_H + this.radius;
        this.speedY = 0.0;
      }
      
      if(this.speedY > 0 && isBrickAtPixelCoord(this.x,this.y+this.radius)) {
        this.y = (1+Math.floor( this.y / TILE_H )) * TILE_H - this.radius;
        this.onGround = true;
        this.speedY = 0;
      } else if(isBrickAtPixelCoord(this.x,this.y+this.radius + 2)) {
        this.onGround = false;
      }
      
      if(this.speedX < 0 && isBrickAtPixelCoord(this.x-this.radius,this.y)) {
        this.x = (Math.floor( this.x / TILE_W )) * TILE_W + this.radius;
      }

      if(this.speedX > 0 && isBrickAtPixelCoord(this.x+this.radius,this.y)) {
        this.x = (1+Math.floor( this.x / TILE_W )) * TILE_W - this.radius;
      }
      
      this.x += this.speedX; // move the jumper based on its current horizontal speed 
      this.y += this.speedY; // same as above, but for vertical
    }

  this.draw = function(){
    canvasContext.drawImage(slimePic,this.sx,this.sy, 32, 32, this.x, this.y-16, 32, 32);
  }
}