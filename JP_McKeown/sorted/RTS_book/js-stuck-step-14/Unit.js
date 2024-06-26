const UNIT_PLACEHOLDER_RADIUS = 5;
const UNIT_SELECT_DIM_HALF = UNIT_PLACEHOLDER_RADIUS+3; ////
const UNIT_PIXELS_MOVE_RATE = 2;
const UNIT_MAX_RAND_DIST_FROM_WALK_TARGET = 50;
const UNIT_RANK_SPACING = UNIT_PLACEHOLDER_RADIUS *3;

function unitClass() {

  this.reset = function() {
    this.x = Math.random()*canvas.width/4;
    this.y = Math.random()*canvas.height/4;
    this.isDead = false;
  }
  this.assignTeam = function(playerTeam) {
    this.playerControlled = playerTeam;
    // flip all nonplayer units to opposite corner
    if(this.playerControlled == false) {
      this.x = canvas.width - this.x;
      this.y = canvas.height - this.y;
      this.unitColor = 'red';
    } else {
      this.unitColor = 'blue';
    }
    this.gotoX = this.x;
    this.gotoY = this.y;
  }
  
  this.gotoNear = function(aroundX, aroundY, formationPos, formationDim) {
    var colNum = formationPos % formationDim;
    var rowNum = Math.floor(formationPos / formationDim);
    this.gotoX = aroundX + colNum * UNIT_RANK_SPACING;
    this.gotoY = aroundY + rowNum * UNIT_RANK_SPACING;
  }
  
  this.distFrom = function(otherX, otherY) {
    var deltaX = otherX - this.x;
    var deltaY = otherY - this.y;
    return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
  }

  this.isInBox = function(x1,y1,x2,y2) { ////
    /* // this would work instead, if you're into that sort of thing:
    return (this.x-x1)*(this.x-x2) < 0 &&
           (this.y-y1)*(this.y-y2) < 0; */

    var leftX, rightX; ////
    if(x1 < x2) { ////
      leftX = x1; ////
      rightX = x2; ////
    } else { ////
      leftX = x2; ////
      rightX = x1; ////
    } ////

    var topY, bottomY; ////
    if(y1 < y2) { ////
      topY = y1; ////
      bottomY = y2; ////
    } else { ////
      topY = y2; ////
      bottomY = y1; ////
    } ////
    
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
  
  this.move = function() {
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

  this.drawSelectionBox = function() { ////
    coloredOutlineRectCornerToCorner( 
      this.x-UNIT_SELECT_DIM_HALF,
      this.y-UNIT_SELECT_DIM_HALF, ////
      this.x+UNIT_SELECT_DIM_HALF,
      this.y+UNIT_SELECT_DIM_HALF,
      'green' ); ////
  } ////
  
  this.draw = function() {
    if(this.isDead == false) {
      colorCircle( this.x, this.y, UNIT_PLACEHOLDER_RADIUS, this.unitColor );
    }
  }

} // end of class