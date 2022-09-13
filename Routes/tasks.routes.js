const express = require("express");

const taskRouter = express.Router();

// Middlewares
const { tasksExist } = require("../middlewares/tasks.middlewares");
// Controllers
const {
  getAllTasks,
  getTasksByStatus,
  createTask,
  finishedTask,
  cancellTask,
} = require("../controllers/tasks.controller");

taskRouter.get("/", getAllTasks);

taskRouter.get("/:status", getTasksByStatus);

taskRouter.post("/", createTask);

taskRouter.patch("/:id", tasksExist, finishedTask);

taskRouter.delete("/:id", tasksExist, cancellTask);

module.exports = { taskRouter };
