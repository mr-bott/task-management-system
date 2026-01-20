const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth.middleware");
const authorizeRoles =require("../../middlewares/role.middleware")
const cacheMiddleware=require("../../middlewares/cache.middleware")
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} = require("./task.controller");

router.use(authMiddleware);
 /**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     description: Manage Tasks.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete backend assignment
 *               description:
 *                 type: string
 *                 example: Finish swagger and auth logic
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example:
 *                     _id: 64bfa23d9a2e9c0012a45fbc
 *                     title: Complete backend assignment
 *                     description: Finish swagger and auth logic
 *                     userId: 64bfa10a9a2e9c0012a45faa
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

router.post("/", authorizeRoles("USER"), createTask);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks for logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *       401:
 *         description: Unauthorized
 */
router.get("/",cacheMiddleware, getTasks);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64bfa23d9a2e9c0012a45fbc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated task title
 *               description:
 *                 type: string
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
router.put("/:id", authorizeRoles("USER"), updateTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64bfa23d9a2e9c0012a45fbc
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/:id", deleteTask);

module.exports = router;
