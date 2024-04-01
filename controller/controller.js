const taskModel = require("../model/task");

// Create the Task
const createTask = async (req, res) => {
  try {
    let { title, description, status } = req.body;
    let taskDetails = await taskModel.create({ title, description, status });
    return res.status(201).send({
      status: true,
      message: "Task creted successfully",
      data: taskDetails,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      message: "failure",
      error,
    });
  }
};

// Retrieving a Task by ID
const getTaskById = async (req, res) => {
  try {
    // Extract the task ID from the request parameters
    const taskId = req.params.id;

    // Fetch the task data by its id
    const task = await taskModel.findById(taskId);

    // If no task is found with the given ID, return a 404 response
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).send({
      message: "Failure",
      error: error.message,
    });
  }
};

// Retrieving All Tasks
const getAlltask = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    // Find and update the task by its ID
    const updatedData = await taskModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          status: req.body.status,
        },
      },
      { new: true }
    );

    // If no task is found with the given ID, return a 404 response
    if (!updatedData) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).send({
      status: true,
      msg: "Updated task data successfully",
      data: updatedData,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task
const deleteTaskById = async (req, res) => {
  try {
    const taskId = req.params.id; // Extract the task ID from the request parameters

    // Find and delete the task by its ID
    const deletedTask = await taskModel.findByIdAndDelete(taskId);

    // If no task is found with the given ID, return a 404 response
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Return a success message with the deleted task
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete task", error: error.message });
  }
};

module.exports = {
  deleteTaskById,
};

module.exports = {
  createTask,
  getTaskById,
  getAlltask,
  updateTask,
  deleteTaskById,
};
