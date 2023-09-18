const db = require("../..//models");
const user = db.user;
const dbOtp = db.codeOtp;
const jwt = require("jsonwebtoken");
const enc = require("bcrypt");
const { Op } = require("sequelize");
const handlebars = require("handlebars");
const fs = require("fs");
const transporter = require("../../midlewares/transporter");
const { log } = require("console");

const otpGenerate = () => {
  const max = 9999;
  const min = 1000;
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber.toString();
};

const userController = {
  register: async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        phonenumber: phoneNumber,
        roleId,
      } = req.body;
      const isExist = await user.findOne({
        where: {
          [Op.or]: [{ email }, { phoneNumber }],
        },
      });
      if (!isExist) {
        const salt = await enc.genSalt(10);
        const hashPassword = await enc.hash(password, salt);
        
        const result = await user.create({
          username,
          email,
          password: hashPassword,
          phoneNumber,
          roleId,
        });
        console.log(result);
        const payloads = {
          id: result.id,
          username: result.username,
          email: result.email,
          password: result.password,
        };

        const token = jwt.sign(payloads, process.env.TOKEN_KEY);

        res.status(200).send({
          result,
          token,
        });
      } else {
        if (isExist.email == email) {
          throw { message: "Email sudah terdaftar" };
        }
        if (isExist.phoneNumber == phoneNumber) {
          throw { message: "Nomor telpon sudah terdaftar" };
        }
      }
      
    } catch (error) {
      res.status(400).send(error);
    }
  },
  login: async (req, res) => {
    try {
      const { data } = req.body;
      const password = req.body.password;
      const result = await user.findOne({
        where: {
          [Op.or]: [{ email: data }, { username: data }],
        },
      });
      if (!result)
        throw {
          message: "Sorry, We could not find your account.",
        };
      isValid = await enc.compare(password, result.password);
      if (!isValid)
        throw {
          message: "Sorry, We could not find your account.",
        };
      const payload = { id: result.id };
      const token = jwt.sign(payload, process.env.TOKEN_KEY, {
        expiresIn: "1d",
      });
      res.status(200).send({
        result,
        token,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  keepLogin: async (req, res) => {
    try {
      const result = await user.findOne({
        where: { id: req.user.id },
      });
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },
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
      const data = await fs.readFileSync("./templates/otp.html", "utf-8");
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
        result,
        token,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  checkOtp: async (req, res) => {
    try {
      const { otp, id } = req.body;
      const timeInIndonesia = new Date().getTime() + 7 * 60 * 60 * 1000;
      const time = new Date(timeInIndonesia);
      const checkUser = await user.findOne({
        where: { id: id },
      });

      const result = await dbOtp.findOne({ where: { otp: otp } });
      if (!result)
        throw {
          message: "Check OTP form your email again",
        };
      if (time > result.expiredDate)
        throw {
          message: "OTP is expired",
        };

      const deleteOtp = await dbOtp.destroy({
        where: { userId: checkUser.id },
      });

      res.status(200).send({
        message: "Verify OTP success",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      const checkUser = await user.findOne({
        where: { id: req.user.id },
      });
      const isValid = await enc.compare(currentPassword, checkUser.password);
      if (!isValid)
        throw {
          message: "Wrong current password",
        };
      const salt = await enc.genSalt(10);
      const hashPassword = await enc.hash(newPassword, salt);
      const result = await user.update(
        { password: hashPassword },
        { where: { id: req.user.id } }
      );
      res.status(200).send({
        message: "success",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getOtp: async (req, res) => {
    try {
      const { id, username, email } = req.user;
      const checkUser = await user.findOne({
        where: { email },
      });
      console.log(checkUser);
      const checkOtp = await dbOtp.findAll({
        where: {
          userId: id,
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
        userId: id,
        expiredDate: expiredDate,
        otp: otpNumber,
      });

      const data = await fs.readFileSync("./templates/otp.html", "utf-8");
      const tempCompile = await handlebars.compile(data);
      const tempResult = tempCompile({
        otp: otpNumber,
      });
      await transporter.sendMail({
        from: process.env.EMAIL_TRANSPORT,
        to: email,
        subject: "Verify your account with OTP code",
        html: tempResult,
      });
      res.status(200).send({
        message: "We have send OTP to your email",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  verifyAccount: async (req, res) => {
    try {
      const { firstname, lastname, birthdate, gender, otp } = req.body;
      const { id } = req.user;

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

      const setData = await user.update(
        {
          firstName: firstname,
          lastName: lastname,
          gender: gender,
          birthdate: birthdate,
          isVerified: true,
        },
        {
          where: { id: id },
        }
      );
      const deleteOtp = await dbOtp.destroy({
        where: { userId: id },
      });

      res.status(200).send({
        message: "Account has been successfully verified",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { id } = req.user;
      const { firstName, lastName, username, email, gender, birthdate } =
        req.body;

      const result = await user.update(
        {
          firstName : firstName,
          lastName : lastName,
          gender : gender,
          birthdate : birthdate,
          email : email
        },
        {
          where: {id:id}
        }
      );

      res.status(200).send({
        message: "Success"
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  updateAvatar : async (req, res) => {
    try {
      // console.log(req.file);
      if (req.file == undefined) {
        throw({message : 'Avatar Cannot be empty'});
      }
      const {destination, filename} = req.file;
      const isExist = await user.findOne({
        where : {id : req.user.id}
      });

      if (isExist.profileImg !== null) {
        fs.unlinkSync(`${destination}/${isExist.profileImg}`);
      }
      const setData = await user.update(
        {profileImg : filename},
        {where :{
          id : req.user.id
      }});
      res.status(200).send({
        message : 'Photo Upload Successfully'
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
};

module.exports = userController;
