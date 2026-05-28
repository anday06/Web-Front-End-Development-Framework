import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PenSquare, FileText, Tag, ArrowRight } from "lucide-react";

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
});

const CreatePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/posts", data);
      toast.success("Post published successfully!");
      navigate(`/posts/${res.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter max-w-2xl mx-auto">
      <div className="glass-card p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center shadow-lg shadow-emerald-400/30">
            <PenSquare size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Tạo bài viết</h2>
            <p className="text-gray-500 text-sm">
              Share your story with the world
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Title
            </label>
            <div className="relative">
              <FileText
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                {...register("title")}
                placeholder="Nhập tiêu đề cho bài viết..."
                className="input-modern !pl-10"
              />
            </div>
            {errors.title && (
              <p className="text-rose-400 text-xs mt-1.5">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Category
            </label>
            <div className="relative">
              <Tag
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                {...register("category")}
                className="input-modern !pl-10 appearance-none bg-transparent"
              >
                <option value="">-- Chọn danh mục --</option>
                <option value="Công nghệ">Công nghệ</option>
                <option value="Đời sống">Đời sống</option>
                <option value="Lập trình">Lập trình</option>
                <option value="Sức khỏe">Sức khỏe</option>
                <option value="Kinh doanh">Kinh doanh</option>
              </select>
            </div>
            {errors.category && (
              <p className="text-rose-400 text-xs mt-1.5">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Content
            </label>
            <textarea
              {...register("content")}
              rows="10"
              placeholder="Viết nội dung bài viết của bạn..."
              className="textarea-modern"
            />
            {errors.content && (
              <p className="text-rose-400 text-xs mt-1.5">
                {errors.content.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 !py-3"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {" "}
                Đăng bài <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
