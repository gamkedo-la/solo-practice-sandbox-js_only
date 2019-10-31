function keyPush(event)
{
  switch(event.keyCode)
  {
    case 32://spacebar
    if (titleScreen)
    {
      titleScreen = false;
      document.getElementById("blendedCatAudio").play();
    }
    else
    {
      {
        fireBullet();
      }
    }
    break;
    
    case 37://left
    player.position -= 1;
    if (player.position < 0)
    {
      player.position = 2;
    }
    break;

    case 39://right
    player.position += 1;
    if (player.position > 2)
    {
      player.position = 0;
    }
    break;

    case 82://repeat audio
    document.getElementById("blendedCatAudio").play();
    break;
  }
}

function canvasClick()
{
  if (titleScreen)
  {
    titleScreen = false;
    document.getElementById("blendedCatAudio").play();
  }
  else
  {
    {
      fireBullet();
    }
  }
}
