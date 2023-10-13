const db = require("../models");
const onBooking = db.onBooking;
const user = db.user; 
const schedule = require("node-schedule");
const transporter = require("../middlewares/transporter");
const fs = require("fs");
const handlebars = require("handlebars");

const scheduleEmail = async (booking) => {
  try {
    if (booking) {
      const checkInDateFromDatabase = booking.checkIn;
      const reminderDate = new Date(checkInDateFromDatabase);
      reminderDate.setDate(reminderDate.getDate() - 1);

      schedule.scheduleJob(reminderDate, async () => {
        try {
          const data = fs.readFileSync("./templates/mail-schedule-checkin.html", "utf-8");
          const tempCompile = handlebars.compile(data);
          const tempResult = tempCompile;
          const email = booking.user.email;
      
          await transporter.sendMail({
            from: process.env.EMAIL_TRANPORT,
            to: email,
            subject: "Hotel Rules and Tenant Regulations",
            html: tempResult,
          });
        } catch (error) {
          console.error("Error:", error);
        }
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const sendEmailBasedOnBooking = (id) => {
  onBooking.findByPk(id, {
    include: [
      {
        model: user,
        as: 'user',
      },
    ],
  })
  .then(scheduleEmail)
  .catch((error) => {
    console.error("Error:", error);
  });
};

module.exports = {
  sendEmailBasedOnBooking,
};
