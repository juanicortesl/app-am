"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static add = async (attributesToCreate) => {
      const response = await Attends.create(attributesToCreate);
      return response;
    };
  }
  Attends.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      attendeeId: DataTypes.INTEGER,
      meetingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Attends",
    }
  );
  return Attends;
};
