const RUN_SPEED = 4;
const JUMP_POWER = 12;
const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const GRAVITY = 0.6;

var jumperX = 75, jumperY = 75;
var jumperSpeedX = 0, jumperSpeedY = 0;
var jumperOnGround = false;
var jumperRadius = 10;
var jumping = false;
var InitalYBeforeJump = 0;

var jumpHeight = BRICK_H * 2;
var xAtJumpHeight = Math.sqrt(jumpHeight);
var initialVelocity = (2 * jumpHeight * (RUN_SPEED)) / xAtJumpHeight; 
var gravityBasedOnJump = (2 * jumpHeight * Math.pow(RUN_SPEED,2)) / (xAtJumpHeight*xAtJumpHeight);

function jumperMove() {
	if (jumperOnGround) {
		if (holdJump) {
			jumping = true;
			jumperOnGround = false;
		}
		jumperSpeedX *= GROUND_FRICTION;
	} else {
		if (jumping) {
			initialVelocity = (2 * jumpHeight * (jumperSpeedX)) / xAtJumpHeight; 
			gravityBasedOnJump = (2 * jumpHeight * Math.pow(jumperSpeedX,2)) / (xAtJumpHeight*xAtJumpHeight);
			jumperSpeedY = jumperJump(jumperX);
		} else {
			jumperSpeedY += GRAVITY;
	 		if (jumperSpeedY > jumperRadius) { // cheap test to ensure can't fall through floor
	 			jumperSpeedY = jumperRadius;
			}
		}
	}
  
	if(holdLeft) {
		jumperSpeedX = -RUN_SPEED;
	}
	if(holdRight) {
		jumperSpeedX = RUN_SPEED;
	}

	if(jumperSpeedY < 0 && isBrickAtPixelCoord(jumperX,jumperY-jumperRadius) == 1) {
		jumperY = (Math.floor( jumperY / BRICK_H )) * BRICK_H + jumperRadius;
		jumperSpeedY = 0;
	} // hit head on brick

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

	jumperX += jumperSpeedX;
	jumperY += jumperSpeedY; 
}

function jumperJump(x) {
	var g = gravityBasedOnJump;
	var vZero = initialVelocity;
	if (jumperY <= InitalYBeforeJump) {
		jumping = false;
	}
	return (-(1/2 * g) * (x * x) + (vZero * x) + jumperY) * deltaTime;
}

function jumperReset() {
	// center jumper on screen
	jumperX = canvas.width/2 + BRICK_W/2;
	jumperY = canvas.height/2 + BRICK_H/2;
}