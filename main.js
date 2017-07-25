var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');


module.exports.loop = function() {

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

  //Methoden Stack
  test();



  //TODO: Sicherstellen das zuerst Harvester spawnen
  spawnControlHarvester();
  spawnControlUpgrader();
  spawnControlBuilder();
  memoryCleaning();


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


}


function test() {
  console.log("asdf");


}


//Sicherstellen das es immer 2 Harvester gibt
function spawnControlHarvester() {
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role ==
    'harvester');
  if (harvesters.length < 2) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE],
      undefined, {
        role: 'harvester'
      });
    console.log('Spawning new harvester: ' + newName);
  }
}

//Sicherstellen das es immer einen Upgrader gibt.
function spawnControlUpgrader() {
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role ==
    'upgrader');
  if (upgraders.length < 1) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE],
      undefined, {
        role: 'upgraders'
      });
    console.log('Spawning new upgraders: ' + newName);
  }
}

//Sicherstellen das es immer einen Builder gibt.
function spawnControlBuilder() {
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role ==
    'builder');
  if (builders.length < 1) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE],
      undefined, {
        role: 'builder'
      });
    console.log('Spawning new Builder: ' + newName);
  }
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
