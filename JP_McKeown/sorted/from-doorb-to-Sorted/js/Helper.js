function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function randomRangeInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function distance(x1,y1, x2,y2) {
  var deltaX = x1 - x2;
  var deltaY = y1 - y2;
  return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
}

function xDistance(x1, x2) {
  return Math.abs(x1 - x2);
}

function countPennedSheep() {
  var count = 0;
  for(var i=0; i<NUM_SHEEP; i++) {
    if(sheepList[i].state == PENNED) {
      count++;
    }
  }
  return count;
}