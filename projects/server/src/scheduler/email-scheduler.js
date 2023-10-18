const cron = require("node-cron");
const db = require("../models");
const nodemailer = require("nodemailer");
require("dotenv").config();
const moment = require("moment-timezone");

const emailScheduler = async () => {
  try {
    cron.schedule("0 0 * * *", async function () {
      try {
        const now = new Date();
        const tmr = new Date(now);
        tmr.setDate(now.getDate() + 1);
        const getBooking = await db.onBooking.findAll({
          where: {
            checkIn: tmr,
          },
          include: [
            {
              model: db.user,
            },
            {
              model: db.rooms,
              include: [
                {
                  model: db.properties,
                },
              ],
            },
          ],
        });
        console.log("checking Booking Data");
        // console.log(getBooking);
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_TRANSPORT,
            pass: process.env.EMAIL_TRANSPORT_CREDENTIAL,
          },
        });
        let mailOptions = {};
        getBooking.forEach((element) => {
          const email = element?.user?.email;

          if (email) {
            mailOptions = {
              from: process.env.EMAIL_TRANSPORT,
              to: email,
              subject: "Hotel Rules and Tenant Regulations",
              text: `Hello,
  
        Welcome to ComfyCribz!
        
        Don't Forget to Check in at ${moment(
          element.checkIn,
          "YYYY-MM-DD"
        ).format("DD/MM/YYYY")} in ${
                element.rooms.properties.propertyName.roomName
              }, Check In Detail Is Below Here :

        Name : ${element.user.firstName}
        Check-in Date : ${moment(element.checkIn, "YYYY-MM-DD").format(
          "DD/MM/YYYY"
        )}
        Check-Out Date : ${moment(element.checkOut, "YYYY-MM-DD").format(
          "DD/MM/YYYY"
        )}
        Property Name : ${element.rooms.properties.propertyName.roomName}
        Room : ${element.rooms.roomName}
      
                

        We are delighted to have you as our guest. To ensure a pleasant stay for all, we kindly request that you adhere to the following rules and regulations :

        1. Identification:
           All guests must present a valid government-issued ID upon check-in.

        2. No Smoking:
           Smoking is strictly prohibited in all indoor areas of the hotel. Designated smoking areas are available.

        3. Quiet Hours:
           Quiet hours are observed from 10:00 PM to 7:00 AM. Please be considerate of other guests during this time.

        4. Guest Visitors:
           Non-registered visitors are not allowed in guest rooms after 10:00 PM. Please register all visitors at the front desk.

        5. Room Damage:
           Guests will be held responsible for any damage to the hotel property caused by them or their visitors. Charges may apply.

        6. Pets:
           Pets are not allowed in the hotel, with the exception of service animals. Please inform us in advance if you will have a service animal with you.

        7. Lost and Found:
           We are not responsible for any lost or stolen items. Please use the in-room safe for valuable items.

        Violation of these rules may result in eviction from the hotel without a refund. We appreciate your cooperation and hope you have a wonderful stay.`,
            };
            transporter.sendMail(mailOptions, function (err, info) {
              if (err) {
                console.log("TRANSPORTER_ERR", err, mailOptions);
              } else {
                console.log("Email sent", info);
              }
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = emailScheduler;
