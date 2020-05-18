function drawRect(topleftX, topleftY, boxWidth, boxHeight, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(topleftX, topleftY, boxWidth, boxHeight);
}