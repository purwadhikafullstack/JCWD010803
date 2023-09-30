"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class onBooking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      onBooking.belongsTo(models.rooms)
      onBooking.belongsTo(models.user)
      onBooking.belongsTo(models.userTransactions)
    }
  }
  onBooking.init(
    {
      checkIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checkOut: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isCanceled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "onBooking",
      freezeTableName : true
    }
  );
  return onBooking;
};
