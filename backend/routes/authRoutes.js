import express from "express";
import { check } from "express-validator";
import { protect } from "../middlewares/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/register",
  [
    check("name", "Tên là bắt buộc").not().isEmpty(),
    check("email", "Vui lòng nhập email hợp lệ").isEmail(),
    check("password", "Mật khẩu phải từ 6 ký tự trở lên").isLength({ min: 6 }),
  ],
  registerUser,
);

router.post(
  "/login",
  [
    check("email", "Vui lòng nhập email hợp lệ").isEmail(),
    check("password", "Mật khẩu là bắt buộc").exists(),
  ],
  loginUser,
);

router.get("/me", protect, getMe);

export default router;
