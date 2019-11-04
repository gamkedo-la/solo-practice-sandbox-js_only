function calculateAccuracy()
{
    accuracy = 100 * ( amountCorrect/(amountCorrect + amountIncorrect) );
    accuracy = Math.floor(accuracy);
}

function drawStats()
{
  statsDrawingContext.fillStyle = 'green';
  statsDrawingContext.font = '30px Helvetica';
  statsDrawingContext.fillText("Correct: " + amountCorrect, statsCanvas.width/2 - 50, 30);
  statsDrawingContext.fillText("Incorrect: " + amountIncorrect, statsCanvas.width/2 - 50, statsCanvas.height/2);
  statsDrawingContext.fillText("Accuracy: " + accuracy + "%", statsCanvas.width/2 - 50, statsCanvas.height - 30);
}

function drawStatsBackground()
{
  statsDrawingContext.fillStyle = 'purple';
  statsDrawingContext.fillRect(0,0, statsCanvas.width,statsCanvas.height);
}
