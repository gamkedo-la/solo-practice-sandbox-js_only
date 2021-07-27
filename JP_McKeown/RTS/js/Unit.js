const UNIT_RADIUS = 5;
const UNIT_SELECT_SIZE = UNIT_RADIUS + 3;
const UNIT_SPACING = UNIT_RADIUS * 3;
const UNIT_PLAYABLE_MARGIN = 20;

const UNIT_MOVE_RATE = 2; // pixels
const UNIT_ATTACK_RANGE = 50;
const UNIT_AI_DETECT_RANGE = UNIT_ATTACK_RANGE + 30;

var unitClass = function () {

    this.reset = function (playerTeam) {
        this.playerControlled = playerTeam;
        this.x = Math.random() * canvas.width / 4;
        this.y = Math.random() * canvas.height / 4;

        if(this.playerControlled) {
            this.unitColour = 'white';
        } else {
            // nonplayer units
            this.unitColour = 'red';
            // flip nonplayer units to opposite corner
            this.x = canvas.width - this.x;
            this.y = canvas.height - this.y;
        }

        this.gotoX = this.x;
        this.gotoY = this.y;
        this.myTarget = null;
        this.isDead = false;
    }

    this.gotoNear = function(x, y, place, formationSize) {
        var col = place % formationSize;
        var row = Math.floor(place / formationSize);
        this.gotoX = x + col * UNIT_SPACING;
        this.gotoY = y + row * UNIT_SPACING;
    }

    this.setTarget = function(newTarget) {
        this.myTarget = newTarget;
    }

    this.isInBox = function(x1, y1, x2, y2) {
        // if between x1 and x2 one negative one positive, for negative product
        return  (this.x - x1) * (this.x - x2) < 0 &&
                (this.y - y1) * (this.y - y2) < 0 ;
    }

    this.distanceFrom = function(X,Y) {
        var deltaX = X - this.x;
        var deltaY = Y - this.y;
        return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
    }

    this.move = function() {

        if(this.myTarget != null) {
            var targetX = this.myTarget.x;
            var targetY = this.myTarget.y;

            if(this.myTarget.isDead) {
                this.myTarget = null;
                this.gotoX = this.x;
                this.gotoY = this.y;
            }
            // was failing distance test as it expects x & y
            else if(this.distanceFrom(targetX, targetY) > UNIT_ATTACK_RANGE) {
                // out of range, keep moving
                this.gotoX = this.myTarget.x;
                this.gotoY = this.myTarget.y;
            } 
            else if(this.distanceFrom(targetX, targetY) <= UNIT_ATTACK_RANGE) {
                // in range, attack destroys, no moving
                this.myTarget.isDead = true;
                soonCheckUnitsToDelete();
                this.gotoX = this.x;
                this.gotoY = this.y;
            }
        } 
        else if(this.playerControlled == false) {
            // enemy actions if no target         
            if(Math.random() < 0.02) {
                var nearestFoeFound = findClosestUnitInRange(this.x, this.y, UNIT_AI_DETECT_RANGE, playerUnits);

                if(nearestFoeFound != null) {
                    this.myTarget = nearestFoeFound;
                } else {
                    // move randomly because no target
                    this.gotoX = this.x - Math.random()*70;
                    this.gotoY = this.y - Math.random()*70;
                }
            } // random AI response lag
        } // end of AI

        this.keepInPlayableArea();
        
        var deltaX = this.gotoX - this.x;
        var deltaY = this.gotoY - this.y;
        var distanceToGo = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
        var normX = deltaX / distanceToGo;
        var normY = deltaY / distanceToGo;

        if(distanceToGo > UNIT_MOVE_RATE) {
            this.x += normX * UNIT_MOVE_RATE;
            this.y += normY * UNIT_MOVE_RATE;
        } else {
            this.x = this.gotoX;
            this.y = this.gotoY;
        }
    }

    this.draw = function() {
        if (this.isDead == false) {
            colorCircle(this.x, this.y, UNIT_RADIUS, this.unitColour);
        } else {
            colorCircle(this.x, this.y, UNIT_RADIUS, 'yellow');
        }
    }

    this.drawSelectionBox = function() {
        outlineRectCornerToCorner(
            this.x - UNIT_SELECT_SIZE,
            this.y - UNIT_SELECT_SIZE,
            this.x + UNIT_SELECT_SIZE,
            this.y + UNIT_SELECT_SIZE, 'green');
    }

    this.keepInPlayableArea = function() {
        if(this.gotoX < UNIT_PLAYABLE_MARGIN) {
            this.gotoX = UNIT_PLAYABLE_MARGIN;
        }
        else if(this.gotoX > canvas.width - UNIT_PLAYABLE_MARGIN) {
            this.gotoX = canvas.width - UNIT_PLAYABLE_MARGIN;
        }
        if(this.gotoY < UNIT_PLAYABLE_MARGIN) {
            this.gotoY = UNIT_PLAYABLE_MARGIN;
        }
        else if(this.gotoY > canvas.height - UNIT_PLAYABLE_MARGIN) {
            this.gotoY = canvas.height - UNIT_PLAYABLE_MARGIN;
        }
    }
} // end of unitClass