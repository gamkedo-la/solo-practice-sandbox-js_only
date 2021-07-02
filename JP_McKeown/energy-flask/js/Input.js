function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
  
    // test mode
    if(mouseBallMode) {
      ballX = mouseX;
      ballY = mouseY;
      ballSpeedX = 2;
      ballSpeedY = -2;
    }
}