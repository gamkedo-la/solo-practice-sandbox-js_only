function shieldClass(x, y, type) {
// needs refactoring to avoid checking strength repeatedly
// can a shield be deleted when strength hits zero?

    this.draw = function() {
        if(this.strength > 0) {
            drawLineRect(x, y, TILE_W, TILE_H, 'white', 'black');
        }
    }

    this.drawStrength = function() {
        if(this.strength > 0) {
        // let strengthTint = '#0000' + strength.toString(16);
        // RGB gradient only works for greyscale, need HSL
        // low strength -> higher lightness 
        let lightness = SHIELD_LIGHTNESS - this.strength;
        let strengthTint = 'hsl(240, 100%, ' + lightness + '%)'; 
        // console.log(strengthTint)
        drawLineRect(this.x, this.y, TILE_W, TILE_H, strengthTint, 'black');
        }
    }

    this.writeStrength = function() {
        if(this.strength > 0) {
            let wx = this.x + TILE_W/2 - 8;
            let wy = this.y + TILE_H/2 + 5;
            if(this.strength<10) {
                wx += 3;
            }
            if(this.strength > 20) {
                fontColour = 'white'; 
            } else {
                fontColour = 'black'; 
            }
            drawText(this.strength, wx, wy, LABEL_SIZE, fontColour);
        }
    }
} // end of shield class

function createEveryShield() {
  // read number and position from worldGrid
  var shieldCount = 0;
  let tileX = 0;
	let tileY = 0;

  // for(var i=0; i<worldGrid.length; i++) {
  //   let x = TILE_W;
  //   let y = ;
  for(let row = 0; row < WORLD_ROWS; row++) {
    for(let col = 0; col < WORLD_COLS; col++) {

      let arrayIndex = tileToIndex(col, row); 
      let tileKindHere = worldGrid[arrayIndex];

      if(tileKindHere == TILE_SHIELD || tileKindHere == TILE_CORNER_SHIELD) {
        shieldList.push(new shieldClass());

        if(tileKindHere == TILE_SHIELD) {
          // shieldList.push(new shieldClass(tileX, tileY, 'wall'));  
          shieldList[shieldCount].strength = SHIELD_WALL_INIT_STRENGTH;
        } 
        if(tileKindHere == TILE_CORNER_SHIELD) {
          //shieldList.push(new shieldClass(tileX, tileY, 'corner'));
          shieldList[shieldCount].strength = SHIELD_CORNER_INIT_STRENGTH;
        } 
        shieldList[shieldCount].x = tileX;
        shieldList[shieldCount].y = tileY;
        shieldList[shieldCount].tileIndex = arrayIndex;
        shieldCount++;
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