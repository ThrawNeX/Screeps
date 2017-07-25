var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var utility = require('utility');

// Main Loop
module.exports.loop = function() {

  // Spawn Control

  //TODO: get Methoden haben keinen return type
  if (utility.getHarvestersAmount() < 5) {
    utility.spawnHarverster();
    console.log("New Harvester");
  } else if (utility.getBuildersAmount() < 1) {
    utility.spawnUpgrader();
    console.log("New Upgrader");
  } else if (utility.getUpgradersAmount() < 1) {
    utility.spawnBuilder();
    console.log("New Builder");
  }

  //Sorgt dafür das Creeps agieren.
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }

    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }

    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
  }



  //Spawn Nachricht - unnötig?
  if (Game.spawns['Spawn1'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.role,
      Game.spawns['Spawn1'].pos.x + 1,
      Game.spawns['Spawn1'].pos.y, {
        align: 'left',
        opacity: 0.8
      });
  }

  utility.garbageCollecting();

}
