const Task = require("./task.model");
const redisClient = require("../../config/redis");

//  Create a new task for the logged-in user
const createTask = async (req, res, next) => {
  try {
    // Create task and attach logged-in user ID
    const task = await Task.create({
      ...req.body,
      userId: req.user.id,
    });

    await redisClient.flushAll(); // simple approach for assignment

    // 201 = Resource successfully created
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    // Forward error to centralized error handler
    next(error);
  }
};

//  Get tasks of a user and admin
const getTasks = async (req, res, next) => {
  try {
    // Apply filter based on user role
    const filter = req.user.role === "ADMIN" ? {} : { userId: req.user.id };

    const tasks = await Task.find(filter);

    res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// Update a task
//  Task must exist

const updateTask = async (req, res, next) => {
  try {
    // Find task by ID
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Authorization check
    if (task.userId.toString() !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await redisClient.flushAll(); // flushing for better output
    // Update task fields
    Object.assign(task, req.body);
    await task.save();

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a task
//  Task must exist
//  Only task owner or ADMIN can delete

const deleteTask = async (req, res, next) => {
  try {
    // Find task by ID
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Authorization check
    if (task.userId.toString() !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Delete task
    await task.deleteOne();
    await redisClient.flushAll(); // flushing for better output
    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Export
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
