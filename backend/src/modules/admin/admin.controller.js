const User = require("../auth/auth.model");
const Task = require("../tasks/task.model");
const redisClient =require("../../config/redis")

// Get all users (ADMIN only)
// GET /api/v1/admin/users

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords and find all users

    res.status(200).json({
      success: true,
      data: {
        users, // list of all users
        count: users.length, // total number of users
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get users",
    });
  }
};

// Get all tasks (ADMIN only)
// GET /api/v1/admin/tasks

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // find all tasks

    res.status(200).json({
      success: true,
      data: {
        tasks, // list of all tasks
        count: tasks.length, // total number of tasks
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get tasks",
    });
  }
};

// Delete a user by ID (ADMIN only)
// DELETE /api/v1/admin/users/:id

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // delete user by ID

    if (!user) {
      return res.status(404).json({
        // user not found (handling)
        success: false,
        message: "User not found",
      });
    }
    await redisClient.flushAll(); // flushing for better output
    await Task.deleteMany({ userId: user._id }); // Also delete all tasks associated with that user

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    // error handling
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

// Change user role (ADMIN only)
// PATCH /api/v1/admin/users/:id/role

const changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["USER", "ADMIN"].includes(role)) {
      // validate role
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }
    await redisClient.flushAll(); // flushing for better output
    const user = await User.findByIdAndUpdate(
      // update user role
      req.params.id,
      { role },
      { new: true },
    ).select("-password"); // exclude password in response

    if (!user) {
      return res.status(404).json({
        // user not found handling
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user role",
    });
  }
};

// Get all tasks of a specific user (ADMIN only)
// GET /api/v1/admin/users/:id/tasks

const getUserTasks = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({
        // user not found handling
        success: false,
        message: "User not found",
      });
    }

    const tasks = await Task.find({ userId }); // Get tasks of that user

    res.status(200).json({
      success: true,
      data: {
        // return user info along with their tasks
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        tasks, // list of tasks
        count: tasks.length, // total number of tasks
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get user tasks",
    });
  }
};

// Exporting all controller functions

module.exports = {
  getUsers,
  getTasks,
  deleteUser,
  changeUserRole,
  getUserTasks,
};
