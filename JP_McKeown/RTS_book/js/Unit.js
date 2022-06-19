const UNIT_PLACEHOLDER_RADIUS = 5;
const UNIT_PIXELS_MOVE_RATE = 2;

function unitClass() {

  this.reset = function() {
    this.x = Math.random() * canvas.width/4;
    this.y = Math.random() * canvas.height/4;
    this.gotoX = canvas.width/2;
    this.gotoY = canvas.height/2;
    this.isDead = false;
  }

  this.move = function() {
    var deltaX = this.gotoX - this.x; 
    var deltaY = this.gotoY - this.y;
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
  }

  this.draw = function() {
    if(this.isDead == false) {
      colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, 'white');
    }
  }

}
