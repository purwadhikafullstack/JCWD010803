const db = require("../../models");
const user = db.user;
const dbOtp = db.codeOtp;
const jwt = require("jsonwebtoken");
const enc = require("bcrypt");
const { Op } = require("sequelize");
const handlebars = require("handlebars");
const fs = require("fs");
const transporter = require("../../midlewares/transporter");

const authController = {
  resetPassword: async (req, res) => {
    try {
      const { newPassword, confirmPassword } = req.body;
      if (confirmPassword !== newPassword)
        throw {
          message: "Password not match",
        };
      const salt = await enc.genSalt(10);
      const hashPassword = await enc.hash(newPassword, salt);
      const result = await user.update(
        { password: hashPassword },
        { where: { id: req.user.id } }
      );
      res.status(200).send({
        message: "Reset Password Success",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const result = await user.findOne({ where: { email: email } });
      if (!result)
        throw {
          message: "User not found!",
        };
      const checkOtp = await dbOtp.findAll({
        where: {
          userId: result.id,
          expiredDate: {
            [Op.and]: {
              [Op.gte]: new Date(new Date().setHours(7, 0, 0, 0)),
              [Op.lte]: new Date(new Date().setHours(30, 59, 59, 999)),
            },
          },
        },
      });
      const totalSend = await checkOtp.length;

      const timeInIndonesia = new Date().getTime() + 7 * 60 * 60 * 1000;
      const time = new Date(timeInIndonesia);
      time.setTime(time.getTime() + 5 * 60 * 1000);
      const expiredDate = new Date(time);
      const otpNumber = otpGenerate();
      if (totalSend >= 5)
        throw {
          message:
            "Sorry, you have reached the maximum limit of OTP requests in a single day. Please try again tomorrow.",
        };

      await dbOtp.create({
        userId: result.id,
        expiredDate: expiredDate,
        otp: otpNumber,
      });

      const data = await fs.readFileSync("./src/otp.html", "utf-8");
      const tempCompile = await handlebars.compile(data);
      const tempResult = tempCompile({
        otp: otpNumber,
      });
      await transporter.sendMail({
        from: "hamidiakmal@gmail.com",
        to: email,
        subject: "Verify your account with OTP code",
        html: tempResult,
      });
      const payload = { id: result.id };
      const token = jwt.sign(payload, "key", { expiresIn: "1d" });
      res.status(200).send({
        message: "Check your email",
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  checkOtp: async (req, res) => {
    try {
      const { otp } = req.body;
      const timeInIndonesia = new Date().getTime() + 7 * 60 * 60 * 1000;
      const time = new Date(timeInIndonesia);
      const result = await dbOtp.findOne({ where: { otp: otp } });
      if (!result)
        throw {
          message: "Check OTP form your email again",
        };
      if (time > result.expiredDate)
        throw {
          message: "OTP is expired",
        };
      res.status(200).send({
        message: "Verify OTP success",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
