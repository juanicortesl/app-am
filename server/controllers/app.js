const { Sequelize, Op } = require("sequelize");
const User = require("../models").User;
const Meeting = require("../models").Meeting;
const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const zoomOptions = {
  access_token:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlBCTTU1c2pDUmppVUNpTFlrS1lnZ3ciLCJleHAiOjE2NDIxOTIwNzQsImlhdCI6MTY0MTU4NzI3NX0.IubNXKZ1RZq9fkGioap-lClKoI_VyV5TUdXjOmokqwo",
  token_type: "bearer",
  expires_in: 3599,
  scope: "meeting:read meeting:write",
};
// asscociations
User.hasMany(Meeting, {
  as: "offeredMeetings",
  foreignKey: {
    name: "offererId",
  },
});
User.hasMany(Meeting, {
  as: "acceptedMeetings",
  foreignKey: {
    name: "searcherId",
  },
});
Meeting.belongsTo(User, {
  as: "Offerer",
  foreignKey: {
    name: "offererId",
  },
});
Meeting.belongsTo(User, {
  as: "Searcher",
  foreignKey: {
    name: "searcherId",
  },
});
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
          attributes: ["interests", "first_name", "id", "last_name"],
        },
      ],
    })
      .then((meetings) => {
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
        console.log(start_time, "TIME");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${zoomOptions.access_token}`,
        };
        axios
          .post(
            "https://api.zoom.us/v2/users/me/meetings",

            {
              topic: "string",
              type: 2,
              start_time: start_time,
              duration: 45,
              settings: {
                join_before_host: true,
                waiting_room: false,
                meeting_invitees: [
                  { email: meeting.Offerer.email },
                  { email: meeting.Searcher.email },
                ],
                registrants_email_notification: true,
              },
            },
            { headers: headers }
          )
          .then(async function (response) {
            console.log(response.data);
            meeting.meetingLink = response.data.join_url;
            await meeting.save();
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
        meetings.forEach((meeting) => {
          console.log(meeting.dataValues.offererId, "OFFID");
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
};
