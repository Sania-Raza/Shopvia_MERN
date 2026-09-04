import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${server}/shop/create-shop`, {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      })
      .then((res) => {
        toast.success(res.data.message);

        setName("");
        setEmail("");
        setPassword("");
        setAvatar("");
        setZipCode("");
        setAddress("");
        setPhoneNumber("");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const inputClass =
    "block w-full px-3.5 py-2.5 border border-[#e5e0d8] rounded-lg shadow-sm placeholder-gray-400 outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-all sm:text-sm";
  const labelClass = "block text-sm font-medium text-[#1E1B4B] mb-1.5";

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
          Register as a Seller
        </h2>
        <p className="text-center text-[14px] text-gray-500 mt-1">
          Open your shop and start selling on ShopVia
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-140">
        <div className="bg-white py-8 px-6 shadow-sm rounded-2xl sm:px-10 border border-[#f0ece3]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className={labelClass}>
                Shop Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="phone-number" className={labelClass}>
                Phone Number
              </label>
              <input
                type="number"
                name="phone-number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="address" className={labelClass}>
                Address
              </label>
              <input
                type="text"
                name="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="zipcode" className={labelClass}>
                Zip Code
              </label>
              <input
                type="number"
                name="zipcode"
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>
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
                  className={`${inputClass} pr-11`}
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
                Shop Avatar
              </label>
              <div className="flex items-center">
                <span className=" h-12 w-12 rounded-full overflow-hidden bg-white border-2 border-[#e5e0d8] flex items-center justify-center">
                  {avatar ? (
                    <img
                      src={avatar}
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
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11.5 flex justify-center items-center rounded-full text-sm font-semibold text-white bg-[#1E1B4B] hover:bg-[#141130] transition-colors"
            >
              Create Shop
            </button>

            <div className="flex justify-center text-sm">
              <h4 className="text-gray-600">Already have an account?</h4>
              <Link
                to="/shop-login"
                className="text-[#C9A227] font-medium pl-2 hover:text-[#b8931f]"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
