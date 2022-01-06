function machineClass(x, y, type) {
    this.draw = function() {
        drawLineRect(this.x, this.y, TILE_W, TILE_H, 'green', 'black');
    }

} // end of machine class

function createEveryMachine() {
  // read number and position from worldGrid
  var count = 0;
  let tileX = 0;
	let tileY = 0;

  // for(var i=0; i<worldGrid.length; i++) {
  //   let x = TILE_W;
  //   let y = ;
  for(let row = 0; row < WORLD_ROWS; row++) {
    for(let col = 0; col < WORLD_COLS; col++) {

      let arrayIndex = tileToIndex(col, row); 
      let tileKindHere = worldGrid[arrayIndex];

      if(tileKindHere == TILE_MACHINE) {
        machineList.push(new machineClass());

        machineList[count].x = tileX;
        machineList[count].y = tileY;
        machineList[count].tileIndex = arrayIndex;
        count++;
      }
      tileX += TILE_W;
      arrayIndex++;
    } // end col

    tileY += TILE_H;
    tileX = 0;
  } // end row
}

function topupShields() {
  for( var i=0;i<SHIELD_COUNT;i++) {
    shieldList[i].strength++;
    money--;
  }
}

function impactShield(tileIndex) {
  // in shieldList[] which shield was hit? 
  // ? loop all shields and find the one matching tileIndex ?
  let id = tileToShield(tileIndex);
  energy++;
  shieldList[id].strength--;
  if(shieldList[id].strength == 0) {
    worldGrid[tileIndex] = 1;  
  }
  // strengthGrid[tileIndex]--;
  // if(strengthGrid[tileIndex] == 0) {
  //   worldGrid[tileIndex] = 1;
  // }
}
// function createEveryShield() {
//   for( var i=0;i<SHIELD_COUNT;i++) {
//     shieldList.push(new shieldClass());
//   }
// }