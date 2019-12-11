This is meant to be a general guide for anyone in the club who wants to contribute to the emulator project who either:
  1.Is newer to the club and might feel intimidated trying to reverse engineer the framework.
  2.Has more experience with game dev and just doesn't feel like or have time to reverse engineer the framework.

This pattern started by me finding very quick tutorials on how to build games, like Chris's code snake in 5 minutes on youtube,
and then using the 'model and improve' mentality to quickly make a variation that people might want to play to learn a new
foreign language.

**** SEPARATE GAME STEPS ******
Step 1:
  a.Figure out a simple game idea that makes the player pick one of two letter choices.
  b.Gameplay should have an 'endless' feel to it, like an endless runner style. So letter choices either get repositioned on the
  screen when a choice is made, letters are continuously fed across the screen, etc. so that players can keep making choices,
  gameplay never really stops.
  c.Correct and incorrect choices are tallied, accuracy is calculated, and that accuracy is meant to direct the program to show
  players what to learn (eventually). For now, just get the basic mechanics of gameplay working.
  d.The game can be as difficult and complicated as you want, as long as there is a default easy mode where there is
  essentially no losing, no dying, no significant detraction from the player moving forward and continuing to learn. Medium,
  hard, super hard, etc. modes can be as difficult as you want. In fact, making difficult modes would lend well to play testing
  the balance of learning with engagement.

Step 2: Either find a code base which you can manipulate to fit the theme of the emulator or create your own code base that
fits the theme.

Step 3: Commit your progress as its own index.html file, in its own folder, as its own separate game outside the framework.

Step 4: Ask for help if/when you want/need it. The team should help if you want it. Keep going until the game is playable.

Step 5: Make sure there is a default 'super easy', learning mode. Add more difficult modes if desired.

Step 6: If you want, use the following steps to help integrate your game into the emulator. If you don't want to, no worries,
I or someone else on the team will figure it out.


**** FRAMEWORK IMPLEMENTATION STEPS ****

Step 1: Create a new javascript file in the specificGames folder of the letterGameEmulator project, and name it appropriately.
  Like snakeSpecifics.js, birdSpecifics.js, etc. This is where we will define the specifics needed to run your game, and then
  we will use that information for more abstract/general code in the emulator framework. Add your file to the list of javascript
  files in index.html.

Step 2: Add the name of your game to titleScreen.js.
  a. look for the function drawGameNames() and add yours to the list using fillText. The pattern is pretty straight forward,
  you may just need to do small adjustments with the exact pixels. You can also change the font for your game title if
  necessary.

Step 3: Add a click check for the cell of your game in handleGameCellClicks(). This works kind of like a collision check.
This is where we trigger off the title screen boolean, trigger on your games boolean, reset the frame rate if desired, trigger
on playerIsPlayingAnyGame (another check for the emulator), set the first correct letter choice, reset letter spawning if
appropriate.

Step 4: Copy/paste your game background draw function code into your game specific file. Label it drawYourGamesBackground.

Step 5: Implement the background code into the pattern in background.js.

Step 3: Put player controls in the input.js file.
Check to see if the controls are already being used in the other games. If so, add a boolean check (playerShouldBePlayingYourGame)
to the if/else if list inside the appropriate switch statement, and then add your games specific control logic (playerX += playerSpeed
 or whatever).
