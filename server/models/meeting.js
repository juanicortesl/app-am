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
        as: "Host",
        foreignKey: {
          name: "hostId",
        },
      });
      Meeting.belongsToMany(models.User, {
        as: "Attendees",
        through: "Attends",
        foreignKey: {
          name: "meetingId",
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
            hostId: userId,
          },
        },
      });

      return response;
    };

    static getAllFromUserWithFull = async (status, userId) => {
      const response = await Meeting.findAll({
        where: {
          status: status,
          hostId: userId,
        },
        include: [
          {
            association: "Host",
            attributes: ["interests", "first_name"],
          },
          {
            association: "Attendees",
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
          hostId: {
            [Op.ne]: userId,
          },
        },
        include: [
          {
            association: "Host",
            attributes: ["first_name", "description"],
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
            association: "Host",
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
      startTime: {
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
      endTime: {
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
      hostId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      description: DataTypes.STRING,
      theme: DataTypes.STRING,
      type: DataTypes.STRING,
      availableSlots: DataTypes.INTEGER,
      meetingLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Meeting",
    }
  );
  return Meeting;
};
