function drawCircle(centerX, centerY, radius, fillColour) {
  ctx.fillStyle = fillColour;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  ctx.fill();
}