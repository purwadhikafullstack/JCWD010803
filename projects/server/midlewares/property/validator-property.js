const { body, validationResult } = require("express-validator");

module.exports = {
  checkProperty: async (req, res, next) => {
    try {
      await body("propertyName")
        .notEmpty()
        .withMessage("property name is require")
        .run(req);
      await body("propertyDesc")
        .notEmpty()
        .withMessage("property description is require")
        .run(req);
      if (!req.file) {
        throw new Error("Property image is required");
      }

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
      console.log(error);
      res.status(400).send(error);
    }
  },
};
