"use strict";
var schedule = require("node-schedule");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const CLIENT_ID =
  "426308237351-emj2g05ff5vb0qsdhnn0g4fkvca1n8vl.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN =
  "1//04GS14sJU4Z6uCgYIARAAGAQSNwF-L9IrklpV1p4zZ0LlkyTdnw4apw1DWtpb-kIiMDPbElmDYPTL1I0FQFslsDVLDDyV9dv5CXU";
const MAIL_USER = "condor.softdev@gmail.com";

const myOAuth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
myOAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const myAccessToken = myOAuth2Client.getAccessToken();
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: MAIL_USER, //your gmail account you used to set the project up in google cloud console"
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: myAccessToken, //access token variable we defined earlier
  },
});

var date = new Date();
date.setSeconds(date.getSeconds() + 10);
var j = schedule.scheduleJob(date, function () {
  try {
    sendReminderEmail({ email: "jicortes6@uc.cl" }, {}, date, "");
  } catch {}
});
console.log(schedule.scheduledJobs);

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
    }  el ${date.toLocaleDateString(
      "es-CL",
      dateOptions
    )}. El link de acceso a la reunión es: <a href="${link}">${link}</a></p>`, // html body
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
      from: `Skolton <${MAIL_USER}>`, // sender
      to: searcher.email, // receiver
      subject: "Nuevo encuentro programado", // Subject
      html: `<h2>Hola ${searcher.first_name},</h2> 
      <p>tu encuentro con ${
        offerer.first_name
      } quedó programado el ${date.toLocaleDateString(
        "es-CL",
        dateOptions
      )}. El link de acceso a la reunión es: <a href="${link}">${link}</a></p>`, // html body
    };

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, function (err, result) {
        if (err) {
          reject("Couldn't send email");
        } else {
          // set email reminder

          resolve("Email sent");
        }
      });
    });
  },
};
