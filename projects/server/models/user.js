'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.roles, {foreignKey : 'roleId'});
      user.hasMany(models.codeOtp)
    }
  }
  user.init({
    firstName: {
      type : DataTypes.STRING,
    },
    lastName : {
      type : DataTypes.STRING
    },
    username:{
      type: DataTypes.STRING,
      allowNull:false
    },
    email : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false
    },
    phoneNumber : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    gender : {
      type: DataTypes.STRING
    },
    birthdate : {
      type: DataTypes.DATE
    },
    profileImg : {
      type : DataTypes.STRING
    },
    idCardImg : {
      type: DataTypes.STRING
    },
    isDelete: {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    },
    isVerified : {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    }
  }, {
    sequelize,
    modelName: 'user',
    freezeTableName : true
  });
  return user;
};