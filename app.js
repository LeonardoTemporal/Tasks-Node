const express = require("express");
const { usersRouter } = require("./Routes/users.routes");
const { taskRouter } = require("./Routes/tasks.routes");

const app = express();

app.use(express.json());

//endpoints
app.use("/api/v1/users", usersRouter);

app.use("/api/v1/tasks", taskRouter);

//
app.all("*", (req, res) => {
  res.status(400).json({
    status: "Error",
    message: `${req.method} ${req.url} does not exist in our server`,
  });
});

module.exports = { app };
