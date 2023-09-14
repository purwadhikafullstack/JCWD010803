"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class properties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      properties.belongsTo(models.user);
      properties.belongsTo(models.categories);
      properties.hasOne(models.rooms);
    }
  }
  properties.init(
    {
      propertyName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      propertyDesc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      propertyImg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "properties",
    }
  );
  return properties;
};
