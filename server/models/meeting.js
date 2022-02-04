"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

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
    static add = async (attributesToCreate) => {
      const response = await Meeting.create(attributesToCreate);
      return response;
    };

    static getAll = async (status) => {
      const response = await Meeting.findAll({
        where: {
          status: status,
        },
      });

      return response;
    };

    static getAllFromUser = async (status, userId) => {
      const response = await Meeting.findAll({
        where: {
          status: status,
          [Op.or]: {
            searcherId: userId,
            offererId: userId,
          },
        },
      });

      return response;
    };

    static getAllFromUserWithFull = async (status, userId) => {
      const response = await Meeting.findAll({
        where: {
          status: status,
          [Op.or]: {
            searcherId: userId,
            offererId: userId,
          },
        },
        include: [
          {
            association: "Offerer",
            attributes: ["interests", "first_name"],
          },
          {
            association: "Searcher",
            attributes: ["interests", "first_name"],
          },
        ],
      }).then((meetings) => {
        // get other user besides currentUser that will attend meeting
        meetings.forEach((meeting) => {
          if (meeting.dataValues.offererId == userId) {
            meeting.dataValues.other = meeting.dataValues.Searcher;
          } else {
            meeting.dataValues.other = meeting.dataValues.Offerer;
          }
          meeting.dataValues.offererId = null;
        });
        return meetings;
      });

      return response;
    };

    static getAllWithFull = async () => {
      const response = await Meeting.findAll({
        include: [
          {
            association: "Offerer",
          },
          {
            association: "Searcher",
          },
        ],
        nest: true,
      });

      return response;
    };

    static getAllAvailableWithFull = async (userId) => {
      const response = await Meeting.findAll({
        where: {
          status: "available",
          offererId: {
            [Op.ne]: userId,
          },
        },
        include: [
          {
            association: "Offerer",
          },
        ],
        nest: true,
      });

      return response;
    };

    static getById = async (id) => {
      const response = await Meeting.findOne({
        where: {
          id: id,
        },
      });

      return response;
    };

    static getByIdWithFull = async (id) => {
      const response = await Meeting.findOne({
        where: {
          id: id,
        },
        include: [
          {
            association: "Offerer",
          },
          {
            association: "Searcher",
          },
        ],
        nest: true,
      });

      return response;
    };

    static deleteById = async (id) => {
      const response = await Meeting.destroy({
        where: {
          id: id,
        },
      });

      return response;
    };

    static updateById = async (id, attributesToUpdate) => {
      const response = await Meeting.update(attributesToUpdate, {
        where: {
          id: id,
        },
        returning: true,
      });

      return response;
    };
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
