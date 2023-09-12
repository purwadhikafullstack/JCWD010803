'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      rooms.belongsTo(models.properties)
      rooms.hasOne(models.onBooking)
    }
  }
  rooms.init({
    roomNumber: {
      type : DataTypes.INTEGER,
      allowNull : false,
      unique : true
    },
    roomName: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
    },
    roomDesc: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    isDelete: {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    },
    isAvailable: {
      type : DataTypes.BOOLEAN,
      defaultValue : true
    }
  }, {
    sequelize,
    modelName: 'rooms',
  });
  return rooms;
};