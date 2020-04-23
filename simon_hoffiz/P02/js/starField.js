var starFieldSpeed = 0.5;
var slowStarField = false;
const STARFIELD_ACCELERATION = 0.05; // handled in up arrow key press
const STARFIELD_DECELERATION = 0.01;
const STARFIELD_TOP_SPEED = 3;
const STARFIELD_COUNT = 350;

function starInit() {
	for(var i=0; i<STARFIELD_COUNT; i++) {
		starList.push({x:Math.random()*c.width, y:Math.random()*c.height, sz:Math.random()*4});
	}
}

function starDraw() {
	for(var i=0; i<starList.length; i++) {
		colorRect(starList[i].x, starList[i].y, starList[i].sz, starList[i].sz, 'white');
	}
}

function starMove() {
	for(var i=0; i<starList.length; i++) {
		starList[i].y += starList[i].sz * starFieldSpeed;
		if(starList[i].y > c.height) {
			starList[i].x = c.width * Math.random();
			starList[i].y = 0;
		}
	}

	if(slowStarField == true) {
		if(starFieldSpeed >= 0.5) {
			starFieldSpeed -= STARFIELD_DECELERATION;
		}
		if(starFieldSpeed <= 0.5) {
			slowStarField = false;
		}
	}
}