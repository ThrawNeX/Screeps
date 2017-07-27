var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.upgrading == true && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('harvest');
    }
    if (creep.memory.upgrading == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('upgrade');
    }

    if (creep.memory.upgrading == true) {
      var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION || s.structureType ==
          STRUCTURE_TOWER) && s.energy < s.energyCapacity
      });


    }



    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
      }
    } else {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
    }
  }
};

module.exports = roleUpgrader;
