//TODO: add if nothing to do fallback to upgrade or harvester


var roleSuperBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('harvest');
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('build');
    }



    if (creep.memory.building) {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, {
            visualizePathStyle: {
              stroke: '#ffffff'
            }
          });
        }
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
        if (creep.withdrawn(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
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

module.exports = roleSuperBuilder;
