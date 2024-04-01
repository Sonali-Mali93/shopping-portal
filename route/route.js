const express = require("express");
const taskcontroller = require("../controller/controller");
const router = express.Router();

router.post("/tasks", taskcontroller.createTask);
router.get("/tasks/:id", taskcontroller.getTaskById);
router.get("/tasks", taskcontroller.getAlltask);
router.put("/tasks/:id", taskcontroller.updateTask);
router.delete("/tasks/:id", taskcontroller.deleteTaskById);

module.exports = router;
