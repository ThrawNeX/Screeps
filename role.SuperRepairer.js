//TODO: Add if nothin to repair fallback to builder


var roleSuperRepairer = {

  /** @param {Creep} creep **/
  run: function(creep) {

    // Keine Energie deshalb farmen
    if (creep.memory.repair == true && creep.carry.energy == 0) {
      creep.memory.repair = false;
      creep.say('harvest');
    }

    //Energie voll - deshalb umschalten auf Reparieren
    if (!creep.memory.repair && creep.carry.energy == creep.carryCapacity) {
      creep.memory.repair = true;
      creep.say('repair');
    }

    //Wenn repair true
    if (creep.memory.repair) {

      //nächstes Ziel finden
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
      });


      if (targets.length > 0) {
        var target = creep.pos.findClosestByRange(targets);
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
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
            structure.energy > 0;
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
}
};

module.exports = roleSuperRepairer;
