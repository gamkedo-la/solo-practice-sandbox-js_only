const UNIT_PLACEHOLDER_RADIUS = 5;

function unitClass() {

  this.reset = function() {
    this.x = canvas.width/2;
    this.y = canvas.width/2;
    this.isDead = false;
  }

  this.draw = function() {
    if(this.isDead == false) {
      colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, 'white');
    }
  }
}
