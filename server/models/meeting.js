"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Meeting.belongsTo(models.User, {
        as: "Offerer",
        foreignKey: {
          name: "offererId",
        },
      });
      Meeting.belongsTo(models.User, {
        as: "Searcher",
        foreignKey: {
          name: "searcherId",
        },
      });
    }
  }
  Meeting.init(
    {
      date: {
        type: "TIMESTAMP",
        allowNull: false,
        validate: {
          isAfterToday(value) {
            let today = new Date();
            let date = new Date(value);
            if (today.getTime() > date.getTime()) {
              throw new Error("BAD DATE");
            }
          },
        },
      },
      offererId: DataTypes.INTEGER,
      searcherId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      meetingLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Meeting",
    }
  );
  return Meeting;
};
