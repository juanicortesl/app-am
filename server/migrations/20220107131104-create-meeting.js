"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Meetings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startTime: {
        type: Sequelize.DATE,
      },
      endTime: {
        type: Sequelize.DATE,
      },
      hostId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
          as: "hostId",
        },
      },
      status: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      theme: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      meetingLink: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      availableSlots: {
        type: Sequelize.INTEGER,
      },
      review_comment: {
        type: Sequelize.STRING,
      },
      review_rate: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Meetings");
  },
};
