var runSpeed = 5;
var rotationAngle = Math.PI/180 * 5; //5 degrees
var jumperRotation = 0;

var jumperRadius = 20;
const JUMPER_ORGINAL_RADIUS = jumperRadius;
var jumpPower = jumperRadius;

var groundFriction = 0.9;
var airResistance = 0.8;
var gravity = 0.7;

var jumperX = 75, jumperY = 75;
var jumperSpeedX = 0, jumperSpeedY = 0;
var jumperOnGround = true;

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
	} else { // jumping
		jumperSpeedY *= airResistance;
		jumperSpeedY += gravity;
		if (jumperSpeedY > jumperRadius/2) {
			jumperSpeedY = jumperRadius/2;
		}

		if (jumperSpeedY > 0) {
			gravity = 2.5;
		} else {
			gravity = 0.3;
		}
	}

	jumperXMovementInput();
	jumperRadiusChange();
	jumperYCollision();

	jumperX += jumperSpeedX; // move the jumper based on its current horizontal speed 
	jumperY += jumperSpeedY; // same as above, but for vertical
}

function jumperDraw() {
	canvasContext.save();
	canvasContext.translate(jumperX,jumperY);
	canvasContext.rotate(jumperRotation);
	canvasContext.drawImage(jumperRed,-jumperRadius/2,-jumperRadius/2,
							jumperRed.width * jumperRadius/JUMPER_ORGINAL_RADIUS, 
							jumperRed.height * jumperRadius/JUMPER_ORGINAL_RADIUS);
	canvasContext.restore();
}

function jumperReset() {
	// center jumper on screen
	jumperRotation = 0;
	jumperX = canvas.width/2 + BRICK_W/2;
	jumperY = canvas.height/2;
}

function jumperXMovementInput() {
	rotationAngle = Math.PI/180 * 5;
	if (holdLeft) {
		if (isBrickAtPixelCoord(jumperX - jumperRadius/2, jumperY) == 1) {
			jumperX = (Math.floor(jumperX / BRICK_W)) * BRICK_W + jumperRadius/2.1;
			jumperSpeedX = 0;
		} else {
			jumperSpeedX = -runSpeed;
			jumperRotation -= rotationAngle;
		}
	} else if(holdRight) {
		if (isBrickAtPixelCoord(jumperX + jumperRadius/2,jumperY) == 1) {
			jumperX = (1 + Math.floor(jumperX / BRICK_W)) * BRICK_W - jumperRadius/2;
			jumperSpeedX = 0;
		} else {
			jumperSpeedX = runSpeed;
			jumperRotation += rotationAngle;
		}
	} else if (jumperSpeedX != 0) {
		if (jumperSpeedX > 0) {
			if(isBrickAtPixelCoord(jumperX+jumperRadius/2,jumperY) == 1) {
				jumperX = (1+Math.floor( jumperX / BRICK_W )) * BRICK_W - jumperRadius/2;
				jumperSpeedX = 0;
			}
			jumperRotation += rotationAngle;
		} else if (jumperSpeedX < 0) {
			if(isBrickAtPixelCoord(jumperX - jumperRadius/2,jumperY) == 1) {
				jumperX = (Math.floor( jumperX / BRICK_W )) * BRICK_W + jumperRadius/2.1;
				jumperSpeedX = 0;
			}
				jumperRotation -= rotationAngle;
		}

		jumperSpeedX *= 0.9;
		rotationAngle *= 0.9;

		var jumperSpeedXFixed = jumperSpeedX.toFixed(1);
		if (jumperSpeedXFixed == 0.00) {
			jumperSpeedX = 0;
			rotationAngle = 0;
		}
	}
}

function jumperYCollision() {
	if (jumperSpeedY < 0 && isBrickAtPixelCoord(jumperX,jumperY - jumperRadius/2) == 1) {
		jumperY = (Math.floor( jumperY / BRICK_H )) * BRICK_H + jumperRadius/2;
		jumperSpeedY = 0;
	}

	if (jumperSpeedY > 0 && isBrickAtPixelCoord(jumperX,jumperY + (jumperRadius/2) + 2) == 1) {
		jumperY = (1+Math.floor( jumperY / BRICK_H )) * BRICK_H - jumperRadius/2;
		jumperOnGround = true;
		jumperSpeedY = 0;
	} else if(isBrickAtPixelCoord(jumperX, jumperY + (jumperRadius/2)) == 0) {
		jumperOnGround = false;
		jumperSpeedX *= airResistance;
	}
}

function jumperRadiusChange() {
	if (radiusIncrease) {
		jumperRadius += 10;
		if (jumperRadius > 80) {
			jumperRadius = 80;
			console.log("jumper as big as possible");
		} else {
			console.log("radius increasing");
		}
		if (isBrickAtPixelCoord(jumperX,jumperY + (jumperRadius/2) + 2) == 1) {
			jumperY = (1+Math.floor( jumperY / BRICK_H )) * BRICK_H - jumperRadius/2;
		}
	}

	if (radiusDecrease) {
		jumperRadius -= 10;
		if (jumperRadius < 10) {
			jumperRadius = 10;
			console.log("jumper as small as possible");
		} else {
			console.log("radius decreasing");
		}
	}

	jumpPower = jumperRadius;
}