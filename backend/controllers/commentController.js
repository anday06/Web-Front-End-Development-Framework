import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import { validationResult } from "express-validator";

// Lấy danh sách bình luận theo postId
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đăng bình luận
export const createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const newComment = new Comment({
      content: req.body.content,
      post: req.params.postId,
      author: req.user.id,
    });
    const savedComment = await newComment.save();
    await savedComment.populate("author", "name avatar");
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa bình luận
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(404).json({ message: "Không tìm thấy bình luận" });

    const post = await Post.findById(comment.post);

    if (
      comment.author.toString() !== req.user.id &&
      post &&
      post.author.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Không có quyền xóa bình luận này" });
    }

    await comment.deleteOne();
    res.json({ message: "Đã xóa bình luận" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
