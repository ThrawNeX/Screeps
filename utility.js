var utility = {

  function getUpgradersAmount() {
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  }

  function getBuildersAmount() {
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  }

  function getHarvestersAmount() {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  }

}



mode.exports = utility;
