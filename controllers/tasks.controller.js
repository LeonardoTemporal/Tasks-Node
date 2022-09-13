const { Task } = require("../models/tasks.model");
const { User } = require("../models/users.model");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [{ model: User, attributes: ["id", "name", "email", "status"] }],
    });

    res.status(200).json({
      status: "success",
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
};

const getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const tasks = await Task.findAll({ where: { status } });

    res.status(200).json({
      status: "success",
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { title, userId, limitDate } = req.body;

    const finallyDate = new Date("2023 01 1");

    const newTask = await Task.create({
      title,
      userId,
      limitDate: finallyDate,
    });

    res.status(201).json({
      status: "success",
      data: { newTask },
    });
  } catch (error) {
    console.log(error);
  }
};

const finishedTask = async (req, res) => {
  try {
    const { status, finishDate } = req.body;
    const { task } = req;
    const { limitDate } = req.params;

    if (finishDate > limitDate) {
      await task.update({
        finishDate: new Date(finishDate),
        status: "late",
      });
    } else {
      await task.update({
        finishDate: new Date(finishDate),
        status: "completed",
      });
    }

    res.status(200).json({
      status: "success",
      data: { task },
    });
  } catch (error) {
    console.log(error);
  }
};

const cancellTask = async (req, res) => {
  const { task } = req;

  await task.update({ status: "cancelled" });

  res.status(204).json({
    status: "success",
    data: { task },
  });
};

module.exports = {
  getAllTasks,
  getTasksByStatus,
  createTask,
  finishedTask,
  cancellTask,
};
