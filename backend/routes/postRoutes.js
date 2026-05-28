import express from "express";
import { check } from "express-validator";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post(
  "/",
  protect,
  [
    check("title", "Tiêu đề là bắt buộc").not().isEmpty(),
    check("content", "Nội dung là bắt buộc").not().isEmpty(),
    check("category", "Danh mục là bắt buộc").not().isEmpty(),
  ],
  createPost,
);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.post("/:id/like", protect, likePost);

export default router;
