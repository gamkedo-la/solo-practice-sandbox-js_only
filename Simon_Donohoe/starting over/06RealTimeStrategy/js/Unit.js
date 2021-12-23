const UNIT_PLACEHOLDER_RADIUS = 5;
const UNIT_SELECT_DIM_HALF = UNIT_PLACEHOLDER_RADIUS + 3;
const UNIT_PIXELS_MOVE_RATE = 2;
const UNIT_RANKS_SPACING = UNIT_PLACEHOLDER_RADIUS * 3;

function unitClass() {
  this.resetAndSetPlayerTeam = function (playerTeam) {
    this.playerControlled = playerTeam;
    this.x = Math.random()*canvas.width/4; 
    this.y = Math.random()*canvas.height/4; 

    // flip all non-player units to opposite corner
    if(this.playerControlled == false) {
      this.x = canvas.width - this.x;
      this.y = canvas.height - this.y;
      this.unitColor = 'red';
    } else {
      this.unitColor = 'white';
    }
    this.gotoX = this.x;
    this.gotoY = this.y;

    this.isDead = false;
  }
  
  this.gotoNear = function (aroundX, aroundY, formationPos, formationDim) {
    let colNum = formationPos % formationDim;
    let rowNum = Math.floor(formationPos / formationDim);
    this.gotoX = aroundX + colNum * UNIT_RANKS_SPACING;
    this.gotoY = aroundY + rowNum * UNIT_RANKS_SPACING;
  }

  this.isInBox = function (x1, y1, x2, y2) {
    let leftX, rightX;

    if(x1 < x2) {
      leftX = x1;
      rightX = x2;
    } else {
      leftX = x2;
      rightX = x1;
    }

    let topY, bottomY;

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
  
  this.move = function () {
    let deltaX = this.gotoX - this.x;
    let deltaY = this.gotoY - this.y;
    let distToGo = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    // let moveAng = Math.atan2(deltaY, deltaX);
    let moveX = UNIT_PIXELS_MOVE_RATE * deltaX / distToGo;
    let moveY = UNIT_PIXELS_MOVE_RATE * deltaY / distToGo;

    if(distToGo > UNIT_PIXELS_MOVE_RATE) {
      this.x += moveX;
      this.y += moveY;  
    } else {
      this.x = this.gotoX;
      this.y = this.gotoY;
    }
  }

  this.drawSelectionBox = function () {
    coloredOutlineRectCornerToCorner(this.x - UNIT_SELECT_DIM_HALF, this.y - UNIT_SELECT_DIM_HALF, this.x + UNIT_SELECT_DIM_HALF, this.y + UNIT_SELECT_DIM_HALF, 'green');
  }

  this.draw = function () {
    if(this.isDead == false) {
      colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, this.unitColor);
    }
  }
} // end of class