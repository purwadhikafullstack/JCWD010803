'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roomImg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      roomImg.belongsTo(models.rooms)
    }
  }
  roomImg.init({
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roomImg',
  });
  return roomImg;
};