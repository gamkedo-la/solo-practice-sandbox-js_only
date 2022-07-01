const UNIT_PLACEHOLDER_RADIUS = 5;
const UNIT_SELECT_DIM_HALF = UNIT_PLACEHOLDER_RADIUS+3;
const UNIT_PIXELS_MOVE_RATE = 2;
const UNIT_RANKS_SPACING = UNIT_PLACEHOLDER_RADIUS*3;
const UNIT_ATTACK_RANGE = 55;
const UNIT_AI_ATTACK_INITIATE = UNIT_ATTACK_RANGE + 10;
const UNIT_PLAYABLE_AREA_MARGIN = 20;
const PLAYER_COLOR = "purple";
const ENEMY_COLOR = "#444";
const DEAD_COLOR = "gray";
const ENEMY_MOVE_PIXELS_RATE = 5;
const MAX_HEALTH = 4;
HEALTH_BOX_SIZE = 8;
HEALTH_HIGH = 4;
HEALTH_MED = 2;
HEALTH_LOW = 1;

function unitClass() {

  this.resetAndSetPlayerTeam = function(playerTeam, whichGraphic) {
    this.playerControlled = playerTeam;
    this.x = UNIT_PLAYABLE_AREA_MARGIN + Math.random()*canvas.width/4;
    this.y = UNIT_PLAYABLE_AREA_MARGIN + Math.random()*canvas.height/4;
    this.myTarget = null;
    
    // flip all non-player units to opposite corner
    if(this.playerControlled == false) {
      this.x = canvas.width - this.x;
      this.y = canvas.height - this.y;
      this.unitColor = ENEMY_COLOR;
    } else {
      this.unitColor = PLAYER_COLOR;
    }
    
    this.gotoX = this.x;
    this.gotoY = this.y;
    this.isDead = false;
    this.health = 4;
    this.bitmap = whichGraphic;
  }
  
  this.distFrom = function(otherX, otherY) {
    var deltaX = otherX-this.x;
    var deltaY = otherY-this.y;
    return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
  }
  
  this.setTarget = function(newTarget) {
    this.myTarget = newTarget;
  }

  this.gotoNear = function(aroundX, aroundY, formationPos, formationDim) {
    var colNum = formationPos % formationDim;
    var rowNum = Math.floor(formationPos / formationDim);
    this.gotoX = aroundX + colNum*UNIT_RANKS_SPACING;
    this.gotoY = aroundY + rowNum*UNIT_RANKS_SPACING;
  }
    
  this.move = function() {
    if(this.myTarget != null) {  // has a target

      if(this.myTarget.isDead) {  // target already destroyed
        this.myTarget = null;
        this.gotoX = this.x;
        this.gotoY = this.y;

      } else if(this.distFrom(this.myTarget.x,this.myTarget.y) > UNIT_ATTACK_RANGE) {
        this.gotoX = this.myTarget.x;
        this.gotoY = this.myTarget.y; // not in range yet

      } else {
        var hitTarget = false;
        var hitRoll = Math.random() * 10;
        console.log("hitRoll " + hitRoll)
        if(this.playerControlled==false && hitRoll > 9.5) { 
          hitTarget = true;
        }
        if(this.playerControlled==true && hitRoll > 7) { 
          hitTarget = true;
        }
        if(hitTarget) {
          this.myTarget.health--;
          if(this.myTarget.health < 1) {
            soonCheckUnitsToClear();
            this.gotoX = this.x;
            this.gotoY = this.y;
            this.myTarget.isDead = true;
          }
        } 
      }
    } else if(this.playerControlled == false) {  // how enemy acquires traget
      if(Math.random() < 0.02) {
        var nearestOpponentFound =
            findClosestUnitInRange(this.x,this.y, UNIT_AI_ATTACK_INITIATE, playerUnits);

        if(nearestOpponentFound != null) {
          this.myTarget = nearestOpponentFound;
        } else {
          this.gotoX = this.x - Math.random() * ENEMY_MOVE_PIXELS_RATE;
          this.gotoY = this.y - Math.random() * ENEMY_MOVE_PIXELS_RATE;

        } // end of else, no target found in attack radius
      } // end of randomized ai response lag check
    } // end of playerControlled == false (i.e. code block for computer control)
  
    this.keepInPlayableArea();

    var deltaX = this.gotoX-this.x;
    var deltaY = this.gotoY-this.y;
    var distToGo = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
    var moveX = UNIT_PIXELS_MOVE_RATE * deltaX/distToGo;
    var moveY = UNIT_PIXELS_MOVE_RATE * deltaY/distToGo;
    
    if(distToGo > UNIT_PIXELS_MOVE_RATE) {
      this.x += moveX;
      this.y += moveY;
    } else {
      this.x = this.gotoX;
      this.y = this.gotoY;
    }
  } // end of move function

  this.drawSelectionBox = function() {
    colorOutlineRectCornerToCorner( this.x-UNIT_SELECT_DIM_HALF,
                                      this.y-UNIT_SELECT_DIM_HALF,
                                      this.x+UNIT_SELECT_DIM_HALF,
                                      this.y+UNIT_SELECT_DIM_HALF,
                                      'green' );
  }
  
  this.draw = function() {
    drawBitmapCenteredAtLocationWithRotation(this.bitmap, this.x, this.x, 0);
    colorCircle( this.x, this.y, UNIT_PLACEHOLDER_RADIUS, this.unitColor );

    //// removed the if-conditional check that only drew unit if it was alive
  }

  this.drawLineToTarget = function() {
    colorLine(this.x, this.y, this.myTarget.x, this.myTarget.y, this.unitColor);
  }

  this.drawID = function(id) {
    var atX = this.x + 5;
    var atY = this.y + 10;
    colorText(id, atX, atY, "black")
  }

  this.drawHealthBar = function() {
    var topLeftX = this.x - HEALTH_BOX_SIZE * 2;
    var topLeftY = this.y - HEALTH_BOX_SIZE * 2;
    for(var i = 0; i < MAX_HEALTH; i++) {
      topLeftX = topLeftX + HEALTH_BOX_SIZE;
      lineColor = "black"; 
      colorOutlineRectCornerToCorner(topLeftX, topLeftY, topLeftX+HEALTH_BOX_SIZE, topLeftY+HEALTH_BOX_SIZE, lineColor); 
      //console.log(this.x + " " + this.y + " " + topLeftX + " " + topLeftY)
    }   

    healthColor = "red";      
    if(this.health >= HEALTH_HIGH) {
      healthColor = "green";
    } else if(this.health > HEALTH_MED) {
      healthColor = "yellow";
    }
    var topLeftX = this.x - HEALTH_BOX_SIZE * 2;
    for(var i = 0; i < this.health; i++) {
      topLeftX = topLeftX + HEALTH_BOX_SIZE;
      colorRect(topLeftX+1, topLeftY+1, HEALTH_BOX_SIZE-2, HEALTH_BOX_SIZE-2, healthColor); 
    }   
  }

  this.keepInPlayableArea = function() {
    if(this.gotoX < UNIT_PLAYABLE_AREA_MARGIN) {
      this.gotX = UNIT_PLAYABLE_AREA_MARGIN;
    } else if(this.gotoX > canvas.width - UNIT_PLAYABLE_AREA_MARGIN) {
      this.gotX = canvas.width - UNIT_PLAYABLE_AREA_MARGIN;
    }
    if(this.gotoY < UNIT_PLAYABLE_AREA_MARGIN) {
      this.gotY = UNIT_PLAYABLE_AREA_MARGIN;
    } else if(this.gotoY > canvas.height - UNIT_PLAYABLE_AREA_MARGIN) {
      this.gotX = canvas.height - UNIT_PLAYABLE_AREA_MARGIN;
    }
  }

  this.isInBox = function(x1,y1,x2,y2) {
    var leftX, rightX;
    if(x1 < x2) {
      leftX = x1;
      rightX = x2;
    } else {
      leftX = x2;
      rightX = x1;
    }

    var topY, bottomY;
    if(y1 < y2) {
      topY = y1;
      bottomY = y2;
    } else {
      topY = y2;
      bottomY = y1;
    }
    
    if(this.x < leftX) {
      return false;
    }
    if(this.y < topY) {
      return false;
    }
    if(this.x > rightX) {
      return false;
    }
    if(this.y > bottomY) {
      return false;
    }
    return true;
  }
} // end of class