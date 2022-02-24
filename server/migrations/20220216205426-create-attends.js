"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Attends", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      attendeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
          as: "attendeeId",
        },
        onDelete: "cascade",
      },
      meetingId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Meetings",
          key: "id",
          as: "meetingId",
        },
        onDelete: "cascade",
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
    await queryInterface.dropTable("Attends");
  },
};
