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
    }
  }
  user.init({
    firstName: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    lastName : {
      type : DataTypes.STRING
    },
    email : {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false
    },
    phoneNumber : {
      type : DataTypes.INTEGER,
      allowNull : false,
      unique : true,
    },
    gender : {
      type: DataTypes.STRING,
      allowNull : false
    },
    birthdate : {
      type: DataTypes.DATE,
      allowNull : false,
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