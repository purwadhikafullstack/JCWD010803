'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userTransactions.belongsTo(models.user)
      userTransactions.belongsTo(models.rooms)
      userTransactions.belongsTo(models.paymentMethode)
      userTransactions.belongsTo(models.status)
    }
  }
  userTransactions.init({
    paymentImg: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'userTransactions',
  });
  return userTransactions;
};