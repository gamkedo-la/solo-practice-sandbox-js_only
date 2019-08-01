var canvas, canvasContext;

var testUnit = new unitClass();

function calcMousePos(evt) {
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;
  
    // account for the margins, canvas position on page, scroll amount, etc
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
      x: mouseX,
      y: mouseY
    };
  }

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');      
  
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();    
        drawEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calcMousePos(evt);
        document.getElementById("debugText").innerHTML = "(" + mousePos.x + ", " + mousePos.y + ")";
    });

    canvas.addEventListener('click', function(evt) {
        var mousePos = calcMousePos(evt);
        testUnit.gotoX = mousePos.x;
        testUnit.gotoY = mousePos.y;
    });

    testUnit.reset();
}

function moveEverything() {
    testUnit.move();
}

function drawEverything() {
    // <-- background --> //
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    // <-- Unit --> //
    testUnit.draw();
}