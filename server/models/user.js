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
    }
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
      interests: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
