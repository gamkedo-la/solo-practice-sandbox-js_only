function keyPush(event)
{
  switch(event.keyCode)
  {
    case 32://spacebar fires
      arrayOfShots.push({x:playerX,y:playerY});
      break;
    case 37://left arrow moves left
      playerX-=playerSpeed;
      break;
    case 38://up arrow moves up
      playerY-=playerSpeed;
      break;
    case 39://right arrow moves right
      playerX+=playerSpeed;
      break;
    case 40://down arrow moves down
      playerY+=playerSpeed;
      break;
  }
}

function canvasClick()
{
  if (loadingScreen)
  {
    loadingScreen = false;
    setOrResetCorrectLetter();
    setInterval(update, 1000/30);
    setInterval(spawnALetter, 2000);
  }
}
