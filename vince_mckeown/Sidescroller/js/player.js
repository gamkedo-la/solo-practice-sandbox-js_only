const RUN_SPEED = 4.0;
const JUMP_POWER = 12.0;

function playerClass(){
  this.x = 0;
  this.y = 0;
  this.speedX = 0;
  this.speedY = 0;
  this.radius = 10;
  
  this.onGround = false;

  this.reset = function() {
		for(var i=0; i<worldGrid.length; i++){
			if( worldGrid[i] == TILE_PLAYER) {
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
    console.log(this.x,this.y)
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
      }
      if(holdRight) {
        this.speedX = RUN_SPEED;
      }

      if(this.speedY < 0 && isBrickAtPixelCoord(this.x,this.y-this.radius)) {
        this.y = (Math.floor( this.y / TILE_H )) * TILE_H + this.radius;
        this.speedY = 0.0;
      }
      
      if(this.speedY > 0 && isBrickAtPixelCoord(this.x,this.y+this.radius)) {
        this.y = (1+Math.floor( this.y / TILE_H )) * TILE_H - this.radius;
        this.onGround = true;
        this.y = 0;
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
    canvasContext.drawImage(playerPic,0,0, 32, 32, this.x, this.y-16, 32, 32);
  }
}