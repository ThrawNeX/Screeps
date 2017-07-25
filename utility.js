var utility = {}

utility.getUpgradersAmount = function() {
  return upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgraders');
}

utility.getBuildersAmount = function() {
  return builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
}

utility.getHarvestersAmount = function() {
  return harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
}

utility.spawnHarverster = function() {
  console.log("New Harvester");
  var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {
    role: 'harvester'
  });
}

utility.spawnBuilder = function() {
  console.log("New Builder");
  var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE],
    undefined, {
      role: 'builder'
    });
}

utility.spawnUpgrader = function() {
  console.log("New Upgrader");
  var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {
    role: 'upgraders'
  });
}

//Memory cleaning
// gestorbene Creeps haben noch einen Memory dieser muss gelöscht werden
utility.garbageCollecting = function() {
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

}

module.exports = utility;
