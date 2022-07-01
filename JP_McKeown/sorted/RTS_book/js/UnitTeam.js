const ENEMY_START_UNITS = 15;
var enemyUnits = [];
const PLAYER_START_UNITS = 20;
var playerUnits = [];

var allUnits = [];
var unitsClearedTurn = 0;

var anyNewUnitsToClear = false;
function soonCheckUnitsToClear() {
  anyNewUnitsToClear = true;
}

function checkVictory() {
  if(playerUnits.length == 0 && enemyUnits.length == 0) {
    document.getElementById("debugText").innerHTML = "It's ... a draw ?!"; 
  } else if(playerUnits.length == 0) {
    document.getElementById("debugText").innerHTML = "Enemy team won"; 
  }
  else if(enemyUnits.length == 0) {
    document.getElementById("debugText").innerHTML = "Player team won"; 
  }
}

function addNewUnitToTeam(spawnedUnit,fightsForTeam) {
  fightsForTeam.push(spawnedUnit);
  allUnits.push(spawnedUnit);
}

function removeDeadUnitsFromList(fromArray) { ////
  for(var i=fromArray.length-1; i>=0; i--) { ////
    if(fromArray[i].isDead) { ////
      fromArray.splice(i,1); ////
    } ////
  } ////
} ////

function removeDeadUnits() { ////
  if(anyNewUnitsToClear) {
    removeDeadUnitsFromList(allUnits); ////
    removeDeadUnitsFromList(playerUnits); ////
    removeDeadUnitsFromList(enemyUnits); ////
    removeDeadUnitsFromList(selectedUnits); ////
    anyNewUnitsToClear = false;
    unitsClearedTurn++;
    console.log("Cleared " + unitsClearedTurn)
  }

} ////

function populateTeam(whichTeam,howMany,isPlayerControlled) {
  for(var i=0;i<howMany;i++) {
    var spawnUnit = new unitClass();
    spawnUnit.resetAndSetPlayerTeam(isPlayerControlled, plainSheepPic);
    addNewUnitToTeam(spawnUnit, whichTeam);
  }
}

function findClosestUnitInRange(fromX,fromY,maxRange,inUnitList) {
  var nearestUnitDist = maxRange;
  var nearestUnitFound = null;
  for(var i=0;i<inUnitList.length;i++) {
    var distTo = inUnitList[i].distFrom(fromX,fromY);
    if(distTo < nearestUnitDist) {
      nearestUnitDist = distTo;
      nearestUnitFound = inUnitList[i];
    }
  }
  return nearestUnitFound;
}