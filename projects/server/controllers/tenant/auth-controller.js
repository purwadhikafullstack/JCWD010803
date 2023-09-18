const db = require("../../models");
const user = db.user;
const jwt = require("jsonwebtoken");
const enc = require("bcrypt");
const { Op } = require("sequelize");

const AuthController = {
  loginTenant: async (req, res) => {
    try {
      const { data, password } = req.body;
      const result = await user.findOne({
        where: { [Op.or]: [{ email: data }, { username: data }] },
      });
      if (!result)
        throw {
          message: "Sorry we can't find your account. Please try again",
        };
      const isValid = await enc.compare(password, result.password);
      if (!isValid)
        throw {
          message: "Sorry we can't find your account. Please try again",
        };

      if (result && isValid && result.roleId === 2)
        throw {
          message: "Sorry. your are not an tenant",
        };

      const payload = { id: result.id };
      const token = jwt.sign(payload, process.env.TOKEN_KEY, {
        expiresIn: "1d",
      });
      res.status(200).send({ result, token });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};

module.exports = AuthController;
