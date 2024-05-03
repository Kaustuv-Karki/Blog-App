import express from "express";
import {
  createBlog,
  deleteBlog,
  updateBlog,
  getBlogs,
  getBlogsById,
  postComment,
  getBlogCategoryList,
  getBlogsByCategory,
  getTags,
  getBlogsByTags,
} from "../controllers/blog.controller.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
} from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createBlog);
router.delete("/delete/:id/:blogId", verifyTokenAndAuthorization, deleteBlog);
router.put("/update/:id/:blogId", verifyTokenAndAuthorization, updateBlog);
router.get("/get", getBlogs);
router.get("/get/:id", getBlogsById);
router.post("/comment/:id", verifyToken, postComment);
router.get("/categoryList", getBlogCategoryList);
router.get("/category/:category", getBlogsByCategory);
router.get("/tags", getTags);
router.get("/tags/:tags", getBlogsByTags);

export default router;
