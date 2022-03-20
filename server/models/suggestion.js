"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suggestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Suggestion.belongsTo(models.User, {
        as: "User",
        foreignKey: {
          name: "userId",
        },
      });
    }

    static async add(attributesToCreate) {
      const response = await Suggestion.create(attributesToCreate);
      return response;
    }
  }
  Suggestion.init(
    {
      text: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Suggestion",
    }
  );
  return Suggestion;
};
