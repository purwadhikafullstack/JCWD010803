const { Op } = require("sequelize");
const db = require("../../models");
const user = db.user;
const enc = require("bcrypt");

const AuthController = {
  regisTenant: async (req, res) => {
    try {
      const { username, email, password, phoneNumber } = req.body;
      const KTP = req.file.filename;
      const salt = await enc.genSalt(10);
      const hashPassword = await enc.hash(password, salt);
      const result = await user.create({
        username,
        email,
        phoneNumber,
        password: hashPassword,
        roleId: 1,
        isVerified: 1,
        idCardImg:KTP,
      });
      res.status(200).send(result);
    } catch (error) {
        console.log(error);
      res.status(400).send(error);
    }
  },
};

module.exports = AuthController;
