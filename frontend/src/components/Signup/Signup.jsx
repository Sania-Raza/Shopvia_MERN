import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setName("");
          setEmail("");
          setPassword("");
          setAvatar();
        }
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Check your Internet connection",
        );
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
          Create your account
        </h2>
        <p className="text-center text-[14px] text-gray-500 mt-1">
          Join to start shopping and selling
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm rounded-2xl sm:px-10 border border-[#f0ece3]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#1E1B4B] mb-1.5"
              >
                Full Name
              </label>
              <input
                type="text"
                name="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-3.5 py-2.5 border border-[#e5e0d8] rounded-lg shadow-sm placeholder-gray-400 outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-all sm:text-sm"
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-[#1E1B4B] mb-2">
                Profile Photo
              </label>
              <div className="flex items-center">
                <span className="h-12 w-12 rounded-full overflow-hidden bg-white border-2 border-[#e5e0d8] flex items-center justify-center">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <FiUser className="h-5 w-5 text-gray-400" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-4 flex items-center justify-center px-4 py-2 border border-[#e5e0d8] rounded-full shadow-sm text-sm font-medium text-[#1E1B4B] bg-white hover:border-[#C9A227] hover:text-[#C9A227] transition-colors cursor-pointer"
                >
                  <span>Upload photo</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    required
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11.5 flex justify-center items-center rounded-full text-sm font-semibold text-white bg-[#1E1B4B] hover:bg-[#141130] transition-colors"
            >
              Create Account
            </button>

            <div className="flex justify-center text-sm">
              <h4 className="text-gray-600">Already have an account?</h4>
              <Link
                to="/login"
                className="text-[#C9A227] font-medium pl-2 hover:text-[#b8931f]"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
