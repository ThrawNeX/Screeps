//TODO: add if nothing to do fallback to upgrade or harvester
var i = 0;

var roleBuilder = {

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
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[i], {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
      if (creep.harvest(sources[i] == ERR_NO_PATH)) {

        i = (i + 1) % 2;

      }
    }
  }
};

module.exports = roleBuilder;
