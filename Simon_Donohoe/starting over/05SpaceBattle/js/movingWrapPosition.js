function movingWrapPositionClass() {
  this.reset = function() { 
    this.xv = this.yv = 0.0;
    this.x = canvas.width/2; 
    this.y = canvas.height/2;
  } // end of reset 

  this.handleScreenWrap = function() {
    if(this.x < 0) {
      this.x += canvas.width;
    } else if(this.x >= canvas.width) {
      this.x -= canvas.width;
    }

    if(this.y < 0) {
      this.y += canvas.height;
    } else if(this.y >= canvas.height) {
      this.y -= canvas.height;
    }
  }

  this.move = function() { 
    this.x += this.xv;
    this.y += this.yv;
    this.handleScreenWrap();
  }
} // end of class 