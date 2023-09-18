'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class onBooking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      onBooking.belongsTo(models.rooms)
    }
  }
  onBooking.init({
    checkIn: {
      type: DataTypes.DATE
    },
    checkOut: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'onBooking',
  });
  return onBooking;
};