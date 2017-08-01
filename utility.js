var utility = {}

utility.getUpgradersAmount = function() {
  return _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
  // return upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
}

utility.getBuildersAmount = function() {
  return _.sum(Game.creeps, (c) => c.memory.role == 'builder');
  // return builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
}

utility.getHarvestersAmount = function() {
  return _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
  // return harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
}

utility.getRepairersAmount = function() {
  return _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
  // return harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
}


utility.getExtensionAmount = function() {
  var extensionCount = 0;
  for (var roomName in Game.rooms) {
    extensionCount += Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
        filter: function(object) {
          return object.structureType === STRUCTURE_EXTENSION;
        }).length;
    }

  }
  return extensionCount;
}

utility.spawnHarverster = function() {
  console.log("New Harvester");
  var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {
    role: 'harvester'
  });
}

utility.spawnSuperHarverster = function() {
  console.log("New Harvester");
  var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, MOVE], undefined, {
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
  var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
    role: 'upgrader'
  });


}

utility.spawnRepairer = function() {
  console.log("New Repairer");
  var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {
    role: 'repairer'
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
