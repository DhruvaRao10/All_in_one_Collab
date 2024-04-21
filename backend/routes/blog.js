const express = require("express");
router = express.Router();

const {
  createBlogPost,
  getBlogPostById,
  deleteBlogPostById,
} = require("../controller/blog");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createBlogPost);
router.delete("/delete/:id", authMiddleware, deleteBlogPostById);
router.get("/get-blog/:id", authMiddleware, getBlogPostById);
// router.put("/update", protect, updateController);

module.exports = router;
