import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import useAuthStore from "../store/useAuthStore";
import { toast } from "react-toastify";
import {
  Heart,
  Trash2,
  MessageCircle,
  Clock,
  Tag,
  ArrowLeft,
  Edit2,
  Send,
} from "lucide-react";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          api.get(`/posts/${id}`),
          api.get(`/posts/${id}/comments`),
        ]);
        setPost(postRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        toast.error("Tải bài viết thất bại");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchPostData();
  }, [id, navigate]);

  const handleLike = async () => {
    if (!user) return toast.info("Vui lòng đăng nhập để thao tác");
    setLiking(true);
    try {
      const { data } = await api.post(`/posts/${id}/like`);
      setPost({ ...post, likes: data.likes });
    } catch (err) {
      toast.error("Thao tác thất bại");
    } finally {
      setLiking(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const { data } = await api.post(`/posts/${id}/comments`, {
        content: commentText,
      });
      setComments([data, ...comments]);
      setCommentText("");
      toast.success("Đã thêm bình luận");
    } catch (err) {
      toast.error(err.response?.data?.message || "Thêm bình luận thất bại");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
      toast.success("Đã xóa bình luận");
    } catch (err) {
      toast.error("Xóa bình luận thất bại");
    }
  };

  if (loading) {
    return (
      <div className="page-enter max-w-3xl mx-auto space-y-6">
        <div className="skeleton h-8 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="glass-card p-8 space-y-3">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-5/6" />
          <div className="skeleton h-4 w-4/6" />
        </div>
      </div>
    );
  }

  if (!post) return null;

  const isLiked = post.likes.includes(user?._id);
  const isAuthor = user?._id === post.author._id;

  return (
    <div className="page-enter max-w-3xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-emerald-600 transition-colors mb-6 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm">Quay lại</span>
      </button>

      {/* Post card */}
      <article className="glass-card p-8 mb-6">
        {/* Category & date */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="badge">
            <Tag size={10} className="mr-1" />
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock size={12} />
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center text-white text-sm font-bold shadow-sm">
            {post.author.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-700 text-sm">
              {post.author.name}
            </p>
            <p className="text-xs text-gray-400">Tác giả</p>
          </div>
          {isAuthor && (
            <Link
              to={`/edit-post/${post._id}`}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <Edit2 size={12} /> Sửa
            </Link>
          )}
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>

        {/* Like section */}
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={handleLike}
            disabled={liking}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              isLiked
                ? "bg-rose-50 text-rose-500 border border-rose-200"
                : "bg-gray-50 text-gray-500 border border-gray-100 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200"
            }`}
          >
            <Heart
              size={18}
              fill={isLiked ? "currentColor" : "none"}
              className={liking ? "animate-pulse" : ""}
            />
            <span>{post.likes.length}</span>
          </button>
          <span className="flex items-center gap-1.5 text-sm text-gray-400">
            <MessageCircle size={16} /> {comments.length} bình luận
          </span>
        </div>
      </article>

      {/* Comments section */}
      <div className="glass-card p-8">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <MessageCircle size={20} className="text-emerald-500" />
          Bình luận ({comments.length})
        </h3>

        {/* Comment form */}
        {user ? (
          <form onSubmit={handleAddComment} className="mb-8">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-1">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <textarea
                  className="textarea-modern mb-3"
                  rows="3"
                  placeholder="Chia sẻ suy nghĩ của bạn..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="btn-primary flex items-center gap-2 !py-2 text-sm disabled:opacity-40"
                  >
                    <Send size={14} /> Đăng bình luận
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-emerald-50/50 to-sky-50/50 text-center border border-emerald-100/50">
            <p className="text-gray-500 text-sm">
              Vui lòng{" "}
              <Link to="/login" className="text-emerald-600 font-semibold">
                đăng nhập
              </Link>{" "}
              để tham gia bình luận
            </p>
          </div>
        )}

        {/* Comment list */}
        <div className="space-y-4">
          {comments.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-6">
              Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ suy nghĩ của
              bạn!
            </p>
          )}
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="group flex gap-3 p-4 rounded-xl bg-gray-50/60 hover:bg-emerald-50/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-300 to-pink-300 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                {comment.author.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-700">
                    {comment.author.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {comment.content}
                </p>
              </div>
              {(user?._id === comment.author._id ||
                user?._id === post.author._id) && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg text-gray-300 hover:text-rose-500 hover:bg-rose-50"
                  title="Xóa bình luận"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
