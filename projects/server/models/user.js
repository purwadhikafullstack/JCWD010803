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
      user.hasMany(models.categories)
      
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
    },
    phoneNumber : {
      type : DataTypes.STRING,
    },
    gender : {
      type: DataTypes.STRING,
      // allowNull : false
    },
    birthdate : {
      type: DataTypes.DATE,
      // allowNull : false,
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
    },
    flag : {
      type : DataTypes.INTEGER,
    },
    verifiedCount : {
      type : DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'user',
    freezeTableName : true
  });
  return user;
};