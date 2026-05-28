import express from "express";
import { check } from "express-validator";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router({ mergeParams: true });

router.get("/", getComments);
router.post(
  "/",
  protect,
  [check("content", "Nội dung là bắt buộc").not().isEmpty()],
  createComment,
);

export const commentStandaloneRouter = express.Router();
commentStandaloneRouter.delete("/:id", protect, deleteComment);

export default router;
