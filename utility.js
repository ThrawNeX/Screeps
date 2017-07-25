var utility = {

  function test() {
    console.log("TESSSST");
  }

  function getUpgradersAmount() {
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  }

  function getBuildersAmount() {
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  }

  function getHarvestersAmount() {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  }

  function spawnHarverster() {
    var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {
      role: 'harvester'
    });
  }

  function spawnBuilder() {
    var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE],
      undefined, {
        role: 'builder'
      });
  }

  function spawnUpgrader() {
    var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {
      role: 'upgraders'
    });
  }

  //Memory cleaning
  // gestorbene Creeps haben noch einen Memory dieser muss gelöscht werden
  function memoryCleaning() {
    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }

  }


};
mode.exports = utility;
