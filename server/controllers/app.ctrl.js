const { Sequelize, Op } = require("sequelize");
const User = require("../models").User;
const Meeting = require("../models").Meeting;
const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const axios = require("axios");

// associations

// set job schedules
// utils.scheduleJobsOnInit();

module.exports = {
  signUp(req, res) {
    console.log(req.body);
    return User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      address: req.body.address,
      gender: req.body.gender,
      birth_date: req.body.birth_date,
      type: "user",
      password: utils.hashPassword(req.body.password),
    })
      .then((user) => {
        console.log(process.env.SEED);
        let token = jwt.sign(
          {
            user: {
              id: user.id,
            },
          },
          process.env.SEED,
          { expiresIn: process.env.TIME_TOKEN }
        );
        console.log(user);
        res.status(200).send({ userEmail: user.email, token: token });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  signIn(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        let checkPass = utils.checkPassword(req.body.password, user.password);
        if (checkPass) {
          let token = jwt.sign(
            {
              user: {
                id: user.id,
              },
            },
            process.env.SEED,
            { expiresIn: process.env.TIME_TOKEN }
          );
          res
            .status(200)
            .send({ userEmail: user.email, token: token, userType: user.type });
        } else {
          return res.status(403).send({ message: "wrong password" });
        }
      })
      .catch((error) => res.status(400).send(error));
  },
  setType(req, res) {
    allowedTypes = ["searcher", "offerer"];
    const user = User.update(
      {
        type: allowedTypes.includes(req.body.type) ? req.body.type : undefined,
      },
      {
        returning: true,
        where: { id: req.user.id },
      }
    )
      .then((user) => {
        res.status(200).send({ message: "SET TYPE" });
      })
      .catch((error) => res.status(400).send(error));
  },
  setInterests(req, res) {
    const user = User.update(
      {
        interests: req.body.interests ? req.body.interests : undefined,
      },
      {
        returning: true,
        where: { id: req.user.id },
      }
    )
      .then((user) => {
        res.status(200).send({ message: "SET INTERESTS" });
      })
      .catch((error) => res.status(400).send(error));
  },
  addAvailableMeeting(req, res) {
    const meeting = Meeting.create({
      status: "available",
      offererId: req.user.id,
      date: req.body.date,
    })
      .then((meeting) => {
        res.status(200).send({ message: "ADDED MEETING" });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  getAvailableMeetings(req, res) {
    Meeting.findAll({
      where: {
        status: "available",
        offererId: {
          [Op.ne]: req.user.id,
        },
      },
      include: [
        {
          association: "Offerer",
          attributes: [
            "interests",
            "first_name",
            "id",
            "last_name",
            "birth_date",
          ],
        },
      ],
    })
      .then(async (meetings) => {
        const user = await User.findOne({
          where: {
            id: req.user.id,
          },
        });
        const today = new moment();
        const birthDate = new moment(user.dataValues.birth_date);
        const age = today.diff(birthDate, "years");
        const ageThreshold = 55;
        // if user is less than 55 y.o. show only meetings of users older than 55
        if (age < ageThreshold) {
          console.log("FILTERING");
          meetings = meetings.filter((meeting) => {
            console.log(meeting.dataValues.Offerer);
            let offererBirthDate = new moment(
              meeting.dataValues.Offerer.dataValues.birth_date
            );
            let offererAge = today.diff(offererBirthDate, "years");
            console.log("OFFERER AGE", offererAge);
            return offererAge >= ageThreshold;
          });
        }

        res.status(200).send({ message: "got meetings", meetings: meetings });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  meetingRequest(req, res) {
    Meeting.update(
      { status: "requested", searcherId: req.user.id },
      {
        where: {
          id: req.body.meetingId,
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
        returning: true,
        plain: true,
      }
    )
      .then(async (result) => {
        const meeting = await Meeting.findOne({
          where: {
            id: req.body.meetingId,
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
        });
        if (!meeting) {
          throw Error(`no meeting`);
        }
        console.log(`Bearer ${zoomOptions.access_token}`);
        let start_time = new Date(meeting.date).toISOString();
        utils
          .createMeetingLink(start_time, meeting)
          .then(async function (response) {
            console.log(response.data);
            meeting.meetingLink = response.data.join_url;
            await meeting.save();
            await utils.sendConfirmationEmailSearcher(
              meeting.Offerer,
              meeting.Searcher,
              start_time,
              response.data.join_url
            );
            await utils.sendConfirmationEmailOfferer(
              meeting.Offerer,
              meeting.Searcher,
              start_time,
              response.data.join_url
            );
            res.status(200).send({ message: "requested meeting" });
          })
          .catch(function (error) {
            console.log(error);
            throw Error(error);
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  async getOfferedMeetings(req, res) {
    Meeting.findAll({
      where: {
        offererId: req.user.id,
        status: "available",
      },
      attributes: ["date"],
    })
      .then((meetings) =>
        res.status(200).send({ message: "offered meetinngs", meetings })
      )
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  async getRequestedMeetings(req, res) {
    // const user = await User.findOne({
    //   where: {
    //     id: req.user.id,
    //   },
    // });
    // console.log(user.type, "type");
    // if (user.type === "user")
    console.log(req.user.id, "ID");
    Meeting.findAll({
      where: {
        [Op.or]: {
          searcherId: req.user.id,
          offererId: req.user.id,
        },
        status: "requested",
      },
      attributes: ["date", "meetingLink", "offererId"],
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
    })
      .then((meetings) => {
        // get other user besides currentUser that will attend meeting
        meetings.forEach((meeting) => {
          if (meeting.dataValues.offererId == req.user.id) {
            meeting.dataValues.other = meeting.dataValues.Searcher;
          } else {
            meeting.dataValues.other = meeting.dataValues.Offerer;
          }
          meeting.dataValues.offererId = null;
        });
        res.status(200).send({ message: "requested meetings", meetings });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  getPastMeetings(req, res) {
    Meeting.findAll({
      where: {
        [Op.or]: {
          searcherId: req.user.id,
          offererId: req.user.id,
        },
        status: "finished",
      },
      attributes: ["date", "meetingLink", "offererId"],
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
    })
      .then((meetings) => {
        meetings.forEach((meeting) => {
          if (meeting.dataValues.offererId == req.user.id) {
            meeting.dataValues.other = meeting.dataValues.Searcher;
          } else {
            meeting.dataValues.other = meeting.dataValues.Offerer;
          }
          meeting.dataValues.offererId = null;
        });
        res.status(200).send({ message: "past meetings", meetings });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
};
