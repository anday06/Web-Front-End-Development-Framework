import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { Tag, Sparkles, Search, Filter } from "lucide-react";
import PostCard from "../components/PostCard";
import SkeletonCard from "../components/SkeletonCard";
import Pagination from "../components/Pagination";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    { value: "", label: "Tất cả danh mục" },
    { value: "Công nghệ", label: "Công nghệ" },
    { value: "Đời sống", label: "Đời sống" },
    { value: "Lập trình", label: "Lập trình" },
    { value: "Sức khỏe", label: "Sức khỏe" },
    { value: "Kinh doanh", label: "Kinh doanh" },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(
          `/posts?page=${page}&limit=6&search=${search}&category=${category}`,
        );
        setPosts(data.posts);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Add a simple debounce for search
    const timer = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => clearTimeout(timer);
  }, [page, search, category]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset page on filter changes
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  return (
    <div className="page-enter">
      {/* Hero header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Latest <span className="gradient-text">Nhất</span>
          <Sparkles size={28} className="inline-block ml-2 text-amber-400" />
        </h1>
        <p className="text-gray-500 text-lg">
          Khám phá những câu chuyện và chia sẻ từ các lập trình viên
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white/50 backdrop-blur-sm"
            placeholder="Tìm kiếm bài viết..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="relative min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={18} className="text-gray-400" />
          </div>
          <select
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white/50 backdrop-blur-sm appearance-none"
            value={category}
            onChange={handleCategoryChange}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center mx-auto mb-4">
            <Tag size={24} className="text-emerald-500" />
          </div>
          <h3 className="text-gray-700 text-lg font-medium mb-2">
            No posts found
          </h3>
          <p className="text-gray-400 mb-6">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
          <Link to="/create-post" className="btn-primary inline-block">
            Viết bài đầu tiên
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
            {posts.map((post, index) => (
              <PostCard key={post._id} post={post} index={index} />
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </div>
  );
};

export default Home;
