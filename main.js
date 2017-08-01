var roleHarvester = require('role.harvester');
var roleSuperHarvester = require('role.SuperHarvester');
var roleUpgrader = require('role.upgrader');
var roleSuperUpgrader = require('role.SuperUpgrader');
var roleBuilder = require('role.builder');
var roleSuperBuilder = require('role.SuperBuilder');
var roleRepairer = require('role.repairer');
var roleSuperRepairer = require('role.SuperRepairer');
var utility = require('utility');


// Main Loop
module.exports.loop = function() {

  // Spawn Control


  if (utility.getExtensionAmount < 4) {
    // Phase 1


    console.log("Upgrader: " + utility.getUpgradersAmount());
    console.log("Harvester: " + utility.getHarvestersAmount());
    console.log("Repairer: " + utility.getRepairersAmount());
    console.log("Builder: " + utility.getBuildersAmount());

    //Spawn logic phase 1
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

    console.log("SuperUpgrader: " + utility.getSuperUpgraderAmount());
    console.log("Harvester: " + utility.getHarvestersAmount());
    console.log("SuperHarvester: " + utility.getSuperHarvesterAmount());
    console.log("SuperRepairer: " + utility.getSuperRepairersAmount());
    console.log("SuperBuilder: " + utility.getSuperBuilderAmount());


    //Spawn logic phase 1
    if (utility.getSuperHarvesterAmount() < 2) {
      utility.spawnSuperHarverster();
    } else if (utility.getHarvestersAmount() < 3)
      utility.spawnHarverster();
    else if (utility.getSuperUpgraderAmount() < 5) {
      utility.spawnSuperUpgrader();
    } else if (utility.getSuperBuilderAmount() < 3) {
      utility.spawnSuperBuilder();
    } else if (utility.getSuperRepairersAmount() < 2) {
      utility.spawnSuperRepairer();
    }

  }



  //Sorgt dafür das Creeps agieren.
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }

    if (creep.memory.role == 'SuperHarvester') {
      roleSuperHarvester.run(creep);
    }

    if (creep.memory.role == 'SuperUpgrader') {
      roleSuperUpgrader.run(creep);
    }

    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }

    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }

    if (creep.memory.role == 'SuperBuilder') {
      roleSuperBuilder.run(creep);
    }

    if (creep.memory.role == 'repairer') {
      roleRepairer.run(creep);
    }

    if (creep.memory.role == 'SuperRepairer') {
      roleSuperRepairer.run(creep);
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
