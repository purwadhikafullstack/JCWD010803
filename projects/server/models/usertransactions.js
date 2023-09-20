"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userTransactions.belongsTo(models.user);
      userTransactions.belongsTo(models.rooms);
      userTransactions.belongsTo(models.paymentMethode);
    }
  }
  userTransactions.init(
    {
      paymentImg: {
        type: DataTypes.STRING
      },
      isConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isRejected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    },
    {
      sequelize,
      modelName: "userTransactions",
      freezeTableName: true,
    }
  );
  return userTransactions;
};
