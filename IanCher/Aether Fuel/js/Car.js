const GROUND_SPEED_DECAY_MULT = 0.94;
const GAS_POWER = 1.0;
const REVERSE_POWER = 0.8;
const TURN_SPEED = 0.1;
const MIN_SPEED_TO_TURN = 0.5;

function carClass()
{
    this.name = "Unnamed Car";

    this.x;
    this.y;
    this.ang = Math.PI / 2;
    this.speed = 0;
    this.pic;

    this.keyHeldGas = false;
    this.keyHeldReverse = false;
    this.keyHeldTurnLeft = false;
    this.keyHeldTurnRight = false;

    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;

    this.setupInput = function(upKey, rightKey, downKey, leftKey)
    {
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;        
    }

    this.reset = function(carName, whichPic)
    {
        this.name = carName;
        this.pic = whichPic;

        this.ang = -Math.PI / 2;
        this.speed = 0;

        for (var i = 0; i < trackNumRows ; i++)
        {
            for (var j = 0; j < trackNumCols; j++)
            {
                var trackIdx = i * trackNumCols + j;

                if (trackGrid[trackIdx] == TRACK_START)
                {
                    trackGrid[trackIdx] = TRACK_ROAD;

                    this.x = j * TRACK_W + TRACK_W / 2;
                    this.y = i * TRACK_H + TRACK_H / 2;

                    return;
                }  // end if track_start found
            }  // end for j
        }  // end for i

        console.log("NO PLAYER START FOUND")
    }

    this.move = function()
    {
        this.speed *= GROUND_SPEED_DECAY_MULT;

        if (this.keyHeldGas) 
        {
            this.speed += GAS_POWER;
        }
        if (this.keyHeldReverse)
        {
            this.speed -= REVERSE_POWER;
        }

        if (Math.abs(this.speed) > MIN_SPEED_TO_TURN)
        {   
            if (this.keyHeldTurnLeft)
            {
                this.ang -= TURN_SPEED;
            }
            if (this.keyHeldTurnRight)
            {
                this.ang += TURN_SPEED;
            }   
        }

        this.x += this.speed * Math.cos(this.ang);
        this.y += this.speed * Math.sin(this.ang);
    }

    this.handleCollisionWithTracksAdvanced = function()
    {
        if (getTrackIdxFromXY(this.x, this.y) < -1) { return; }

        var carTrackJ = Math.floor(this.x / TRACK_W);
        var carTrackI = Math.floor(this.y / TRACK_H);

        var trackType = returnTrackTypeAtIJ(carTrackI, carTrackJ);

        if (trackType == TRACK_WALL)
        {
            this.x -= 1.5 * this.speed * Math.cos(this.ang);
            this.y -= 1.5 * this.speed * Math.sin(this.ang);
            this.speed *= -0.5;
        }
        else if (trackType == TRACK_GOAL)
        {
            console.log(this.name + " wins!!!");
            loadLevel(levelThree, 47, 70);
        }
    }

    this.draw = function()
    {
        drawBitmapCenteredWithRotation(this.pic, this.x, this.y, this.ang);
    }
}