var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
    } else {

      // erstellt Liste mit den Strukturen im raum
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType ==
              STRUCTURE_SPAWN) &&
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

module.exports = roleHarvester;
