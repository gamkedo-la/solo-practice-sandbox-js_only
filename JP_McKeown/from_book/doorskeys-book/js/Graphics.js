
  function drawBitmapCenteredAtlocationWithRotation(graphic, atX, atY, withAngle) {
    ctx.save();
    ctx.translate(atX, atY);
    ctx.rotate(withAngle);
    ctx.drawImage(graphic, -graphic.width/2, -graphic.height/2);
    ctx.restore();
  }

  function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
  }
  
  function colorCircle(centerX, centerY, radius, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    ctx.fill();
  }