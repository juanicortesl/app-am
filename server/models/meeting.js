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
          allowNull: true,
        },
        onDelete: "cascade",
        hooks: true,
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

    static getAttendedByUserWithFull = async (status, userId) => {
      const response = await Meeting.findAll({
        where: {
          status: { [Op.ne]: "finished" },
          "$Attendees.id$": userId,
          "$Attendees->Attends.status$": { [Op.ne]: "invited" },
        },
        include: [
          {
            association: "Host",
            attributes: ["interests", "first_name"],
          },
          {
            association: "Attendees",
            attributes: ["interests", "first_name"],
          },
        ],
      }).then(async (meetings) => {
        //include test meeting
        if ([43, 67, 68, 69, 71].includes(userId)) {
          let testMeeting = await Meeting.findOne({
            where: {
              id: 47,
            },
            include: [
              {
                association: "Host",
                attributes: ["interests", "first_name"],
              },
              {
                association: "Attendees",
                attributes: ["interests", "first_name"],
              },
            ],
          });
          testMeeting.startTime = new Date();
          testMeeting.startTime.setMinutes(
            testMeeting.startTime.getMinutes() + 16
          );
          meetings.push(testMeeting);
        }
        return meetings;
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
            attributes: ["interests", "first_name"],
          },
        ],
      }).then((meetings) => {
        return meetings;
      });

      return response;
    };

    static getAllParticipatedByUserWithFull = async (status, userId) => {
      const response = await Meeting.findAll({
        where: {
          status: status,
          [Op.or]: [
            { hostId: userId },
            {
              "$Attendees.id$": userId,
              "$Attendees->Attends.status$": { [Op.ne]: "invited" },
            },
          ],
        },
        include: [
          {
            association: "Host",
            attributes: ["interests", "first_name"],
          },
          {
            association: "Attendees",
            attributes: ["interests", "first_name"],
            required: false,
          },
        ],
      }).then((meetings) => {
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
          status: {
            [Op.or]: ["available", "full"],
          },
          type: "open",
          hostId: {
            [Op.ne]: userId,
          },
          "$Attendees->Attends.attendeeId$": {
            [Op.or]: {
              [Op.ne]: userId,
              [Op.eq]: null,
            },
          },
          // "$Attendees->Attends.status$": {
          //   [Op.ne]: ["waiting-list"],
          // },
        },
        include: [
          {
            association: "Host",
            attributes: ["first_name", "description"],
          },
          {
            association: "Attendees",
            attributes: ["first_name", "description"],
          },
        ],
        nest: true,
      });

      return response;
    };

    static getAllInvitationsWithFull = async (userId) => {
      const response = await Meeting.findAll({
        where: {
          status: "available",
          hostId: {
            [Op.ne]: userId,
          },
          "$Attendees->Attends.status$": "invited",
          "$Attendees->Attends.attendeeId$": userId,
        },
        include: [
          {
            association: "Host",
            attributes: ["first_name", "description"],
          },
          {
            association: "Attendees",
            attributes: ["first_name", "description"],
          },
        ],
        nest: true,
      });

      return response;
    };

    static getAllWaitingListWithFull = async (userId) => {
      const response = await Meeting.findAll({
        where: {
          status: "available",
          hostId: {
            [Op.ne]: userId,
          },
          "$Attendees->Attends.status$": "waiting-list",
          "$Attendees->Attends.attendeeId$": userId,
        },
        include: [
          {
            association: "Host",
            attributes: ["first_name", "description"],
          },
          {
            association: "Attendees",
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

    static deleteById = async (id, userId) => {
      const response = await Meeting.destroy({
        where: {
          id: id,
          hostId: userId,
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
        allowNull: true,
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
      name: DataTypes.STRING,
      review_comment: DataTypes.STRING,
      review_rate: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Meeting",
    }
  );
  return Meeting;
};
