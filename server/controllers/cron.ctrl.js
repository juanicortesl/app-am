const { Sequelize, Op } = require("sequelize");
const User = require("../models").User;
const Meeting = require("../models").Meeting;
const utils = require("../utils/utils");

module.exports = {
  sendReminderEmails(req, res) {
    {
      let now = new Date();
      let hourLater = new Date();
      hourLater.setHours(hourLater.getHours() + 1);
      Meeting.findAll({
        where: {
          status: "requested",
          date: {
            [Op.gt]: now.toLocaleString(),
            [Op.lte]: now.toLocaleString(),
          },
        },
        include: [
          {
            association: "Offerer",
            attributes: ["interests", "first_name", "email"],
          },
          {
            association: "Searcher",
            attributes: ["interests", "first_name", "email"],
          },
        ],
      })
        .then((meetings) => {
          console.log("MADE IT HERE");
          console.log(meetings, "MEETINGS");
          meetings.forEach((meeting) => {
            let meetingDate = new Date(meeting.dataValues.date);
            console.log(meetingDate, "MEETINGDATE");
            // if meeting hasn't happened, set reminder email
            if (meetingDate.getTime() > date.getTime()) {
              // set reminder 30 minutes before meeting
              let reminderDate = new Date(meetingDate);
              reminderDate.setMinutes(meetingDate.getMinutes() - 30);
              console.log(reminderDate, "REMINDERDATE");
              // var j = schedule.scheduleJob(reminderDate, function () {
              //   try {
              //     sendReminderEmail(
              //       meeting.dataValues.Searcher.dataValues,
              //       meeting.dataValues.Offerer.dataValues,
              //       meetingDate,
              //       meeting.dataValues.meetingLink
              //     );
              //     sendReminderEmail(
              //       meeting.dataValues.Offerer.dataValues,
              //       meeting.dataValues.Searcher.dataValues,
              //       meetingDate,
              //       meeting.dataValues.meetingLink
              //     );
              //   } catch {}
              // });
            }
            // in other case, set meeting as finished
            else {
              try {
                meeting.update({ status: "finished" });
                meeting.save();
              } catch (error) {
                throw error;
              }
            }
          });
          return res.status(200).send({ message: "sent emails" });
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).send(error);
        });
    }
  },
};
