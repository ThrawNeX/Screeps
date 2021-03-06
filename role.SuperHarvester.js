var roleSuperHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1], {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
    } else {

      // erstellt Liste mit den Strukturen im raum
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER) &&
            structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
        }
      });


      if (targets.length > 0) {
        var target = creep.pos.findClosestByRange(targets);
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, {
            visualizePathStyle: {
              stroke: '#ffffff'
            }
          });
        }
      }
    }
  }
};

module.exports = roleSuperHarvester;
