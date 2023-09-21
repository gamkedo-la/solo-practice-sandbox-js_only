# first series

## general notes

* simple, flat-colored geometrical shapes
* the world is ending, you only have so much time to... do stuff?
* time attack: how long do you last

## key points i want to see

* player actions
  * sideways
  * accelerate
  * break
  * boost

* bridge
  * immobile, non-aggressive, sturdy

* strips
  * immobile, friendly, refuels

* time vaults
  * non-aggressive, fragile, adds time to the run

* chaser
  * fragile, aggressive upstream, non-aggressive downstream, non-collidable if innactive
  * doesn't boosts over neither avoids structures 
  * faster than players minimum speed
  * activates after a delay
  * accelerates over time

## optional points i want to see

* player shoots 
* structures have HP according to their sturdiness
* structures damage colliders according to their sturdiness

* anti-air
  * moves sideways, fragile, aggressive downstream, non-aggressive upstream
  * tracks plane and predicts path
  * drops ammo

* time vaults teleport after a while

## questions i woul like answered

* does player accelerating move them to the bottom of the screen and slowing down move them to the middle of the screen confuses?
* does sideways movement interacts with the velocity in non trivial ways?
  * when player moves sideways, the *speed* is kept within the limits, and when they stop strafing, we keep vy as it is -> might slow the player if close to the max
  * when player moves sideways, we decelerate vy at the same time but different rate -> slows the player all the time but is consistent
  * when player moves sideways, they can also accelerate forward but at a bigger fuel cost or maybe damage? 
* does player needs to slow down to refuel?
* does player needs to slow down to pick up ammo?
* does the minimum speed increases with time?
* does sturdyness increases with run time?
* does time-vaults teleport in any direction uniformly or does it has a prefered direction?

# PROTOTYPES

## P1

### stage 2

* player knows how long they've been playing
* player controls with the gamepad

### stage 3

* place twisting canyon walls around a center channel
* player dies if they hit the wall
* player dies if the end of the world catches up (reaches the middle of the screen?)
* end of the world accelerates over time
* restart on death and on command

### delivery
* tweak all them parameters to a point i feel it's good.
* show time and distance travelled on prayer death
* thank player for sticking until the end

### DONE
* player knows how far the end of the world is
* player has different acceleration for x and y.
* player has a min/max speed
* end of the world moves ever forward
* camera follows the player
* player controls with the keyboard
  * up accelerates, down breaks, left/right strafes

### CUT

not ideal for a prototype:
* the player is a simple blue polygonal shape
* the end of the world is a jagged, glitchy, random, orange frontier


----

* playing field scrolls by
* player controls with the gamepad
* place canyon walls
* place bridges
* player boosts and bypasses entities
* display run time
* display time to extinction
* player always moves forward unless fueling
* player uses fuel based on speed
* display fuel
* place strips
* player refuels
* entities damage each other when colliding
* place time-vaults
* time-vaults increase extinction time if destroyed
* player controls with the keyboard
* place chasers
* chaser activates and accelerates after a delay
* chaser keeps right behind player
* place anti-air
* anti-air activates and locks at player if player is downstream and within range
* anti-air shoots at player
* anti-air deactivates when player is upstream
* bridges are un-boostable
* time-vaults teleport after a timer
* player shoots and damages non-friendly entities
* display ammo

# === DONE ===

* 2023/09/19 alt-tab away from the browser was messing up animations.
* 2023/09/15 (1.5h) getting back into it
  getting the repo cloned, reading the basics of canvas to refresh my memory, getting a bouncing square
