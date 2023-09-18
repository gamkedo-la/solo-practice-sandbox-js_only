# design notes

* simple, flat-colored geometrical shapes
* using extra fuel it's possible to fly over obstacles
* the world is ending, you only have so much time to... do stuff?
* time attack: how long do you last


## key points i want to keep

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

## maybe not really needed after all

* player shoots 
* structures have HP according to their sturdiness
* structures damage colliders according to their sturdiness

* anti-air: moves sideways, fragile, aggressive downstream, non-aggressive upstream
  * tracks plane and predicts path
  * drops ammo

* time vaults teleport after a while

## questions

* does player accelerating move them to the bottom of the screen and slowing down move them to the middle of the screen confuses?
* does player sideways movement reduces velocity?
* does player needs to slow down to refuel?
* does player needs to slow down to pick up ammo?
* does the minimum speed increases with time?
* does sturdyness increases with run time?
* does time-vaults teleport in any direction uniformly or does it has a prefered direction?

# TASKS

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

* 2023/09/15 (1.5h) getting back into it
  getting the repo cloned, reading the basics of canvas to refresh my memory, getting a bouncing square

# === CUT ===
