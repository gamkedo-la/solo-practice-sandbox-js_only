// tuning constants
const ENEMY_MOVE_SPEED = 2.0;
const AI_FRAME_THINK_TIME = 60;
var enemyList = [];

function addEnemy() {
    var tempEnemy = new enemyClass();
    enemyList.push(tempEnemy);
}

function enemyClass() {
    // variables to keep track of position
    this.x;
    this.y;
    this.tilePath = [];
    this.pathfindingNow = false;
    this.framesBeforeReThink = AI_FRAME_THINK_TIME;
    this.moving = false;
    this.patrolling = true;
    this.resting = false;
    this.trackPlayerRange = 250;

    // move states
    this.move_North = false;
    this.move_East = false;
    this.move_South = false;
    this.move_West = false;

    //shots
    this.myProjectileList = [];
    this.totalShots = 3;

    //animation
    this.sx = 0;
    this.sy = 0;
    this.swidth = 50;
    this.sheight = 50;

    this.init = function(whichGraphic, whichName) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
        console.log(this.myBitmap)
        this.reset();
    }

    this.reset = function() {
        if (this.homeX == undefined) {
            for (var i = 0; i < roomGrid.length; i++) {
                if (roomGrid[i] == TILE_ENEMY) {
                    var tileRow = Math.floor(i / ROOM_COLS);
                    var tileCol = i % ROOM_COLS;
                    this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
                    this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
                    roomGrid[i] = TILE_GROUND;
                    break; // found it, so no need to keep searching 
                } // end of if
            } // end of for
        } // end of if position not saved yet

        this.x = this.homeX;
        this.y = this.homeY;

    } // end of reset

    this.move = function() {
        //pathfinding
        if (this.framesBeforeReThink-- < 0) {
            this.framesBeforeReThink = AI_FRAME_THINK_TIME;
            //check if within range of the player
            var playerDistance = dist(p1.x, p1.y, this.x, this.y);

            this.resting = this.patrolling = false;

            if (playerDistance >= this.trackPlayerRange) {
                if (randomIntFromInterval(0, 10) < 4) {
                    this.resting = true;
                } else {
                    this.patrolling = true;
                }
            }

            if (this.patrolling) { //patrolling
                var patrolLocationX = randomIntFromInterval(0, 800);
                var patrolLocationY = randomIntFromInterval(0, 600);
                var patrolToLocation = pixCoordToIndex(patrolLocationX, patrolLocationY);
                startPath(patrolToLocation, this);

            } else if (this.resting) {
                this.move_East = this.move_West = this.move_North = this.move_South = false;
            } else { // tracking player
                var playerIdx = pixCoordToIndex(p1.x, p1.y);
                startPath(playerIdx, this);
            }
        }


        var nextX = this.x;
        var nextY = this.y;

        var enemyCol = Math.floor(this.x / TILE_W);
        var enemyRow = Math.floor(this.y / TILE_H);

        var enemyCurrentTileIndex = roomTileToIndex(enemyCol, enemyRow);

        if (this.tilePath.length > 0) {
            var targetIndex = this.tilePath[0];
            var targetC = targetIndex % ROOM_COLS;
            var targetR = Math.floor(targetIndex / ROOM_COLS);
            var targetX = targetC * TILE_W + (TILE_W * 0.5);
            var targetY = targetR * TILE_H + (TILE_H * 0.5);
            var deltaX = Math.abs(targetX - this.x);
            var deltaY = Math.abs(targetY - this.y);

            this.move_East = this.move_West = this.move_North = this.move_South = false;

            if (deltaX <= ENEMY_MOVE_SPEED) {
                this.x = targetX;
                if (deltaY <= ENEMY_MOVE_SPEED) {
                    this.y = targetY;
                    this.tilePath.shift();
                } else if (targetY < this.y) {
                    this.move_North = true;
                } else {
                    this.move_South = true;
                }
            } else if (deltaY <= ENEMY_MOVE_SPEED) {
                this.y = targetY;
                if (deltaX <= ENEMY_MOVE_SPEED) {
                    this.x = targetX;
                    this.tilePath.shift();
                } else if (targetX < this.x) {
                    this.move_West = true;
                } else {
                    this.move_East = true;
                }
            } else { // move towards center of closest tile
                targetX = enemyCol * TILE_W + (TILE_W * 0.5);
                targetY = enemyRow * TILE_H + (TILE_H * 0.5);
                if (targetY < this.y - ENEMY_MOVE_SPEED) {
                    this.move_North = true;
                } else if (targetY > this.y + ENEMY_MOVE_SPEED) {
                    this.move_South = true;
                } else if (targetX < this.x) {
                    this.move_West = true;
                } else {
                    this.move_East = true;
                }
            }
        }

        if (this.move_North || this.move_East || this.move_South || this.move_West) {
            this.moving = true;
        } else {
            this.moving = false;
        }

        if (this.move_North) {
            nextY -= ENEMY_MOVE_SPEED;
        }
        if (this.move_East) {
            nextX += ENEMY_MOVE_SPEED;
        }
        if (this.move_South) {
            nextY += ENEMY_MOVE_SPEED;
			this.shootProjectile();
        }
        if (this.move_West) {
            nextX -= ENEMY_MOVE_SPEED;
        }

        var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
        var walkIntoTileType = TILE_WALL_7;

        if (walkIntoTileIndex != undefined) {
            walkIntoTileType = roomGrid[walkIntoTileIndex];
        }

        switch (walkIntoTileType) {
            case TILE_GROUND:
            case TILE_DOOR_YELLOW_FRONT_TOP_OPEN:
            case TILE_DOOR_YELLOW_FRONT_BOTTOM_OPEN:
            case TILE_PRISON_GATE_TOP_OPEN:
            case TILE_PRISON_GATE_BOTTOM_OPEN:
            case TILE_GOAL:
            case TILE_KEY:
                this.x = nextX;
                this.y = nextY;
                break;
            case TILE_DOOR:
            case TILE_DOOR_YELLOW_FRONT_TOP:
            case TILE_DOOR_YELLOW_FRONT_BOTTOM:
            case TILE_WALL_1:
            case TILE_WALL_2:
            case TILE_WALL_3:
            case TILE_WALL_4:
            case TILE_WALL_5:
            case TILE_WALL_6:
            case TILE_WALL_7:
            case TILE_WALL_8:
            case TILE_WALL_9:
            case TILE_WALL_10:
            case TILE_WALL_11:
            case TILE_WALL_12:
            case TILE_WALL_13:
            default:
                // any other tile type number was found... do nothing, for now
                break;
        }
    }

    this.shootProjectile = function() {
        if (this.myProjectileList.length < this.totalShots) {
            let tempShot = new ProjectileClass();
            tempShot.shootFrom(this);
            this.myProjectileList.push(tempShot);
        }
    }

    this.animate = function() {
        this.swidth = this.swidth + this.swidth
        this.sx = this.swidth
        if (this.swidth > 300) {
            this.swidth = 0;
        }
    }

    this.draw = function() {
        //	this.animate();
        canvasContext.drawImage(this.myBitmap,this.sx,this.sy, this.swidth, this.sheight, this.x, this.y, 50, 50);
    }

} // end of class