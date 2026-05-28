import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden">
        {/* Vibrant gradient background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="blob blob-4" />
          {/* Base gradient - light & fresh */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-sky-50 to-pink-50" />
          {/* Dot pattern overlay */}
          <div className="geo-pattern" />
          {/* Decorative rings */}
          <div className="shape-ring shape-ring-1" />
          <div className="shape-ring shape-ring-2" />
        </div>

        <Navbar />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/edit-post/:id" element={<EditPost />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </main>

        <ToastContainer
          position="bottom-right"
          theme="light"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
