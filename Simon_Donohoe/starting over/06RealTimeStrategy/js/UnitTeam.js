const PLAYER_START_UNITS = 20;
let playerUnits = []; // declaring an array
const ENEMY_START_UNITS = 15;
let enemyUnits = [];

let allUnits = [];

// helper functions

function addNewUnitToTeam(spawnedUnit, fightsForTeam) {
  fightsForTeam.push(spawnedUnit);
  allUnits.push(spawnedUnit);
}

function populateTeam(whichTeam, howMany, isPlayerControlled) {
  for(let i = 0; i < howMany; i++) {
    let spawnUnit = new unitClass();
    spawnUnit.resetAndSetPlayerTeam(isPlayerControlled);
    addNewUnitToTeam(spawnUnit, whichTeam);
  }
}

function findClosestUnitInRange(fromX, fromY, maxRange, inUnitList) {
  let nearestUnitDist = maxRange;
  let nearestUnitFound = null;

  for(let i = 0; i < inUnitList.length; i++) {
    let distTo = inUnitList[i].distFrom(fromX, fromY);
    if(distTo < nearestUnitDist) {
      nearestUnitDist = distTo;
      nearestUnitFound = inUnitList[i];
    }
  }
  return nearestUnitFound;
}