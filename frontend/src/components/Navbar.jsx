import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { User, LogOut, PenSquare, Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-emerald-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-emerald-400/30">
              <PenSquare size={17} className="text-white" />
            </div>
            <span className="gradient-text">DevBlog</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {user ? (
              <>
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive("/")
                      ? "bg-emerald-50 text-emerald-700 shadow-sm"
                      : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/60"
                  }`}
                >Trang chủ</Link>
                <Link
                  to="/create-post"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive("/create-post")
                      ? "bg-emerald-50 text-emerald-700 shadow-sm"
                      : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/60"
                  }`}
                >
                  <PenSquare size={14} />Viết bài</Link>

                <div className="w-px h-6 bg-gray-200 mx-2" />

                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/60 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:inline font-medium">
                    {user.name}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-all duration-200"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive("/login")
                      ? "bg-emerald-50 text-emerald-700 shadow-sm"
                      : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/60"
                  }`}
                >Đăng nhập</Link>
                <Link
                  to="/register"
                  className="btn-primary !py-2 !px-5 text-sm"
                >Bắt đầu</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600 hover:text-emerald-600 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden animate-slide-down border-t border-emerald-100/50">
          <div className="px-4 py-3 space-y-1">
            {user ? (
              <>
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive("/")
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-600 hover:bg-emerald-50/60 hover:text-emerald-700"
                  }`}
                >Trang chủ</Link>
                <Link
                  to="/create-post"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive("/create-post")
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-600 hover:bg-emerald-50/60 hover:text-emerald-700"
                  }`}
                >
                  <PenSquare size={14} />Viết bài</Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-emerald-50/60 hover:text-emerald-700 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm text-rose-500 hover:bg-rose-50 transition-all"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-emerald-50/60 hover:text-emerald-700 transition-all"
                >Đăng nhập</Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center btn-primary !py-2.5 text-sm mt-2"
                >Bắt đầu</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
