'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      review.belongsTo(models.userTransactions);
      review.belongsTo(models.rooms);
    }
  }
  review.init({
    userReview : {
      type : DataTypes.TEXT('long')
    }
  }, {
    sequelize,
    modelName: 'review',
    timestamps: true,
    updatedAt : false,
    freezeTableName : true


  });
  return review;
};