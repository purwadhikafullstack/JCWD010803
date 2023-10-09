'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roomRules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      roomRules.belongsTo(models.rooms);
    }
  }
  roomRules.init({
    rules: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roomRules',
  });
  return roomRules;
};