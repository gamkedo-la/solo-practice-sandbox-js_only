var player1 = new playerClass();
var player2 = new playerClass();
var player3 = new playerClass();
var player4 = new playerClass();


function playerClass() {
  this.name;
  this.pic = warriorPic;
  this.mapX = 0, this.mapY = 0;
  this.battleScreenX = 0, this.battleScreenY = 0;

  this.tickCount = 0;
  this.frameIndex = 0;
  this.width = 36;
  this.numberOfFrames = 6;
  this.height = 52;
  this.ticksPerFrame = 5;
  this.npcMove = true;
  this.npcTimeBetweenChangeDir = 100;

  this.init = function(playerName, playerPic){
	  this.name = playerName;
	  this.pic = playerPic;
  }

  this.reset = function (resetX, resetY) {
  };

  this.move = function () {
  }
}
