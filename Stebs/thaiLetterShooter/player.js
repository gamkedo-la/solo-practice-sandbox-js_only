function Player()
{
  this.position = 1;

  this.draw = function()
  {
    canvasDrawingContext.beginPath();
    canvasDrawingContext.moveTo(this.position*200 + 10, gameCanvas.height - 10);
    canvasDrawingContext.lineTo(this.position*200 + 100, gameCanvas.height - 150);
    canvasDrawingContext.lineTo(this.position*200 + 190, gameCanvas.height - 10);
    canvasDrawingContext.closePath();

    canvasDrawingContext.lineWidth = 10;
    canvasDrawingContext.strokeStyle = '#666666';
    canvasDrawingContext.stroke();

    canvasDrawingContext.fillStyle = "#FFCC00";
    canvasDrawingContext.fill();
  }
}
