// ~~~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~
var canvas, canvasContext;
var framesPerSecond = 30;

var playerOne = new playerClass(); //create a blue player using class definition
var fruitOne = new fruitClass(); //create a fruit using class definition temporarily - array for fruit to make it dynamic?

// ~~~~~~~~~~~~~~~~ Main Game Code ~~~~~~~~~~~~~~~~
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");
    
    colorRect(0, 0, canvas.width, canvas.height, "black", 1);
    colorText("LOADING IMAGES...", canvas.width/2, canvas.height/2, "white")

    loadImages();
}

function imageLoadingDoneSoStartGame(){
    setInterval(updateAll, 1000/framesPerSecond);
    setUpInput();

    loadLevel(levelList[levelNow]);
}

function nextLevel() {
    levelNow++
    if(levelNow >= levelList.length) {
        levelNow = 0;
    }
    loadLevel(levelList[levelNow]);
    document.getElementById("debugText").innerHTML = "Level: " + levelNow;
}

function loadLevel(whichLevel) {
    worldGrid = whichLevel.slice(); // copy level array to worldGrid
    playerOne.reset(playerPic, "Addition Character");
    fruitOne.reset(fruitPic, "Apple Fruit");
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    playerOne.move(); 
    fruitOne.move();  
}

function clearScreen() {
    colorRect(0, 0, canvas.width, canvas.height, "black"); //clear screen
}

function drawAll() {
    drawWorlds();
    playerOne.draw();
    fruitOne.draw();
    drawUserStats(playerOne);
}