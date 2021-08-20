
const START_BALLS = 40;
const GRAVITY_PER_CYCLE=0.1;

var remX = 300, remY = 200;
var remW = 300, remH = 200;


function ballClass() {
  this.x = 75;
  this.y = 75;
  this.velX = 5;
  this.velY = 7;
  this.readyToRemove = false;
  this.cyclesLeft = 100;
  this.myColor;

  this.move = function () {
    this.cyclesLeft--;

    if (this.cyclesLeft < 0) {
      this.readyToRemove = true;
    }

    this.velY += GRAVITY_PER_CYCLE;
    this.x += this.velX;
    this.y += this.velY;

    if (this.x < 0) {
      this.velX *= -1;
    }

    if (this.x > canvas.width) {
      this.velX *= -1;
    }

    if (this.y < 0) {
      this.velY *= -1;
    }

    if (this.y > canvas.height) {
      this.y -= this.velY;
      this.velY *= -0.3;
    }
  };


  
this.addBall= function () {
  var tempBall;
  tempBall = new ballClass();
  tempBall.x = 0.5 * canvas.width; // gives us a horizontal position randmoly
  tempBall.y = 0.5 * canvas.height;
  tempBall.velX = 5 - Math.random() * 10;
  tempBall.velY = 5 - Math.random() * 10;
  tempBall.cyclesLeft = 30 + Math.floor(Math.random() * 100);

  if (Math.random() < 0.5) {
    tempBall.myColor = "red";
  } else {
    tempBall.myColor = "yellow";
  }

  ballList.push(tempBall);
}



this.removeBall = function () {
  for (var i = 0; i < ballList.length; i++) {
    if (
      ballList[i].x > remX &&
      ballList[i].x < remX + remW &&
      ballList[i].y > remY &&
      ballList[i].y < remY + remH
    ) {
      ballList[i].readyToRemove = true;
    }
  }
}


  this.draw = function () {
    colorCircle(this.x, this.y, (20 * this.cyclesLeft) / 130.0, this.myColor);
   
  };
}

var ballList = [];

// function addBall() {
//   var tempBall;
//   tempBall = new ballClass();
//   tempBall.x = 0.5 * canvas.width; // gives us a horizontal position randmoly
//   tempBall.y = 0.5 * canvas.height;
//   tempBall.velX = 5 - Math.random() * 10;
//   tempBall.velY = 5 - Math.random() * 10;
//   tempBall.cyclesLeft = 30 + Math.floor(Math.random() * 100);

//   if (Math.random() < 0.5) {
//     tempBall.myColor = "red";
//   } else {
//     tempBall.myColor = "yellow";
//   }

//   ballList.push(tempBall);
// }

// function removeBall() {
//   for (var i = 0; i < ballList.length; i++) {
//     if (
//       ballList[i].x > remX &&
//       ballList[i].x < remX + remW &&
//       ballList[i].y > remY &&
//       ballList[i].y < remY + remH
//     ) {
//       ballList[i].readyToRemove = true;
//     }
//   }
// }
