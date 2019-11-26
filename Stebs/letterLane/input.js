function keyDown(builtInDocumentEventObject)
{
  switch(builtInDocumentEventObject.keyCode)
  {
    case 37://left arrow moves left
      carX -= 150;
      break;
    case 39://right arrow moves right
      carX += 150;
      break;
  }
}

function canvasClick()
{
  if (loadingScreen)
  {
    loadingScreen = false;
    //setOrResetCorrectLetter();
    setInterval(update, 1000/30);
    setInterval(spawnALetter, 2000);
    correctLetterAudio = document.getElementById("correctLetter");
    setCorrectLetter();
    //setInterval(spawnALetter, 2000);
  }
}
