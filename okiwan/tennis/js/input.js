function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  }
}

function mouseMove(evt) {
  var mousePos = calculateMousePos(evt);
  paddle1Y = mousePos.y - (paddle1Height / 2);
}

function mouseClick(evt) {
  if (showWinningScreen) {
    startOver();
  }
}

