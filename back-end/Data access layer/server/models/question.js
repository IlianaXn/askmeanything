'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsTo(models.User, {as:'Author',foreignKey: { name: 'author', allowNull: false}});
      Question.belongsToMany(models.Keyword,{
        through: models.Question_Keyword,
        foreignKey: 'questionId'
      })
      Question.hasMany(models.Answer, {foreignKey:{ name: 'questionId', allowNull: false}})
    }
  };
  Question.init({
    title: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate: {
        isAlphanumeric: true
      }
    },
    body: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate: {
        isAlphanumeric: true
      }
    },
    createdAt:{
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter(value) {
          if (Date.parse(value) < Date.parse(this.createdAt)) {
            throw new Error('UpdatedAt should not be earlier than CreatedAt');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};