import Post from "../models/Post.js";
import { validationResult } from "express-validator";

// Lấy danh sách bài viết (Có phân trang, tìm kiếm, lọc)
export const getPosts = async (req, res) => {
  const { page = 1, limit = 10, search = "", category = "" } = req.query;
  const query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }
  if (category) {
    query.category = category;
  }

  try {
    const posts = await Post.find(query)
      .populate("author", "name avatar")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      total: count,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy chi tiết bài viết
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name avatar",
    );
    if (!post)
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đăng bài viết
export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const newPost = new Post({
      ...req.body,
      author: req.user.id,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật bài viết
export const updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Không tìm thấy bài viết" });

    // Cấp quyền Admin (nếu có sau này) hoặc Chính chủ
    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Không có quyền sửa bài viết này" });
    }

    Object.assign(post, req.body);
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa bài viết
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Không tìm thấy bài viết" });

    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Không có quyền xóa bài viết này" });
    }

    await post.deleteOne();
    res.json({ message: "Đã xóa bài viết" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Like/Unlike bài viết
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Không tìm thấy bài viết" });

    const index = post.likes.indexOf(req.user.id);
    if (index === -1) {
      post.likes.push(req.user.id);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    res.json({ likes: post.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
