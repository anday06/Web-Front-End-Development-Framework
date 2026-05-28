import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useAuthStore from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Register = () => {
  const { register: registerAuth } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerAuth(data.name, data.email, data.password);
      toast.success("Đăng ký thành công!");
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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-400/30">
              <User size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Tạo tài khoản</h2>
            <p className="text-gray-500 text-sm mt-1">
              Start your journey with DevBlog
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 relative z-10"
          >
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("name")}
                  placeholder="Tên của bạn"
                  className="input-modern !pl-10"
                />
              </div>
              {errors.name && (
                <p className="text-rose-400 text-xs mt-1.5">
                  {errors.name.message}
                </p>
              )}
            </div>

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
                <p className="text-rose-400 text-xs mt-1.5">
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
                  placeholder="Tối thiểu 6 ký tự"
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
                <> Tạo tài khoản <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500 relative z-10">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            > Đăng nhập </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
