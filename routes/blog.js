const { create_blog, comment_blog, delete_blog, get_blogs, get_single_blog, like_blog, update_blog } = require("../controllers/blog");
const { blog_schema, comment_schema, like_schema } = require("../schema/blog");

const auth = require("../middlewares/auth");
const validator = require("../middlewares/validator");
const express = require("express");
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the blog post.
 *         title:
 *           type: string
 *           description: Title of the blog post.
 *         content:
 *           type: string
 *           description: Content of the blog post.
 *         media:
 *           type: array
 *           items:
 *              type: string
 *              format: url
 *           description: Author of the blog post.
 *       required:
 *         - title
 *         - content
 */



/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs
 *     description: Retrieve a list of all blogs.
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: A list of blogs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
router.get("/", get_blogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     description: Retrieve a blog post by its ID.
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the blog post to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found.
 */
router.get("/:id", get_single_blog);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     description: Create a new blog post.
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Blog created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 */
router.post("/", [ validator(blog_schema), auth ], create_blog);

/**
 * @swagger
 * /api/blogs/{id}/comments:
 *   post:
 *     summary: Add a comment to a blog
 *     description: Add a comment to a blog post.
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the blog post to add the comment to.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the comment.
 *             required:
 *               - content
 *     responses:
 *       201:
 *         description: Comment added successfully.
 *       404:
 *         description: Blog not found.
 */
router.put("/comment/:id", [ validator(comment_schema), auth ], comment_blog);

/**
 * @swagger
 * /api/blogs/{id}/like:
 *   put:
 *     summary: Like a blog
 *     description: Like a blog post.
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the blog post to like.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog liked successfully.
 *       404:
 *         description: Blog not found.
 */
router.put("/like/:id", [ validator(like_schema), auth ], like_blog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     description: Update a blog post by its ID.
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the blog post to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found.
 */
router.put("/:id", [ validator(blog_schema), auth ], update_blog);


/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     description: Delete a blog post by its ID.
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the blog post to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Blog deleted successfully.
 *       404:
 *         description: Blog not found.
 */
router.delete("/:id", auth, delete_blog);

module.exports = router;