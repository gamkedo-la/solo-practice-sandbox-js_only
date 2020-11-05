const PLAYER_MOVE_SPEED = 3.0;

function warriorClass(){
  // warrior starting position variables
  this.x = 75;
  this.y = 75;
  this.myWarriorPic; // which picture to use
  this.name = "Untitled Warrior";

  this.keyHeld_Up = false;
  this.keyHeld_Down = false;
  this.keyHeld_Left = false;
  this.keyHeld_Right = false;

  this.controlKeyUp;
  this.controlKeyRight;
  this.controlKeyDown;
  this.controlKeyLeft;

  this.setupInput = function(upKey, rightKey, downKey, leftKey){
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;
  }

  this.reset = function(whichImage, warriorName) {
    this.name = warriorName;
    this.myWarriorPic = whichImage;

    for(let eachRow = 0; eachRow < WORLD_ROWS; eachRow++){
      for(let eachCol = 0; eachCol < WORLD_COLS; eachCol++){
        let arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if(worldGrid[arrayIndex] == WORLD_PLAYERSTART){
          worldGrid[arrayIndex] = WORLD_FLOOR;
          this.x = eachCol * WORLD_W + WORLD_W/2;
          this.y = eachRow * WORLD_H + WORLD_H/2;
          return;  
        } // end of player start if
      } // end of for col
    } //end of for row
  } // end of warriorReset()

  this.move = function(){
    let nextX = this.x; 
    let nextY = this.y; 

    if(this.keyHeld_Up){
      nextY -= PLAYER_MOVE_SPEED;
    }
    if(this.keyHeld_Right){
      nextX += PLAYER_MOVE_SPEED;
    }
    if(this.keyHeld_Down){
      nextY += PLAYER_MOVE_SPEED;
    }
    if(this.keyHeld_Left){
      nextX -= PLAYER_MOVE_SPEED;
    }
    
    let walkIntoTileIndex = warriorWorldCoord(nextX,nextY);

    if(walkIntoTileIndex == WORLD_FINISH){
      console.log(this.name + " WINS!");
      loadLevel(levelOne);
    }else if(walkIntoTileIndex == WORLD_FLOOR){
      this.x = nextX;
      this.y = nextY;
    }
  }

  this.draw = function(){
    drawBitmapCenteredWithRotation(this.myWarriorPic, this.x, this.y, 0);
  } //end of warriorDraw funct
} // end of warriorClass()