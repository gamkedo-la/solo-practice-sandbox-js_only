const UNIT_PLACEHOLDER_RADIUS = 5;
const UNIT_PIXELS_MOVE_RATE = 2;

function unitClass() {

  this.reset = function() {
    this.x = Math.random() * canvas.width/4;
    this.y = Math.random() * canvas.height/4;
    this.isDead = false;
  }

  this.move = function() {
    if(this.x < this.gotoX) {
      this.x += UNIT_PIXELS_MOVE_RATE;
    }
    if(this.x > this.gotoX) {
      this.x -= UNIT_PIXELS_MOVE_RATE;
    }
    if(this.y < this.gotoY) {
      this.y += UNIT_PIXELS_MOVE_RATE;
    }
    if(this.y > this.gotoY) {
      this.y -= UNIT_PIXELS_MOVE_RATE;
    }
  }

  this.draw = function() {
    if(this.isDead == false) {
      colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, 'white');
    }
  }

}
