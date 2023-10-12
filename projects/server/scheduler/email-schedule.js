const db = require("../models");
const onBooking = db.onBooking;
const schedule = require("node-schedule");
const transporter = require("../midlewares/transporter");


const scheduleEmail = async (booking) => {
  try {
    if (booking) {
      const checkInDateFromDatabase = booking.checkIn;
      const reminderDate = new Date(checkInDateFromDatabase);
      reminderDate.setDate(reminderDate.getDate() - 1);

      schedule.scheduleJob(reminderDate, () => {
        const mailOptions = {
          from: process.env.EMAIL_TRANSPORT,
          to: booking.user.email,
          subject: "Reminder: Check-In Tomorrow",
          text: "Don't forget to check-in tomorrow!",
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error sending email: " + error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      });
    } else {
      console.log("Data pemesanan tidak ditemukan");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


const sendEmailBasedOnBooking = (id) => {
  onBooking.findOne({
      where: {
        id: id,
      },
      include: [
      {
        model: User,
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
