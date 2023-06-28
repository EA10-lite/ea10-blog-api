const { create_blog, comment_blog, delete_blog, get_blogs, get_single_blog, like_blog, update_blog } = require("../controllers/blog");
const { blog_schema, comment_schema, like_schema } = require("../schema/blog");

const auth = require("../middlewares/auth");
const validator = require("../middlewares/validator");
const express = require("express");
const router = express.Router();

router.get("/", get_blogs);
router.get("/:id", get_single_blog);
router.post("/", [ validator(blog_schema), auth ], create_blog);
router.put("/comment/:id", [ validator(comment_schema), auth ], comment_blog)
router.put("/like/:id", [ validator(like_schema), auth ], like_blog);
router.put("/:id", [ validator(blog_schema), auth ], update_blog);
router.delete("/:id", auth, delete_blog);

module.exports = router;