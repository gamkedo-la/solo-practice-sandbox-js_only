var canvas, canvasContext;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    setInterval(function() {    

        drawEverything();
        
    }, 1000/framesPerSecond);
}

function drawEverything() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
}