const db = require("../../models");
const user = db.user;
const dbOtp = db.codeOtp;
const jwt = require("jsonwebtoken");
const enc = require("bcrypt");
const { Op } = require("sequelize");

const userController = {
  register: async (req, res) => {
    try {
      const {
        firstname,
        lastname,
        gender,
        password,
        email,
        phonenumber,
        birthdate,
        roleId,
        username,
      } = req.body;
      const isExist = await user.findOne({
        where: {
          [Op.or]: [{ email }, { phonenumber }],
        },
      });
      if (!isExist) {
        const salt = await enc.genSalt(10);
        const hashPassword = await enc.hash(password, salt);
        const result = await user.create({
          firstname,
          lastname,
          gender,
          password: hashPassword,
          email,
          phonenumber,
          birthdate,
          roleId,
          username,
        });

        res.status(200).send({
          message: "Registrasi berhasil",
          result,
        });
      } else {
        if (isExist.email == email) {
          throw { message: "Email sudah terdaftar" };
        }
        if (isExist.phonenumber == phonenumber) {
          throw { message: "Nomor telpon sudah terdaftar" };
        }
        res.send("failed");
      }
    } catch (error) {
      res.status(200).send(error);
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
      const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "1d" });
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
    };
  },
};

module.exports = userController;
