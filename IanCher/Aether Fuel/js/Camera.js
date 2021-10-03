const PLAYER_DIST_FROM_CENTER_BEFORE_CAM_PAN_X = 150;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAM_PAN_Y = 100;

const SAFETY_EXTRA_TRACKS_SEEN = 2;


function Camera()
{
    this.camPanX = 0;  // Shift from the top left corner
    this.camPanY = 0;  // Shift from the top left corner

    this.maxCamPanX = 0;
    this.maxCamPanY = 0;

    this.minTrackSeenX = 0;
    this.maxTrackSeenX = 0;
    this.minTrackSeenY = 0;
    this.maxTrackSeenY = 0;

    this.numRowsSeen;
    this.numColsSeen;

    this.initialize = function()
    {
        this.maxCamPanX = trackNumCols * TRACK_W - canvas.width; 
        this.maxCamPanY = trackNumRows * TRACK_H - canvas.height; 

        this.numColsSeen = Math.floor(canvas.width / TRACK_W);
        this.numRowsSeen = Math.floor(canvas.height / TRACK_H);
    }
    
    this.followPlayer = function(player)
    {
        this.camPanX = player.x - canvas.width / 2; 
        this.camPanY = player.y - canvas.height / 2; 
    
        this.checkForCollisions();
        this.updateTracksSeen();
    }

    this.updateTracksSeen = function()
    {
        var panTrackJ = Math.floor(this.camPanX / TRACK_W);
        var panTrackI = Math.floor(this.camPanY / TRACK_H);
        
        this.minTrackSeenJ = Math.max(0, panTrackJ - SAFETY_EXTRA_TRACKS_SEEN);
        this.maxTrackSeenJ = Math.min(trackNumCols, panTrackJ + this.numColsSeen + SAFETY_EXTRA_TRACKS_SEEN);

        this.minTrackSeenI = Math.max(0, panTrackI - SAFETY_EXTRA_TRACKS_SEEN);
        this.maxTrackSeenI = Math.min(trackNumRows, panTrackI + this.numRowsSeen + SAFETY_EXTRA_TRACKS_SEEN);
    }

    this.translate = function()
    {
        canvasContext.save();
        canvasContext.translate(-this.camPanX, -this.camPanY);
    }

    this.checkForCollisions = function() 
    {
        if (this.camPanX < 0) {
            this.camPanX = 0;
        }
        else if (this.camPanX > this.maxCamPanX) {
            this.camPanX = this.maxCamPanX;
        }

        if (this.camPanY < 0) {
            this.camPanY = 0;
        }
        else if (this.camPanY > this.maxCamPanY) {
            this.camPanY = this.maxCamPanY;
        }
    }
}
