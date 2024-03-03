// create a new scene
let game = new Phaser.Scene('Game');

game.init = function () {
   this.booms_display = 3;
   this.ySpacingRange = [300, 400];
   this.boomGapRange = [75, 150];
   this.boom_length_min = 0;
   this.start_x = config.width / 2;
   this.start_y = 40;
   this.displayWidth = this.sys.config.width;
   this.displayHeight = this.sys.config.height;
   this.fontSize = 16;
   this.lineHeight = 70;
   this.fontOptions = { fontSize: `${this.fontSize}px`, fill: '#999' };
   this.boomsPassed = 0;
   this.boomsToGoal = 3;
   this.boomsPassedMax = localStorage.getItem('boomsPassedMax');
   this.pierPlaced = false;
};

game.create = function () {
   this.cameras.main.setBackgroundColor(0x0000ff);

   this.boat = this.physics.add.sprite(this.start_x, this.start_y, 'boat')
      .setDrag(30);

   this.makeBooms();
   this.checkIfReachedPier();

   this.makeProgressDisplay();

   this.cursors = this.input.keyboard.createCursorKeys();

   this.physics.add.collider(this.boat, this.booms, this.gameOver, null, this);
   // this.add.text(50, 620, `Past record: ${bestScore || 0}`, this.fontOptions)
   //    .setOrigin(0);
};

game.update = function () {
   // arrow keys control
   if (this.cursors.left.isDown) {
      this.boat.setVelocityX(-50);
   }
   else if (this.cursors.right.isDown) {
      this.boat.setVelocityX(50);
   }

   this.recycleBoom();

   // bounce off side of river
   if (this.boat.x > 360 - this.boat.width / 2 && this.boat.body.velocity.x > 0) {
      this.boat.body.velocity.x *= -1;
   }
   else if (this.boat.x < this.boat.width / 2 && this.boat.body.velocity.x < 0) {
      this.boat.body.velocity.x *= -1;
   }
};

game.makeProgressDisplay = function () {
   let x = 40;
   let y = this.displayHeight - 120;
   let yLineSpacing = 32;
   this.score = 0;
   this.progressDisplay = this.add.text(x, y, `Navigated: ${this.boomsPassed}`, { fontSize: '24px', fill: '#fff' });
   y += yLineSpacing;
   // get and display best past score
   let boomsPassedMax = localStorage.getItem('boomsPassedMax');
   this.maxProgressDisplay = this.add.text(x, y, `Previous best: ${boomsPassedMax || 0}`, { fontSize: '16px', fill: '#aaa' });
};

game.makeBooms = function () {
   this.booms = this.physics.add.group();
   for (let i = 0; i < this.booms_display; i += 1) {
      let leftBoom = this.booms.create(0, 0, 'boom')
         .setImmovable(true)
         .setOrigin(1, 0)
         .setScale(0.7);
      let rightBoom = this.booms.create(0, 0, 'boom')
         .setImmovable(true)
         .setOrigin(0, 0)
         .setScale(0.7);
      this.placeBoom(leftBoom, rightBoom);
   }
   this.booms.setVelocityY(-50);
};

game.placeBoom = function (leftBoom, rightBoom) {
   // gap between left and right booms
   let gapSize = Phaser.Math.Between(...this.boomGapRange);
   // left side of gap's X coordinate i.e. right edge of left boom
   let gapLeftMin = this.boom_length_min;
   // this.displayWidth NaN why?
   let gapLeftMax = 360 - gapSize - this.boom_length_min;
   let gapLeftRange = [gapLeftMin, gapLeftMax];
   let xGapLeft = Phaser.Math.Between(...gapLeftRange);
   leftBoom.x = xGapLeft;
   rightBoom.x = xGapLeft + gapSize;

   let ySpacing = Phaser.Math.Between(...this.ySpacingRange);
   let yPrevious = this.getHighestBoom();
   let yBoom = yPrevious + ySpacing;
   leftBoom.y = yBoom;
   rightBoom.y = yBoom;
};

game.recycleBoom = function () {
   if (this.pierPlaced) return;
   let tempBooms = [];
   this.booms.getChildren().forEach(boom => {
      if (boom.getBounds().bottom < 0) {
         tempBooms.push(boom);
         if (tempBooms.length === 2) {
            this.placeBoom(...tempBooms);
            this.trackProgress();
            this.saveBestScore();
            if (!this.pierPlaced) {
               this.checkIfReachedPier();
            }
         }
      }
   });
};

game.getHighestBoom = function () {
   let xHigh = 0;
   this.booms.getChildren().forEach(boom => {
      xHigh = Math.max(boom.y, xHigh);
   });
   return xHigh;
};

game.trackProgress = function () {
   this.boomsPassed += 1;
   this.progressDisplay.setText(`Navigated: ${this.boomsPassed}`);
};

game.saveBestScore = function () {
   let bestScoreStr = localStorage.getItem('bestScore');
   let bestScore = bestScoreStr && parseInt(bestScoreStr, 10);
   if (!bestScore || this.score > bestScore) {
      localStorage.setItem('bestScore', this.score);
   }
};

game.gameOver = function () {
   this.physics.pause();
   this.boat.setTint(0xff0000);
   this.saveBestScore();
   let y = this.boat.y + this.boat.height;
   this.pet = this.add.sprite(this.boat.x, y, 'pet', 0);
   this.pet.play('faces');
   let text = this.add.text(180, 300, 'Level over', { font: '40px Arial', fill: '#ffffff' })
      .setOrigin(0.5);
};

game.checkIfReachedPier = function () {
   console.log('ready for goal? ' + this.boomsPassed);
   if (!this.pierPlaced && this.boomsPassed >= this.boomsToGoal) {
      this.makePier();
      this.pierPlaced = true;
   }
};

game.makePier = function () {
   this.pier = this.physics.add.sprite(180, 720, 'pier')
      .setScale(0.8);
   // this.pier = this.physics.add.sprite(this.screenWidth / 2, this.screenHeight - 200, 'pier');
   this.pier.setVelocityY(-50);
   this.physics.add.collider(this.boat, this.pier, this.gameOver, null, this);
   this.pierPlaced = true;
   console.log(this.pierPlaced);
};

game.resetGame = function () {

};