"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  meeting.init(
    {
      date: {
        type: DataTypes.DATE,
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
  return meeting;
};
