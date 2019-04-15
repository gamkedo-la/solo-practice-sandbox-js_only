var runSpeed = 5;
var jumperRadius = 20;
var jumpPower = jumperRadius;
var groundFriction = 0.6;
var airResistance = 0.9;
var gravity = 0.7;

var jumperX = 75, jumperY = 75;
var jumperSpeedX = 0, jumperSpeedY = 0;
var jumperOnGround = false;

var jumpVariables = [];
var jumpVariableNames = ["jumperRadius","runSpeed","jumperSpeedX", "jumpPower","jumperSpeedY", "groundFriction", "airResistance", "gravity"];

function jumperMove() {
	if(jumperOnGround) {
		if (holdJump) {
			if (jumperSpeedX != 0) {
				jumperSpeedY = -jumpPower - Math.abs(jumperSpeedX)/2;
			} else {
				jumperSpeedY = -jumpPower;
			}
		}
		if (jumperSpeedX != 0) {
			jumperSpeedX *= groundFriction;
		}
	} else {
		jumperSpeedY *= airResistance;
		jumperSpeedY += gravity;
		if(jumperSpeedY > jumperRadius) {
			jumperSpeedY = jumperRadius;
		}

		if (jumperSpeedY > 0) {
			gravity = .99;
			airResistance = 1;
		} else {
			gravity = 0.7;
			airResistance = 0.9;
		}
	}
  
	if(holdLeft) {
		jumperSpeedX = -runSpeed;
	} else if(holdRight) {
		jumperSpeedX = runSpeed;
	} else if (!jumperOnGround) {
		jumperSpeedX = 0;
	}

	if(jumperSpeedY < 0 && isBrickAtPixelCoord(jumperX,jumperY-jumperRadius) == 1) {
		jumperY = (Math.floor( jumperY / BRICK_H )) * BRICK_H + jumperRadius;
		jumperSpeedY = 0;
	}

	if(jumperSpeedY > 0 && isBrickAtPixelCoord(jumperX,jumperY+jumperRadius) == 1) {
		jumperY = (1+Math.floor( jumperY / BRICK_H )) * BRICK_H - jumperRadius;
		jumperOnGround = true;
		jumperSpeedY = 0;
	} else if(isBrickAtPixelCoord(jumperX,jumperY+jumperRadius+2) == 0) {
		jumperOnGround = false;
	}

	if(jumperSpeedX < 0 && isBrickAtPixelCoord(jumperX-jumperRadius,jumperY) == 1) {
		jumperX = (Math.floor( jumperX / BRICK_W )) * BRICK_W + jumperRadius;
	}
	if(jumperSpeedX > 0 && isBrickAtPixelCoord(jumperX+jumperRadius,jumperY) == 1) {
		jumperX = (1+Math.floor( jumperX / BRICK_W )) * BRICK_W - jumperRadius;
	}

	jumperX += jumperSpeedX; // move the jumper based on its current horizontal speed 
	jumperY += jumperSpeedY; // same as above, but for vertical
}

function jumperReset() {
	// center jumper on screen
	jumperX = canvas.width/2 + BRICK_W/2;
	jumperY = canvas.height/2;
}