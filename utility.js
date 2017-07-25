var utility = {}

utility.getUpgradersAmount = function() {
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
}

utility.getBuildersAmount = function() {
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
}

utility.getHarvestersAmount = function() {
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
}

utility.spawnHarverster = function() {
  var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {
    role: 'harvester'
  });
}

utility.spawnBuilder = function() {
  var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE],
    undefined, {
      role: 'builder'
    });
}

utility.spawnUpgrader = function() {
  var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {
    role: 'upgraders'
  });
}

//Memory cleaning
// gestorbene Creeps haben noch einen Memory dieser muss gelöscht werden
utility.memoryCleaning = function() {
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

}

module.exports = utility;
