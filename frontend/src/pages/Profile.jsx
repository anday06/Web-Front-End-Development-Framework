import React, { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Edit2,
  Trash2,
  PenSquare,
  Mail,
  FileText,
  Clock,
  ArrowRight,
  Tag,
} from "lucide-react";

const Profile = () => {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const { data } = await api.get("/posts?limit=100");
        const userPosts = data.posts.filter((p) => p.author._id === user._id);
        setPosts(userPosts);
      } catch (error) {
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
      toast.success("Post deleted");
    } catch (err) {
      toast.error("Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div className="page-enter space-y-8">
        <div className="glass-card p-8 flex items-center gap-6">
          <div className="skeleton w-20 h-20 rounded-full" />
          <div className="space-y-2 flex-1">
            <div className="skeleton h-6 w-40" />
            <div className="skeleton h-4 w-56" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 space-y-4">
              <div className="skeleton h-4 w-20" />
              <div className="skeleton h-6 w-3/4" />
              <div className="skeleton h-3 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      {/* Profile header card */}
      <div className="glass-card p-8 mb-8 relative overflow-hidden">
        {/* Decorative gradient strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-sky-400 to-pink-400" />

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 via-sky-400 to-indigo-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-emerald-400/20">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 border-3 border-white shadow-sm" />
          </div>

          {/* Info */}
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="flex items-center gap-1.5 text-gray-500 text-sm mt-1 justify-center sm:justify-start">
              <Mail size={14} /> {user.email}
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center px-4 py-2 rounded-xl bg-gradient-to-br from-emerald-50 to-sky-50">
              <p className="text-2xl font-bold gradient-text">{posts.length}</p>
              <p className="text-xs text-gray-500">Posts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FileText size={20} className="text-emerald-500" />
          My Posts
        </h2>
        <Link
          to="/create-post"
          className="btn-secondary text-sm flex items-center gap-1.5"
        >
          <PenSquare size={14} /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center mx-auto mb-4">
            <PenSquare size={24} className="text-emerald-500" />
          </div>
          <h3 className="text-gray-700 text-lg font-medium mb-2">
            No posts yet
          </h3>
          <p className="text-gray-400 mb-6">
            Start sharing your thoughts and stories
          </p>
          <Link to="/create-post" className="btn-primary inline-block">
            Write Your First Post
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className="glass-card p-6 flex flex-col group relative opacity-0 animate-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Action buttons */}
              <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
                <Link
                  to={`/edit-post/${post._id}`}
                  className="p-2 rounded-lg bg-white/90 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                  title="Edit"
                >
                  <Edit2 size={14} />
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="p-2 rounded-lg bg-white/90 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Category */}
              <div className="mb-3">
                <span className="badge">
                  <Tag size={10} className="mr-1" />
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                {post.content.substring(0, 100)}...
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center text-xs text-gray-400 pt-3 border-t border-gray-100">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <Link
                  to={`/posts/${post._id}`}
                  className="flex items-center gap-1 text-emerald-500 font-semibold hover:gap-2 transition-all"
                >
                  View <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
