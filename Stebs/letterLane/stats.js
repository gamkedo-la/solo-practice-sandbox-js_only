var accuracy = 0;
var amountCorrect = 0;
var amountIncorrect = 0;

function calculateAccuracy()
{
    accuracy = 100 * ( amountCorrect/(amountCorrect + amountIncorrect) );
    accuracy = Math.floor(accuracy);
}

function drawStats()
{
  statsCanvasContext.fillStyle = 'green';
  statsCanvasContext.font = '30px Helvetica';
  statsCanvasContext.fillText("Correct: " + amountCorrect, statsCanvas.width/2 - 50, 30);
  statsCanvasContext.fillText("Incorrect: " + amountIncorrect, statsCanvas.width/2 - 50, statsCanvas.height/2);
  statsCanvasContext.fillText("Accuracy: " + accuracy + "%", statsCanvas.width/2 - 50, statsCanvas.height - 30);
}

function drawStatsBackground()
{
  statsCanvasContext.fillStyle = 'purple';
  statsCanvasContext.fillRect(0,0, statsCanvas.width,statsCanvas.height);
}
