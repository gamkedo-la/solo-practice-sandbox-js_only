var goblinList = [];
var goblinsKilled = 0;

function addGoblin() {
    var tempEnemy = new goblinClass();
    goblinList.push(tempEnemy);
}

function goblinClass(){
  this.x = 0;
  this.y = 0;
  this.speedX = 0;
  this.speedY = 0;
  this.runSpeed = 2;
  this.radius = 10;
  this.sx = 0;
  this.sy = 0;
  this.moveLeft = true;
  this.moveRight = false;
  
  this.onGround = false;
  this.collision = false;

  this.reset = function() {
		for(var i=0; i<levelList[levelNow].length; i++){
			if( levelList[levelNow][i] == TILE_GOBLIN) {
				var tileRow = Math.floor(i/TILE_COLS);
				var tileCol	= i%TILE_COLS;
				var tileLeftEdgeX = 0;
				var tileTopEdgeY = 0;

				this.x = tileCol * TILE_W + 0.5 * TILE_W; 
				this.y = tileRow * TILE_H + 0.5 * TILE_H; 

				levelList[levelNow][i] = TILE_EMPTY;
				break;
			}
		}
  }
    
  this.move = function(){  

    if(this.onGround) {                     //slime is the ground, apply friction
        this.speedX *= GROUND_FRICTION;
    } else {                                //slime is in the air, apply air resistance and gravity
        this.speedX *= AIR_RESISTANCE; 
        this.speedY += GRAVITY;
        if(this.speedY > this.radius) {     // cheap test to ensure can't fall through floor
          this.SpeedY = this.radius;
      }
    }

    if(this.x > 600 ){    //first attempt at AI, move the slime left if x is greater than 600
        this.moveLeft = true;
        this.moveRight = false;
    } else if (this.x < 50 ){  //AI:  Move the slime right if x is less than 50
        this.moveRight = true;
        this.moveLeft = false;
    } 
  
    if(this.moveLeft) {
      this.speedX = -this.runSpeed;
      this.sy = 0;
    }
    if(this.moveRight) {
      this.speedX = this.runSpeed;
      this.sy = 45;
    }

    if(this.speedY < 0 && isBrickAtPixelCoord(this.x,this.y-this.radius)) { //jumping and hit an object
      this.y = (Math.floor( this.y / TILE_H )) * TILE_H + this.radius;
      this.speedY = 0.0;
    }
    
    if(this.speedY > 0 && isBrickAtPixelCoord(this.x,this.y+this.radius)) {  //falling and hit ground  // need to had error handling to stop being in a brick
      this.y = (1+Math.floor( this.y / TILE_H )) * TILE_H - this.radius;
      this.onGround = true;
      this.speedY = 0;
    } else if(!isBrickAtPixelCoord(this.x,this.y+this.radius)) { //falling and didn't hit ground
      this.onGround = false;
    }
    
    if(this.speedX < 0 && isBrickAtPixelCoord(this.x-this.radius,this.y)) { //collision detection to the right
      this.x = (Math.floor( this.x / TILE_W )) * TILE_W + this.radius;
      this.moveRight;
    }

    if(this.speedX > 0 && isBrickAtPixelCoord(this.x+this.radius,this.y)) { //collision detection to the left
      this.x = (1+Math.floor( this.x / TILE_W )) * TILE_W - this.radius;
      this.moveLeft;
    }
    
    this.x += this.speedX; // move the jumper based on its current horizontal speed 
    this.y += this.speedY; // same as above, but for vertical
  }

  this.draw = function(){
    canvasContext.drawImage(goblinPic,this.sx,this.sy, 43, 45, this.x, this.y-33, 43, 45);
    if(this.collision){
      colorText("COLLISION", this.x, this.y, 'white');
    }
  }
}