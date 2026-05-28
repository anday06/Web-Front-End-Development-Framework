import React from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, Tag } from "lucide-react";

const PostCard = ({ post, index = 0 }) => {
  return (
    <Link
      to={`/posts/${post._id}`}
      className="glass-card p-6 flex flex-col group opacity-0 animate-slide-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Category badge */}
      <div className="mb-4">
        <span className="badge">
          <Tag size={10} className="mr-1" />
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200">
        {post.title}
      </h2>

      {/* Excerpt */}
      <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
        {post.content.substring(0, 120)}...
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
        <span className="flex items-center gap-1 text-emerald-500 font-semibold group-hover:gap-2 transition-all duration-200"> Đọc tiếp <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
};

export default PostCard;
