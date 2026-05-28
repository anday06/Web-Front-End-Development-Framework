import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useAuthStore from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, ArrowRight } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="page-enter flex items-center justify-center min-h-[calc(100vh-12rem)]">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 auth-bg">
          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-400/30">
              <Lock size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Chào mừng trở lại</h2>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to continue to DevBlog
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 relative z-10"
          >
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="ban@vidu.com"
                  className="input-modern !pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  className="input-modern !pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-rose-400 text-xs mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 !py-3"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <> Đăng nhập <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500 relative z-10">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            > Đăng ký </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
