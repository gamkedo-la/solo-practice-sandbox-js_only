function moveWrapClass() {
  // variables to keep track of position
  
  this.reset = function() {
    this.velocityX = 0.0;
    this.velocityY = 0.0;
    this.x = canvas.width/2;
    this.y = canvas.height/2;
  } 
  
  this.move = function() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.handleScreenWrap();
  }
  
  this.handleScreenWrap = function() {
    if(this.x > canvas.width) {
      this.x = 0;
    }
    if(this.x < 0) {
      this.x = canvas.width;
    }
    if(this.y > canvas.height) {
      this.y = 0;
    }
    if(this.y < 0) {
      this.y = canvas.height;
    }
  }
} // end of class