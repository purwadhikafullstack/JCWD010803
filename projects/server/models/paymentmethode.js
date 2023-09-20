"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class paymentMethode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  paymentMethode.init(
    {
      methode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "paymentMethode",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return paymentMethode;
};
