
import React from "react";
import {
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  HiOutlineReceiptRefund,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
      });
  };

  const menuItemClass = (item) => `
    flex items-center cursor-pointer w-full mb-8
    transition-colors duration-200
    ${
      active === item
        ? "text-red-500"
        : "text-gray-700"
    }
  `;

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-5 pt-8">
      {/* Profile */}
      <div className={menuItemClass(1)} onClick={() => setActive(1)}>
        <RxPerson size={22} />

        <span
          className={`ml-3 hidden lg:block ${
            active === 1 ? "text-red-500" : ""
          }`}
        >
          Profile
        </span>
      </div>

      {/* Orders */}
      <div className={menuItemClass(2)} onClick={() => setActive(2)}>
        <HiOutlineShoppingBag size={22} />

        <span
          className={`ml-3 hidden lg:block ${
            active === 2 ? "text-red-500" : ""
          }`}
        >
          Orders
        </span>
      </div>

      {/* Refunds */}
      <div className={menuItemClass(3)} onClick={() => setActive(3)}>
        <HiOutlineReceiptRefund size={22} />

        <span
          className={`ml-3 hidden lg:block ${
            active === 3 ? "text-red-500" : ""
          }`}
        >
          Refunds
        </span>
      </div>

      {/* Inbox */}
      <div
        className={menuItemClass(4)}
        onClick={() => {
          setActive(4);
          navigate("/inbox");
        }}
      >
        <AiOutlineMessage size={22} />

        <span
          className={`ml-3 hidden lg:block ${
            active === 4 ? "text-red-500" : ""
          }`}
        >
          Inbox
        </span>
      </div>

      {/* Track Order */}
      <div className={menuItemClass(5)} onClick={() => setActive(5)}>
        <MdOutlineTrackChanges size={22} />

        <span
          className={`ml-3 hidden lg:block ${
            active === 5 ? "text-red-500" : ""
          }`}
        >
          Track Order
        </span>
      </div>

      {/* Change Password */}
      <div className={menuItemClass(6)} onClick={() => setActive(6)}>
        <RiLockPasswordLine size={22} />

        <span
          className={`ml-3 hidden lg:block ${
            active === 6 ? "text-red-500" : ""
          }`}
        >
          Change Password
        </span>
      </div>

      {/* Address */}
      <div className={menuItemClass(7)} onClick={() => setActive(7)}>
        <TbAddressBook size={22} />

        <span
          className={`ml-3 hidden lg:block ${
            active === 7 ? "text-red-500" : ""
          }`}
        >
          Address
        </span>
      </div>
      {/* Recently Viewed */}
      <div className={menuItemClass(9)} onClick={() => setActive(9)}>
        <MdOutlineHistory size={22} />

        <span
          className={`ml-3 hidden lg:block ${
            active === 9 ? "text-red-500" : ""
          }`}
        >
          Recently Viewed
        </span>
      </div>
      {/* Admin Dashboard */}
      {user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div className={menuItemClass(8)} onClick={() => setActive(8)}>
            <MdOutlineAdminPanelSettings size={22} />

            <span
              className={`ml-3 hidden lg:block ${
                active === 8 ? "text-red-500" : ""
              }`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}

      {/* Logout */}
      <div
        className="flex items-center cursor-pointer w-full text-gray-700 hover:text-red-500 transition-colors duration-200"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={22} />

        <span className="ml-3 hidden lg:block">Log out</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
