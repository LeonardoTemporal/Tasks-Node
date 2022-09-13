const express = require("express");

const usersRouter = express.Router();

// Middlewares
const { userExist } = require("../middlewares/users.middlewares");
const {
  createUserValidators,
} = require("../middlewares/validator.middlewares");

// Controllers
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

usersRouter.get("/", getAllUsers);

usersRouter.post("/", createUserValidators, createUser);

usersRouter.patch("/:id", userExist, updateUser);

usersRouter.delete("/:id", userExist, deleteUser);

module.exports = { usersRouter };
