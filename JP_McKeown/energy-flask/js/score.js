function drawMoney() {
  moneyStr = 'Money: ' + money;
  drawText(moneyStr, GAME_WIDTH+40, 400, 'white', '18px Verdana');
}

function showEnergy() {
  energyStr = 'Energy: ' + energy;
  drawText(energyStr, GAME_WIDTH+40, 440, 'white', '18px Verdana');
}