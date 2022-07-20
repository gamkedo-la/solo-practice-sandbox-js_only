const TOP_MARGIN = 60;
const SHEEP_RADIUS = 10;
var countSheepPenned = 0;

// sheep states
const GRAZING = 0;
const WALKING = 1;
const TRACTOR = 2;
const HELD = 3;
const DROPPED = 4;
const PENNED = 5;

function sheepClass() {
  this.x = 50;
  this.y = 50;
  this.speed = 0;
  this.speedX = 0;

  this.init = function(i) {
    this.id = i;
    this.team = 0;
    this.color = "#f4f4f4"; 
    this.reset();
  }

  this.reset = function(i) {
    // temp one sheep id0 held at start
    this.state = GRAZING;
    this.inPen = false;
    this.held = false;
    this.tractor = false;
    this.x = randomRangeInt(0, canvas.width);
    this.y = randomRangeInt(TOP_MARGIN, canvas.height / 4.2);
    this.speed = 0;
    // if(this.id == 0) {
    //   this.state = HELD;
    //   this.x = blueCar.x;
    //   this.y = blueCar.y +18;
    // }  // attached to Hat
  }

  this.move = function() {
    if(this.state == HELD) {
      this.x = blueCar.x;
    }
    else if (this.state == TRACTOR) {
      this.speed = 5;
      nextY = this.y;
      nextY -= this.speed;
      if(nextY < blueCar.y +18) {
        nextY = blueCar.y +18;
        this.state = HELD;
        this.held = true;
        this.speed = 0;
        blueCar.sheepIDheld = this.id;
        var teamSort = randomRangeInt(1, 2);
        this.team = teamSort;
        if (teamSort == 1) {
          this.color = "#66b3ff"; // blue
          // this.img = blueSheepPic;
        } else if (teamSort == 2) {
          this.color = "#f38282";
          // this.img = redSheepPic;
        }
        ui_countPenned();
      } 
      this.y = nextY;
    }
    else if(this.state == DROPPED)
    { // sheep released by Hat
      this.speed = 5;
      this.y += this.speed;
      this.x += this.speedX;
      if(this.inPen == false) {
        this.tileHandling();
      }
    }
  }

  this.draw = function() {
    colorCircle(this.x, this.y, SHEEP_RADIUS, this.color)
  }
  this.label = function() {
    drawText(this.id, this.x + SHEEP_RADIUS +1, this.y +5, "white");
  }

  this.tileHandling = function() {
    var tileCol = Math.floor(this.x / TILE_W);
    var tileRow = Math.floor(this.y / TILE_H);
    var tileIndexUnder = rowColToArrayIndex(tileCol, tileRow);

    if(tileCol >= 0 && tileCol < TILE_COLS &&
      tileRow >= 0 && tileRow < TILE_ROWS) {

      var tileType = getTileTypeAtColRow(tileCol,tileRow);

      if(tileType == TILE_GOAL || tileType == TILE_PEN_BLUE || tileType == TILE_PEN_RED) {
        console.log("Sheep ID", this.id, "reached the pen.");
        this.speed = 0;
        this.speedX = 0; // hack add to cope with deflectors
        this.y += 10 ; // move into pen
        this.state = PENNED;
        countSheepPenned++;
        ui_countPenned();

      // deflection size governed by how many steps inside tile
      } else if(tileType == TILE_FLAG) {  
        this.speedX += 1;
      } else if(tileType == TILE_TREE) {
        this.speedX -= 1;

      } else if(tileType != TILE_FIELD) {
        // undo car move to fix "car stuck in wall" bug
        this.x -= Math.cos(this.ang) * this.speed;
        this.y -= Math.sin(this.ang) * this.speed;
        // rebound from obstacle
        this.speed *= -1;
  
      } // end of track found
    } // end of valid col and row
  }
}

function ui_countPenned() {
  var n = countPennedSheep();
  var txt = "Counting... " + n + " sheep are in pen.";
  if(blueCar.sheepIDheld != undefined) {
    txt = txt + " And sheep id" + blueCar.sheepIDheld + " is under the Hat."
  }
  document.getElementById("debug_2").innerText = txt;
}