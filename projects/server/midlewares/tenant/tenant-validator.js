const { body, validationResult } = require("express-validator");

module.exports = {
  checkRegister: async (req, res, next) => {
    try {
      await body("username")
        .trim()
        .notEmpty()
        .withMessage("Username cannot be empty")
        .run(req);
      await body("email")
        .trim()
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Wrong email format")
        .run(req);
      await body("password")
        .trim()
        .notEmpty()
        .isStrongPassword({
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
        .withMessage(
          "Password must be a combination of 1 uppercase, 1 number and 1 symbol"
        )
        .run(req);
      await body("phoneNumber")
        .trim()
        .notEmpty()
        .isLength({ min: 10, max: 13 })
        .withMessage("Phone number must between 10 - 13 length")
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
        console.log(error);
    }
  },
};
