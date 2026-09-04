import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/user/login-user`,
        { email, password },
        { withCredentials: true },
      )
      .then((res) => {
        toast.success("Login Success");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Server is not responding");
      });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center mb-6">
          <img
            className="h-14 object-contain"
            src="https://shopvia.pk/wp-content/uploads/elementor/thumbs/logo-01-scaled-rlwdrsge74eteo3fiak2itpoe12ycp3oo7yd0nct0o.jpg"
            alt="Logo"
          />
        </Link>
        <h2 className="text-center text-[26px] font-semibold text-[#1E1B4B]">
          Welcome back
        </h2>
        <p className="text-center text-[14px] text-gray-500 mt-1">
          Log in to continue to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm rounded-2xl sm:px-10 border border-[#f0ece3]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#1E1B4B] mb-1.5"
              >
                Email Address
              </label>
              <input
                type="text"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3.5 py-2.5 border border-[#e5e0d8] rounded-lg shadow-sm placeholder-gray-400 outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-all sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#1E1B4B] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3.5 py-2.5 pr-11 border border-[#e5e0d8] rounded-lg shadow-sm placeholder-gray-400 outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-all sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                    size={20}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                    size={20}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 accent-[#1E1B4B] rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-700"
                >
                  Remember Me
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11.5 flex justify-center items-center rounded-full text-sm font-semibold text-white bg-[#1E1B4B] hover:bg-[#141130] transition-colors"
            >
              Log In
            </button>

            <div className="flex justify-center text-sm">
              <h4 className="text-gray-600">Don't have an account?</h4>
              <Link
                to="/sign-up"
                className="text-[#C9A227] font-medium pl-2 hover:text-[#b8931f]"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
