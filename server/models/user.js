"use strict";
const { Model, DATEONLY } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Meeting, {
        as: "offeredMeetings",
        foreignKey: {
          name: "offererId",
        },
      });
      User.hasMany(models.Meeting, {
        as: "acceptedMeetings",
        foreignKey: {
          name: "searcherId",
        },
      });
    }
    static add = async (attributesToCreate) => {
      console.log("ATTRIBIUTE", attributesToCreate);
      const response = await User.create(attributesToCreate);
      return response;
    };

    static getAll = async () => {
      const response = await User.findAll({});

      return response;
    };

    static getAllWithFull = async () => {
      const response = await User.findAll({
        include: [
          {
            association: "offeredMeetings",
          },
          {
            association: "acceptedMeetings",
          },
        ],
        nest: true,
      });

      return response;
    };

    static getByEmail = async (email) => {
      const response = await User.findOne({
        where: {
          email: email,
        },
      });

      return response;
    };

    static getById = async (id) => {
      const response = await User.findOne({
        where: {
          id: id,
        },
      });

      return response;
    };

    static getByIdWithFull = async (id) => {
      const response = await User.findOne({
        where: {
          id: id,
        },
        include: [
          {
            association: "offeredMeetings",
          },
          {
            association: "acceptedMeetings",
          },
        ],
        nest: true,
      });

      return response;
    };

    static deleteById = async (id) => {
      const response = await User.destroy({
        where: {
          id: id,
        },
      });

      return response;
    };

    static updateById = async (id, attributesToUpdate) => {
      console.log("ID", id);
      console.log("ATTRIBUTES", attributesToUpdate);
      const response = await User.update(attributesToUpdate, {
        where: {
          id: id,
        },
        returning: true,
      });

      return response;
    };
  }
  User.init(
    {
      first_name: { type: DataTypes.STRING },
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      type: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      gender: DataTypes.STRING,
      description: DataTypes.STRING,
      interests: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
