import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import { Edit2, FileText, Tag, ArrowRight } from "lucide-react";

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
});

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        if (data.author._id !== user._id) {
          toast.error("Not authorized to edit this post");
          navigate("/");
          return;
        }
        setValue("title", data.title);
        setValue("category", data.category);
        setValue("content", data.content);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load post");
        navigate("/");
      }
    };
    fetchPost();
  }, [id, setValue, user, navigate]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await api.put(`/posts/${id}`, data);
      toast.success("Post updated successfully!");
      navigate(`/posts/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update post");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-enter max-w-2xl mx-auto">
        <div className="glass-card p-8 space-y-6">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-10 w-full" />
          <div className="skeleton h-10 w-full" />
          <div className="skeleton h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter max-w-2xl mx-auto">
      <div className="glass-card p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-lg shadow-amber-400/30">
            <Edit2 size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Edit Post</h2>
            <p className="text-gray-500 text-sm">Refine your story</p>
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
              <input {...register("title")} className="input-modern !pl-10" />
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
              <input
                {...register("category")}
                className="input-modern !pl-10"
              />
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
            disabled={submitting}
            className="btn-primary w-full flex items-center justify-center gap-2 !py-3"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Update Post <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
