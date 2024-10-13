"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StudentController_1 = require("../Controllers/StudentController");
const express_1 = require("express");
const AuthMiddelwares_1 = require("../Midllewares/AuthMiddelwares");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /posts/add:
 *   post:
 *     summary: Add a post
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - title
 *               - content
 *
 *     responses:
 *       201:
 *         description: A successful response
 */
router.post("/add", AuthMiddelwares_1.onlySoldiersAndCommanders, StudentController_1.createPost);
/**
 * @swagger
 * /posts/get-my-posts:
 *   get:
 *     summary: get the connected user posts
 *     tags:
 *       - Posts
 *     responses:
 *       201:
 *         description: A successful response
 */
//get the connected user posts
router.get("/get-my-posts", AuthMiddelwares_1.onlySoldiersAndCommanders, StudentController_1.getPosts);
//delete a post
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     description: Allows soldiers and commanders to delete a specific post
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post successfully deleted
 *       401:
 *         description: Unauthorized - User is not a soldier or commander
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", AuthMiddelwares_1.onlySoldiersAndCommanders, StudentController_1.deletePost);
//update a post
/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     description: Allows soldier and commanders to update a specific post
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - title
 *               - content
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post successfully updated
 *       401:
 *         description: Unauthorized - User is not a soldier or commander
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.put("/:id", AuthMiddelwares_1.onlySoldiersAndCommanders, StudentController_1.updatePost);
exports.default = router;
