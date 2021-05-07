var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();

window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');

    colorRect(0, 0 , canvas.width, canvas.height, "black");
    colorText("LOADING", canvas.width/2, canvas.height / 2, "white");

    loadImages();
}

function imageLoadingDoneSoStartGame(){
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);
    
    setupInput();

    loadLevel(levelOne);
}

function loadLevel(whichLevel){
    trackGrid = whichLevel.slice();
    greenCar.reset(carPic, "Green Car");
    blueCar.reset(otherCarPic, "Blue Car");
}

function updateAll(){
    moveAll();
    drawAll();
}

function moveAll(){
    greenCar.move();
    blueCar.move();
}

function clearScreen(){
    colorRect(0, 0, canvas.width, canvas.height, "black"); //clear screen
}


function drawAll(){
    //clearScreen();
    drawTracks();
    greenCar.draw();
    blueCar.draw();
}

