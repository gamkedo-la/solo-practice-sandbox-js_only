  // save the canvas for dimensions, and its 2d context for drawing to it
  var canvas, ctx;
  var p1 = new warriorClass();
  
      // canvas.setAttribute('tabindex','0');
    // canvas.focus()
  window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    loadImages();
  }

  function loadingDoneSoStartGame() {
    // these next few lines set up our game logic and render to happen 30 times per second
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
      }, 1000/framesPerSecond);    
      
      p1.init(playerPic, 'warrior');
      inputInit();
  }
  
  function moveEverything() {
    p1.move();
  }
  
  function drawEverything() {
    drawTiles();    
    p1.draw();
  }

  function showText(msg) {
    document.getElementById('debugText').innerHTML = msg;
  }
