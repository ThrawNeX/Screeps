var roleHarvester = require('role.harvester');
var roleSuperHarvester = require('role.SuperHarvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var utility = require('utility');


// Main Loop
module.exports.loop = function() {

  // Spawn Control


  if (utility.getExtensionAmount < 4) {
    // Phase 1
    if (utility.getHarvestersAmount() < 2) {
      utility.spawnHarverster();
    } else if (utility.getUpgradersAmount() < 5) {
      utility.spawnUpgrader();
    } else if (utility.getBuildersAmount() < 7) {
      utility.spawnBuilder();
    } else if (utility.getRepairersAmount() < 2) {
      utility.spawnRepairer();
    }

  } else {
    //Mind. 4 Extensions.
    console.log("Phase 2");
    if (utility.getSuperHarvestersAmount() < 2) {
      utility.spawnSuperHarverster();
    } else if (utility.getHarvestersAmount() < 4)
      utility.spawnHarverster();
    else if (utility.getSuperUpgradersAmount() < 5) {
      utility.spawnSuperUpgrader();
    } else if (utility.getSuperBuildersAmount() < 3) {
      utility.spawnSuperBuilder();
    } else if (utility.getSuperRepairersAmount() < 2) {
      utility.spawnSuperRepairer();
    }

  }

  console.log("Upgrader: " + utility.getUpgradersAmount());
  console.log("Harvester: " + utility.getHarvestersAmount());
  console.log("Repairer: " + utility.getRepairersAmount());
  console.log("Builder: " + utility.getBuildersAmount());

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

    if (creep.memory.role == 'repairer') {
      roleRepairer.run(creep);
    }
  }



  //Spawn Nachricht - unnötig?
  if (Game.spawns['Spawn1'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(spawningCreep.memory.role,
      Game.spawns['Spawn1'].pos.x + 1,
      Game.spawns['Spawn1'].pos.y, {
        align: 'left',
        opacity: 0.8
      });
  }

  utility.garbageCollecting();

}
