function Animation(frameSet, time) {
  // Counts the number of game cycles that passed since the last frame change
  this.timePassed = 0;
  // Number of games cycles to wait until next frame change
  this.animDuration = time;
  // Value of the sprite image on the sprite sheet
  this.spriteNumber = 2;
  // Current animation set/sub array
  this.animSet = frameSet;
  // Index of the current animation set
  this.animSetIndex = 0;

  // Reset the animation - with same or another frameSet
  this.changeAnimSet = function (frameSet, time = 10) {
    // Reset count
    this.timePassed = 0;
    // Set the duration
    this.animDuration = time;
    // Set the new animation set
    this.animSet = frameSet;
    // Start at the first frame in the new animation set
    this.animSetIndex = 0;
    // Set the new animation value
    this.spriteNumber = this.animSet[this.animSetIndex];
  };

  this.update = function () {
    // Every time the player is jumping, manually set the sprite to the jumping sprite
    if (player.jumping) {
      this.spriteNumber = 2;
      return;
    }

    // Keep track of how many game cycles have passed since last frame change
    this.timePassed++;

    // If enough time has passed, change the frame
    if (this.timePassed >= this.animDuration) {
      // Reset the count
      this.timePassed = 0;

      // If the index is on the last value of the animation set, reset to 0 -> first element of the set
      // If isn't the last, just add 1 and move to the next sprite
      this.animSetIndex =
        this.animSetIndex == this.animSet.length - 1
          ? 0
          : this.animSetIndex + 1;

      // Change current animation frame value
      this.spriteNumber = this.animSet[this.animSetIndex];
    }
  };
}
