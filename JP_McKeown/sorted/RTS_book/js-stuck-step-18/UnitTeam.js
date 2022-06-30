
function addNewUnitToTeam(spawnedUnit, fightsForTeam) {
  fightsForTeam.push(spawnedUnit);
  allUnits.push(spawnedUnit);
}

function findClosestUnitInRange(fromX, fromY, maxRange, inUnitList) {
  var nearestUnitDist = maxRange;
  var nearestUnitFound = null;
  for(var i=0; i<inUnitList.length; i++) {
    var distTo = inUnitList[i].distFrom(fromX, fromY);
    if(distTo < nearestUnitDist) {
      nearestUnitDist = distTo;
      nearestUnitFound = inUnitList[i];
    }
  }
  return nearestUnitFound;
}

function populateTeam(whichTeam, howMany, isPlayerControlled) {
  for(var i=0; i<howMany; i++) {
    var spawnUnit = new unitClass();
    spawnUnit.resetAndSetPlayerTeam(isPlayerControlled);
    addNewUnitToTeam(spawnUnit, whichTeam);
  }
}

function deleteDeadUnitsFromList(fromArray) {
  for(var i = fromArray.length-1; i >= 0; i--) {
    if(fromArray[i].isDead) {
      fromArray.splice[i,1];
    }
  }
}

function deleteDeadUnits() {
  console.log('deleting');
  deleteDeadUnitsFromList(selectedUnits);
  deleteDeadUnitsFromList(allUnits);
  deleteDeadUnitsFromList(playerUnits);
  deleteDeadUnitsFromList(enemyUnits);
}