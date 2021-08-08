// const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
// const TURN_RATE = 0.06;
// const MIN_SPEED_TO_TURN = 0.5;
const PLAYER_MOVEMENT_SPEED = 3.0;
const JUMP_POWER = 15;
const GRAVITY = 0;

function heroClass() {
  // var sound = document.getElementById("heroSound");
  // var play = 0;

  this.x = 75;
  this.y = 75;
  // this.ang = 0;
  // this.speed = 0;
  this.myCarPic;
  this.name = "Untitled Explorer";
  this.keysHeld = 0;
  // this.life = 3;

  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;
  this.keyHeld_Jump = false;
  // this.sound = false;

  this.controlKeyUp;
  this.controlKeyRight;
  this.controlKeyDown;
  this.controlKeyLeft;
  this.controlKeyJump;
  // this.playSound = function(){
  //   if(play == 0){
  //     play = 1;
  //     sound.play();
  //   }else{
  //     play = 0;
  //     sound.pause();
  //   }
  // }

  this.setupInput = function (upKey, rightKey, downKey, leftKey, jumpKey) {
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;
    this.controlKeyJump = jumpKey;
  };

  this.reset = function (whichImage, heroName) {
    this.name = heroName;
    this.myCarPic = whichImage;
    this.keysHeld = 0;
    // this.life = 3;
    this.updateKeyReadout();
    // this.updateLifeReadout();
    //  this.speed = 0;

    for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
        var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if (trackGrid[arrayIndex] == WORLD_PLAYERSTART) {
          trackGrid[arrayIndex] = WORLD_ROAD;
          // this.ang = -Math.PI / 2;
          this.x = eachCol * WORLD_W + WORLD_W / 2;
          this.y = eachRow * WORLD_H + WORLD_H / 2;
          return;
        } //end of player start if
      } // end of col for
    } // endo frow for
    console.log("NO PLAYER START FOUND!");
  }; // end of heroReset function

  this.updateKeyReadout = function () {
    document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
  };

  this.move = function () {
    // this.speed *= GROUNDSPEED_DECAY_MULT;

    var nextX = this.x;
    var nextY = this.y;

    if (this.keyHeld_Jump) {
      // this.speed += JUMP_POWER;
      // this.y - JUMP_POWER;
      nextY -= JUMP_POWER;
      console.log("JUMP_POWER");
    } else {
      //  if(this.keyHeld_Gas === WORLD_LADDER){
      //    nextY -= PLAYER_MOVEMENT_SPEED+10;

      // }
      nextY += GRAVITY + 10;
      console.log("GRAVITY");
    }

    // if (this.keyHeld_Gas) {
    //    // this.speed += DRIVE_POWER;
    //    nextY -= PLAYER_MOVEMENT_SPEED+10;
    // //   console.log("keyHeld_Gas");

    //  }
    if (this.keyHeld_Reverse) {
      // this.speed -= REVERSE_POWER;
    }

    if (this.keyHeld_TurnLeft) {
      nextX -= PLAYER_MOVEMENT_SPEED;
      // switchCostume(costumeList[1]);
      // this.speed -= REVERSE_POWER;
      console.log("keyHeld_TurnLeft");
    }

    if (this.keyHeld_TurnRight) {
      nextX += PLAYER_MOVEMENT_SPEED;
      console.log("keyHeld_TurnRight");

      // this.speed += DRIVE_POWER;
    }
    // this.x += Math.cos(this.ang) * this.speed;
    // this.y += Math.sin(this.ang) * this.speed;

    // heroTrackHandling(this);

    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
    var walkIntoTileType = WORLD_WALL;

    if (walkIntoTileIndex != undefined) {
      walkIntoTileType = trackGrid[walkIntoTileIndex];
    }

    // this.updateLifeReadout= function(){
    //   document.getElementById("life").innerHTML = "Life: " + this.life;
    // }

    switch (walkIntoTileType) {
      case WORLD_ROAD:
        this.x = nextX;
        this.y = nextY;
        break;
      // case WORLD_GOAL:
      //   console.log(this.name + " WINS!");
      //   loadLevel(levelOne);
      //   break;
      case WORLD_SLINGSHOT:
        loadLevel(levelTwo);
        trackGrid[walkIntoTileIndex] = WORLD_ROAD;
        break;

      case WORLD_SWORD:
        loadLevel(levelFour);
        trackGrid[walkIntoTileIndex] = WORLD_ROAD;
        break;
      case WORLD_LOWERTUNNEL:
        loadLevel(levelThree);
        trackGrid[walkIntoTileIndex] = WORLD_ROAD;
        break;
      case WORLD_DOOR:
        if (this.keysHeld > 0) {
          this.keysHeld--;
          this.updateKeyReadout();
          trackGrid[walkIntoTileIndex] = WORLD_ROAD;
        }
        break;
      case WORLD_KEY:
        console.log(this.name + " THIS IS THE KEY");
        this.keysHeld++;
        this.updateKeyReadout();
        trackGrid[walkIntoTileIndex] = WORLD_ROAD;
        break;

      case WORLD_LADDER:
        if (this.keyHeld_Gas) {
          // this.speed += DRIVE_POWER;
          nextY -= PLAYER_MOVEMENT_SPEED + 20;
          console.log("keyHeld_Gas");
          // trackGrid[walkIntoTileIndex] = WORLD_ROAD;
        }
        break;
      case WORLD_LADDER_CONNECTOR:
        if (this.keyHeld_Gas && WORLD_LADDER_CONNECTOR) {
          // this.speed += DRIVE_POWER;
          nextY -= PLAYER_MOVEMENT_SPEED + 20;

          console.log("keyHeld_Gas");
        }
        break;
      case WORLD_TRAP:
        alert("GAME OVER");
        // this.life--;
        // this.updateLifeReadout();
        // if(this.life = 0){

        // }

        break;
      default:
        break;
    }
  };

  this.draw = function () {
    drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
  };
}
