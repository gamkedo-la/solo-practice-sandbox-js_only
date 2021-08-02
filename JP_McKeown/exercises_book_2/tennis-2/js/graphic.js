const _NO_ANGLE = 0;

function colourCircle(centreX, centreY, radius, colour) {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(centreX, centreY, radius, 0, Math.PI*2, true);
    ctx.fill();    
}

function colourRectangle(leftX, topY, rightX, bottomY, colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(leftX, topY, rightX, bottomY);
}

function drawScore1(txt, colour) {
    ctx.fillStyle = colour;
    ctx.font = '24px Verdana';
    ctx.fillText(txt, 100, 100);
}

function drawScore2(txt, colour) {
    ctx.fillStyle = colour;
    ctx.font = '24px Verdana';
    // -width not needed as ctx.textAlign = center
    // var width = ctx.measureText(txt).width;
    ctx.fillText(txt, canvas.width-100, 100);
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle) {
    ctx.save(); // allows undo of translate and rotate
    ctx.translate(atX, atY); // sets point where graphic will go
    ctx.rotate(withAngle); // sets rotation
    ctx.drawImage(graphic, -graphic.width/2, -graphic.height/2); // center, draw
    ctx.restore(); // undo translation and rotation since save()
}

function blankCanvas(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}