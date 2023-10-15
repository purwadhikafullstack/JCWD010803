const { body, validationResult } = require("express-validator");
const { param } = require("../../routers/room-router");

module.exports = {
  checkRoom: async (req, res, next) => {
    try {
      await body("roomName")
        .notEmpty()
        .withMessage("room name is require")
        .run(req);
      await body("roomDesc")
        .notEmpty()
        .withMessage("room description is require")
        .run(req);
      await body("price")
        .notEmpty()
        .withMessage("price is require")
        .run(req);

      const validation = validationResult(req);

      if (validation.isEmpty()) {
        next();
      } else {
        res.status(400).send({
          status: false,
          message: "Validation Invalid",
          error: validation.array(),
        });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
