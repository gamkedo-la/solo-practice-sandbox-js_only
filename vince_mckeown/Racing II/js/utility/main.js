var canvas;
var canvasContext;
var mouseX = 0;
var mouseY = 0;

var now = new Date();
var time = 0;

var vehicleList = [];
var playerOne = new carClass();
var playerTwo = new carClass();
var playerThree = new carClass();
var playerFour = new carClass();
var playerFive = new carClass();
var playerSix = new carClass();
var playerSeven = new carClass();
var playerEight = new carClass();

var computerPlayerOn = true;

var titleScreen = false;
var levelEditor = false;
var paused = false;

var isMouseDragging = false;
	
window.onload = function(){
			
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
				
	loadImages();
	
	initInput();
	// code for future vehicleList	
	/*for (var i = 0; i < 8; i++) {  		
		addVehicle();
	} */
	playerOne.carReset();
	playerTwo.carReset();
	playerThree.carReset();
	playerFour.carReset();
	playerFive.carReset();
	playerSix.carReset();
	playerSeven.carReset();
	playerEight.carReset(); 
}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 30;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
	playerOne.carInit(carPic, "Car 1", false);
	playerTwo.carInit(carPic2, "Car 2", true);
	playerThree.carInit(carPic2, "Car 3", true);
	playerFour.carInit(carPic, "Car 4", true);
	playerFive.carInit(carPic2, "Car 5", true);
	playerSix.carInit(carPic2, "Car 6", true);
	playerSeven.carInit(carPic2, "Car 7", true);
	playerEight.carInit(carPic2, "Car 8", true);
	loadLevel(levelOne);
}

function addVehicle(){
	var tempVehicle = new carClass();
	vehicleList.push(tempVehicle);
}
	
function moveEverything() {
	if(titleScreen){
		
	} else if (levelEditor) {
		
	} else {
		// code for future vehicleList
		/* for (var i = 0; i < vehicleList.length; i++) {		
			vehicleList[i].movement();
		} */
	playerOne.movement();
	playerTwo.movement();
	playerThree.movement();
	playerFour.movement();
	playerFive.movement();
	playerSix.movement();
	playerSeven.movement();
	playerEight.movement();
	// change into a list
	playerOne.checkCarCollisionAgainst(playerTwo);	
	playerOne.checkCarCollisionAgainst(playerThree);	
	playerOne.checkCarCollisionAgainst(playerFour);	
	playerOne.checkCarCollisionAgainst(playerFive);	
	playerOne.checkCarCollisionAgainst(playerSix);	
	playerOne.checkCarCollisionAgainst(playerSeven);	
	playerOne.checkCarCollisionAgainst(playerEight);	
	playerTwo.checkCarCollisionAgainst(playerThree);	
	playerTwo.checkCarCollisionAgainst(playerFour);	
	playerTwo.checkCarCollisionAgainst(playerFive);	
	playerTwo.checkCarCollisionAgainst(playerSix);	
	playerTwo.checkCarCollisionAgainst(playerSeven);	
	playerTwo.checkCarCollisionAgainst(playerEight);	
	playerThree.checkCarCollisionAgainst(playerFour);	
	playerThree.checkCarCollisionAgainst(playerFive);	
	playerThree.checkCarCollisionAgainst(playerSix);	
	playerThree.checkCarCollisionAgainst(playerSeven);	
	playerThree.checkCarCollisionAgainst(playerEight);
	playerFour.checkCarCollisionAgainst(playerFive);	
	playerFour.checkCarCollisionAgainst(playerSix);	
	playerFour.checkCarCollisionAgainst(playerSeven);	
	playerFour.checkCarCollisionAgainst(playerEight);		
	playerFive.checkCarCollisionAgainst(playerSix);	
	playerFive.checkCarCollisionAgainst(playerSeven);	
	playerFive.checkCarCollisionAgainst(playerEight);	
	playerSix.checkCarCollisionAgainst(playerSeven);	
	playerSix.checkCarCollisionAgainst(playerEight);	
	playerSeven.checkCarCollisionAgainst(playerEight);
	
	updateTime();
	}
}

function updateTime(){
	now = new Date();
}
			
function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect(), root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}

function drawClock(){
	canvasContext.drawImage(clockPic, 350, 2);
	colorText(playerOne.minuteTensSpot.toString() + playerOne.minute.toString() + ':' + playerOne.secondTensSpot.toString() + playerOne.second.toString() +':'+playerOne.tenthSecond.toString(), 368, 30, 'black');
}

function drawLapOneTime(){
	colorText(playerOne.lapMinuteTensSpot.toString() + playerOne.lapMinute.toString() + ':' + playerOne.lapSecondTensSpot.toString() + playerOne.lapSecond.toString() +':'+playerOne.lapTenthSecond.toString(), 700, 30, 'black');
}

						
function drawEverything() {
	if(titleScreen){
		
	} else if (levelEditor) {
		drawLevelEditor();
	} else {	
		colorRect(0,0,canvas.width,canvas.height, 'black');			
		drawTracks();
		// code for future vehicleList
		/*for (var i = 0; i < vehicleList.length; i++) {
			vehicleList[i].drawCar();
		} */
		playerOne.drawCar();
		playerTwo.drawCar();
		playerThree.drawCar();
		playerFour.drawCar();
		playerFive.drawCar();
		playerSix.drawCar();
		playerSeven.drawCar();
		playerEight.drawCar(); 
		
		drawClock();
		drawLapOneTime();
		colorCircle(playerFour.wayPointX,playerFour.wayPointY, 5, 'blue');
		colorLine(playerFour.x, playerFour.y, playerFour.wayPointX, playerFour.wayPointY, 'white')
	}
}

function dist (x1, y1, x2, y2){
	var xd = x2 - x1;
	var yd = y2 - y1;
	return Math.sqrt(xd * xd + yd * yd);
}
