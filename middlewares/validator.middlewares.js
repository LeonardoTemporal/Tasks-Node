const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return res.status(200).json({
      status: "error",
      message,
    });
  }
  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("El nombre debe ser String")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Minimo 3 caracteres"),
  body("email")
    .isEmail()
    .withMessage("El correo debe tener sus respectivos caracteres"),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password con minimo 8 caracteres"),
  checkValidations,
];

module.exports = { createUserValidators };
