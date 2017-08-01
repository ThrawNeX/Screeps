var roleUpgrader = {



  //TODO: Soll Energie aus Container holen.

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.upgrading == true && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('harvest');
    }
    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('upgrade');
    }

    if (creep.memory.upgrading == true) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
      }
    } else {
      var structures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER) &&
            structure.store[RESOURCE_ENERGY] > 0;
        }
      });

      if (structures.length > 0) {
        var target = creep.pos.findClosestByRange(structures);
        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, {
            visualizePathStyle: {
              stroke: '#ffaa00'
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
  }
};

module.exports = roleUpgrader;
