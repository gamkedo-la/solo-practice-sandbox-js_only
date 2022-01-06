function writeMoney() {
  moneyStr = 'Money: ' + money;
  drawText(moneyStr, GAME_WIDTH+40, 400, HUD_SIZE, 'white');
}

function writeEnergy() {
  energyStr = 'Energy: ' + energy;
  drawText(energyStr, GAME_WIDTH+40, 440, HUD_SIZE, 'white');
}