  // save the canvas for dimensions, and its 2d context for drawing to it
  var canvas, canvasContext;
  var p1 = new carClass();
  var p2 = new carClass();
  
      // canvas.setAttribute('tabindex','0');
    // canvas.focus()
  window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    loadImages();
  }

  function loadingDoneSoStartGame() {
    // these next few lines set up our game logic and render to happen 30 times per second
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
      }, 1000/framesPerSecond);    
      
      p2.carInit(car2Pic, 'green car');
      p1.carInit(car1Pic, 'blue car');
      inputInit();
  }
  
  function moveEverything() {
    p1.carMove();
    p2.carMove();
  }
  
  function drawEverything() {
    drawTiles();    
    p1.carDraw();
    p2.carDraw();
  }

