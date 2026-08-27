import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

const Navbar = ({ active }) => {
  return (
    <div className={`block lg:flex items-center`}>
      {navItems?.map((item, index) => (
        <div key={item.title}>
          <Link
            to={item.url}
            className={`${
              active === index + 1
                ? "text-[#17dd1f]"
                : "text-black lg:text-white"
            } pb-7.5 lg:pb-0 font-medium px-6 cursor-pointer`}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
