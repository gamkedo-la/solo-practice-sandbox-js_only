
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

function colorText(words, textX, textY, fillColour) {
    ctx.font =  `24px Verdana`;
    ctx.fillStyle = fillColour;
    ctx.fillText(words, textX, textY);
}
