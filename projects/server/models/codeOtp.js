'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class codeOtp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      codeOtp.belongsTo(models.user)
    }
  }
  codeOtp.init({
    otp: {
      type: DataTypes.STRING,
      unique: true
    },
    expiredDate: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'codeOtp',
    freezeTableName : true
  });
  return codeOtp;
};