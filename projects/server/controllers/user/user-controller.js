const db = require("../../models");
const user = db.user;
const jwt = require("jsonwebtoken");
const enc = require("bcrypt");
const { Op } = require("sequelize");
const fs = require("fs");
const handlebars = require("handlebars");

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
};

module.exports = userController;
