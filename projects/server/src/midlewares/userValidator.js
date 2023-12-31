const { body, validationResult } = require("express-validator");

module.exports = {
  checkregister: async (req, res, next) => {
    try {
      await body("username")
        .trim()
        .notEmpty()
        .withMessage("Username must not be empty")
        .run(req);
      // await body('email').trim().notEmpty().isEmail().matches(/@(gmail|yahoo|rocketmail)\.com$/i).withMessage('Email must be gmail, yahoo and rocketmail').run(req);
      await body("email")
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage("Email must not be empty")
        .run(req);
      await body("phonenumber")
        .trim()
        .notEmpty()
        .isLength({ min: 10, max: 13 })
        .withMessage("Phone number must between 10 - 13 length")
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
  checkForgotPassword: async (req, res, next) => {
    try {
      await body("email")
        .trim()
        .notEmpty()
        .withMessage("email is require")
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
  checkResetPassword: async (req, res, next) => {
    try {
      await body('newPassword').trim().notEmpty().withMessage('New password is require').run(req)
      await body('confirmPassword').trim().notEmpty().withMessage('Confirm password is require').run(req)
      const validation = validationResult(req)
      if (validation.isEmpty()) {
        next()
      }
      else{
        res.status(400).send({
          status : false,
          message : 'Validation Invalid',
          error : validation.array()
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  checkNewPassword : async (req,res,next) => {
    await body('newPassword').notEmpty().isStrongPassword({
        minLength : 6,
        minNumbers : 1,
        minSymbols : 1,
        minUppercase : 1
    }).run(req) 
    const validation = validationResult(req)

    if (validation.isEmpty()) {
        next()
    }
    else {
        res.status(400).send({
            status : false,
            message : 'Password To Weak',
            error : validation.array()
        })
    }
}
};
