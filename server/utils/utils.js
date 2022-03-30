"use strict";
var schedule = require("node-schedule");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const axios = require("axios");
const User = require("../models").User;
const Meeting = require("../models").Meeting;
const meeting = require("../models/meeting");
const ical = require("ical-generator");
function getIcalObjectInstance(
  starttime,
  endtime,
  summary,
  description,
  location,
  url,
  name,
  email
) {
  const cal = ical({
    domain: "mytestwebsite.com",
    name: "My test calendar event",
  });
  cal.createEvent({
    start: starttime, // eg : moment()
    end: endtime, // eg : moment(1,'days')
    summary: summary, // 'Summary of your event'
    description: description, // 'More description'
    location: location, // 'Delhi'
    url: url, // 'event url'
    method: "REQUEST",
  });
  return cal;
}
const myOAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
myOAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
const calendarDateOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "America/Santiago",
};
const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  timeZone: "America/Santiago",
  dateStyle: "full",
  timeStyle: "short",
});

const calendarDateFormatter = new Intl.DateTimeFormat(
  "es-CL",
  calendarDateOptions
);

const myAccessToken = myOAuth2Client.getAccessToken();
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USER, //your gmail account you used to set the project up in google cloud console"
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: myAccessToken, //access token variable we defined earlier
  },
});

const sendReminderEmail = (user, other, start_time, link) => {
  console.log("sending reminder email");
  let date = new Date(start_time);
  console.log(date, "DATE");
  const mailOptions = {
    from: `Skolton <${MAIL_USER}>`, // sender
    to: user.email, // receiver
    subject: "Recordatorio de encuentro", // Subject
    html: `<h2>Hola ${user.first_name},</h2> 
    <p>Recuerda que tienes tu encuentro con ${
      other.first_name
    }  con fecha ${dateFormatter.format(
      date
    )}(Hora de Chile). El link de acceso a la reunión es: <a href="${link}">${link}</a></p>`, // html body
  };
  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
module.exports = {
  hashPassword(password, saltRounds) {
    return bcrypt.hashSync(password, saltRounds);
  },
  checkPassword(bodyPass, userPass) {
    return bcrypt.compareSync(bodyPass, userPass);
  },
  sendConfirmationEmailSearcher(offerer, searcher, start_time, link) {
    let date = new Date(start_time);
    console.log(date, "DATE");
    const mailOptions = {
      from: `Skolton <${process.env.MAIL_USER}>`, // sender
      to: searcher.email, // receiver
      subject: "Nuevo encuentro programado", // Subject
      html: `<h2>Hola ${searcher.first_name},</h2> 
      <p>tu encuentro con ${
        offerer.first_name
      } quedó programado el ${dateFormatter.format(
        date
      )} (Hora de Chile) (${calendarDateFormatter.format(
        date
      )}). El link de acceso a la reunión es: <a href="${link}">${link}</a></p>`, // html body
    };

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, function (err, result) {
        if (err) {
          console.log(err);
          reject("Couldn't send email");
        } else {
          try {
            console.log("setting reminder");
            // set reminder 30 minutes before meeting
            let reminderDate = new Date(date).setMinutes(
              date.getMinutes() - 30
            );
            // set email reminder
            // var j = schedule.scheduleJob(reminderDate, function () {
            //   try {
            //     sendReminderEmail(searcher, offerer, start_time, link);
            //   } catch {}
            // });
            resolve("Email sent");
          } catch (err) {
            reject(err);
          }
        }
      });
    });
  },
  async sendInvitationEmail(attendee, host, meeting) {
    let date = new Date(meeting.startTime);
    const calendarObj = await getIcalObjectInstance(
      meeting.startTime,
      meeting.startTime,
      meeting.name,
      meeting.description,
      "",
      "https://skolton-338519.rj.r.appspot.com",
      host.first_name,
      ""
    );
    console.log(date, "DATE");
    const mailOptions = {
      from: `Skolton <${process.env.MAIL_USER}>`, // sender
      to: attendee.email, // receiver
      subject: "Invitación a tertulia", // Subject
      html: `<h2>Hola ${attendee.first_name},</h2>
      <p>${host.first_name} te invitó a a la tertulia ${
        meeting.name
      } el ${dateFormatter.format(
        date
      )} (Hora de Chile). Puedes aceptarla desde tu <a href="https://skolton-338519.rj.r.appspot.com/#/dashboard/calendar">calendario</a></p>`, // html body
      icalEvent: {
        content: new Buffer.from(calendarObj.toString()),
        method: "REQUEST",
      },
    };

    // if (calendarObj) {
    //   let alternatives = [
    //     {
    //       contentType: "text/calendar",
    //       method: "request",
    //       content: new Buffer.from(calendarObj.toString()),
    //     },
    //   ];
    //   mailOptions["alternatives"] = alternatives;
    // }

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, function (err, result) {
        if (err) {
          console.log(err);
          reject("Couldn't send email");
        } else {
          try {
            resolve("Email sent");
          } catch (err) {
            reject(err);
          }
        }
      });
    });
  },
  async sendConfirmationEmailHost(host, meeting) {
    console.log(host, "HOST");
    let date = new Date(meeting.startTime);
    const calendarObj = await getIcalObjectInstance(
      meeting.startTime,
      meeting.startTime,
      meeting.name,
      meeting.description,
      "",
      "https://skolton-338519.rj.r.appspot.com",
      host.first_name,
      ""
    );
    console.log(date, "DATE");
    let mailOptions = {
      from: `Skolton <${process.env.MAIL_USER}>`, // sender
      to: host.email, // receiver
      subject: "Tertulia creada", // Subject
      html: `<h2>Hola ${host.first_name},</h2>
      <p>Has creado la tertulia ${meeting.name} para el ${dateFormatter.format(
        date
      )} (Hora de Chile). Puedes verla en <a href="https://skolton-338519.rj.r.appspot.com/#/dashboard/calendar">calendario Skolton</a></p>`, // html body
      icalEvent: {
        filename: "invitation.ics",
        method: "request",
        content: calendarObj.toString(),
      },
    };
    console.log(mailOptions, "MAILOPTIONS");
    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, function (err, result) {
        if (err) {
          console.log(err);
          reject("Couldn't send email");
        } else {
          try {
            resolve("Email sent");
          } catch (err) {
            reject(err);
          }
        }
      });
    });
  },
  async sendConfirmationEmailAttendee(attendee, host, meeting) {
    let date = new Date(meeting.startTime);
    const calendarObj = await getIcalObjectInstance(
      meeting.startTime,
      meeting.startTime,
      meeting.name,
      meeting.description,
      "",
      "https://skolton-338519.rj.r.appspot.com",
      host.first_name,
      ""
    );
    console.log(date, "DATE");
    let mailOptions = {
      from: `Skolton <${process.env.MAIL_USER}>`, // sender
      to: attendee.email, // receiver
      subject: "Tertulia en tu calendario", // Subject
      html: `<h2>Hola ${attendee.first_name},</h2>
      <p>Has aceptado participar de la tertulia ${meeting.name} de ${
        host.first_name
      } el ${dateFormatter.format(
        date
      )} (Hora de Chile). Puedes desistir desde tu <a href="https://skolton-338519.rj.r.appspot.com/#/dashboard/calendar">calendario</a></p>`, // html body
      icalEvent: {
        filename: "invitation.ics",
        method: "request",
        content: calendarObj.toString(),
      },
    };

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, function (err, result) {
        if (err) {
          console.log(err);
          reject("Couldn't send email");
        } else {
          try {
            resolve("Email sent");
          } catch (err) {
            reject(err);
          }
        }
      });
    });
  },
  sendConfirmationEmailOfferer(offerer, searcher, start_time, link) {
    let date = new Date(start_time);
    console.log(date, "DATE");
    const mailOptions = {
      from: `Skolton <${MAIL_USER}>`, // sender
      to: offerer.email, // receiver
      subject: "Nuevo encuentro programado", // Subject
      html: `<h2>Hola ${offerer.first_name},</h2>
      <p>${
        searcher.first_name
      } aceptó tu encuentro y quedó programado el ${dateFormatter.format(
        date
      )} (Hora de Chile). El link de acceso a la reunión es: <a href="${link}">${link}</a></p>`, // html body
    };

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, function (err, result) {
        if (err) {
          console.log(err);
          reject("Couldn't send email");
        } else {
          try {
            console.log("setting reminder");
            // set reminder 30 minutes before meeting
            let reminderDate = new Date(date);
            reminderDate.setMinutes(date.getMinutes() - 30);
            // set email reminder
            // var j = schedule.scheduleJob(reminderDate, function () {
            //   try {
            //     sendReminderEmail(offerer, searcher, start_time, link);
            //   } catch {}
            // });
            resolve("Email sent");
          } catch (err) {
            reject(err);
          }
        }
      });
    });
  },
  scheduleJobsOnInit() {
    let date = new Date();
    Meeting.findAll({
      where: {
        status: "requested",
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
    }).then((meetings) => {
      meetings.forEach((meeting) => {
        let meetingDate = new Date(meeting.dataValues.date);
        console.log(meetingDate, "MEETINGDATE");
        // if meeting hasn't happened, set reminder email
        if (meetingDate.getTime() > date.getTime()) {
          // set reminder 30 minutes before meeting
          let reminderDate = new Date(meetingDate);
          reminderDate.setMinutes(meetingDate.getMinutes() - 30);
          console.log(reminderDate, "REMINDERDATE");
          var j = schedule.scheduleJob(reminderDate, function () {
            try {
              sendReminderEmail(
                meeting.dataValues.Searcher.dataValues,
                meeting.dataValues.Offerer.dataValues,
                meetingDate,
                meeting.dataValues.meetingLink
              );
              sendReminderEmail(
                meeting.dataValues.Offerer.dataValues,
                meeting.dataValues.Searcher.dataValues,
                meetingDate,
                meeting.dataValues.meetingLink
              );
            } catch {}
          });
        }
        // in other case, set meeting as finished
        else {
          try {
            meeting.update({ status: "finished" });
            meeting.save();
          } catch {}
        }
      });
    });
  },
  createMeetingLink(meeting) {
    let start_time = new Date(meeting.date).toISOString();
    console.log(start_time, "TIME");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${zoomOptions.access_token}`,
    };
    return axios.post(
      "https://api.zoom.us/v2/users/me/meetings",

      {
        topic: "string",
        type: 2,
        start_time: start_time,
        duration: 45,
        settings: {
          join_before_host: true,
          waiting_room: false,
          meeting_invitees: [{ email: meeting.Offerer.email }],
          registrants_email_notification: true,
          jbh_time: 10,
        },
      },
      { headers: headers }
    );
  },
};
