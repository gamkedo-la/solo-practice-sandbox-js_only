const PLAYER_START_UNITS = 20;
const ENEMY_START_UNITS = 15;

const FORMATION_FUDGE = 2;

let selectedUnits = [];
let playerUnits = [];
let enemyUnits = [];
let allUnits = [];

let deleteCount = 0;
let anyUnitsToDelete = false;
function soonCheckUnitsToDelete() {
    anyUnitsToDelete = true;
}

function handleVictory() {
    if(playerUnits.length == 0 && enemyUnits.length ==0) {
        showText('Mutual destruction');
    } else if(playerUnits.length == 0) {
        showText('Enemy team won');
    } else if(enemyUnits.length == 0) {
        showText('Player team won');
    }
}

function addNewUnitToTeam(spawnedUnit, fightsForTeam) {
    fightsForTeam.push(spawnedUnit);
    allUnits.push(spawnedUnit);
}

function findClosestUnitInRange(fromX, fromY, maxRange, inUnitList) {
    var nearestUnitDistance = maxRange;
    var nearestUnitFound = null;
    for(var i=0; i < inUnitList.length; i++) {
        var distanceTo = inUnitList[i].distanceFrom(fromX, fromY);
        if(distanceTo < nearestUnitDistance) {
            nearestUnitDistance = distanceTo;
            nearestUnitFound = inUnitList[i];
        }
    }
    return nearestUnitFound;
}

function populateTeam(whichTeam, howMany, isItPlayerControlled) {
    for(var i=0; i<howMany; i++) {
        var spawnUnit = new unitClass();
        spawnUnit.reset(isItPlayerControlled);
        addNewUnitToTeam(spawnUnit, whichTeam);
    }
}

function deleteDeadUnitsFromList(fromArray) {
    for(var i=fromArray.length-1; i>=0; i--) {
        if(fromArray[i].isDead) {
            fromArray.splice(i, 1);
        }
    }
}

function deleteDeadUnits() {
    if(anyUnitsToDelete) {
        deleteDeadUnitsFromList(allUnits);
        deleteDeadUnitsFromList(playerUnits);
        deleteDeadUnitsFromList(enemyUnits);
        deleteDeadUnitsFromList(selectedUnits);
        // deleteCount++;
        // console.log('Deleted ' + deleteCount);
    }
    anyUnitsToDelete = false;
}