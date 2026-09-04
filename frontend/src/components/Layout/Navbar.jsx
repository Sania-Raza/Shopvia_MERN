import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = ({ active }) => {
  return (
    <div className="block lg:flex items-center">
      {navItems?.map((item, index) => (
        <div key={item.title}>
          <Link
            to={item.url}
            className={`${
              active === index + 1
                ? "text-[#C9A227] lg:text-[#C9A227]"
                : "text-[#1E1B4B] lg:text-white/90 hover:text-[#C9A227] lg:hover:text-[#C9A227]"
            } block pb-4 lg:pb-0 font-medium text-[15px] px-6 py-2 lg:py-0 transition-colors cursor-pointer`}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
