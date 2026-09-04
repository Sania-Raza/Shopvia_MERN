import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineSparkles } from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div className="relative w-full h-[80vh] 800px:h-[100vh] overflow-hidden">
      {/* Full-size background image */}
      <img
        src="https://img.magnific.com/free-photo/black-friday-sales-sign-neon-light_23-2151833076.jpg?semt=ais_hybrid&w=740&q=80"
        alt="Featured products"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay so text stays readable on any image */}
      <div className="absolute inset-0 bg-linear-to-r from-[#1E1B4B]/85 via-[#1E1B4B]/40 to-transparent" />

      {/* Text content — overlaid top-left */}
      <div
        className={`${styles.section} relative z-10 h-full flex items-center`}
      >
        <div className="w-full 800px:w-[55%]">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-[13px] font-medium px-4 py-1.5 rounded-full mb-5 border border-white/20">
            <HiOutlineSparkles size={15} />
            New sellers joining every week
          </span>

          <h1 className="text-[34px] leading-[1.2] 800px:text-[52px] text-white font-semibold capitalize">
            Discover Products <br /> You'll Actually Love
          </h1>

          <p className="pt-5 text-[16px] leading-7 text-white/80 max-w-125">
            Shop thousands of items from independent sellers across fashion,
            beauty, home, and more: all in one place, with prices you'll want to
            brag about.
          </p>

          <div className="flex items-center gap-4 mt-7">
            <Link to="/products">
              <button className="flex items-center gap-1 bg-[#C9A227] hover:bg-[#b8931f] text-[#1E1B4B] text-[15px] font-semibold px-7 py-3.5 rounded-full transition-colors">
                Shop Now
                <IoIosArrowForward />
              </button>
            </Link>

            <Link to="/shop-create">
              <button className="flex items-center gap-1 border border-white/40 hover:border-white text-white text-[15px] font-medium px-7 py-3.5 rounded-full transition-colors">
                Become a Seller
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-8 mt-10">
            <div>
              <h3 className="text-[22px] font-semibold text-white">10+</h3>
              <p className="text-[13px] text-white/70">Products</p>
            </div>
            <div className="w-px h-9 bg-white/25" />
            <div>
              <h3 className="text-[22px] font-semibold text-white">5+</h3>
              <p className="text-[13px] text-white/70">Sellers</p>
            </div>
            <div className="w-px h-9 bg-white/25" />
            <div>
              <h3 className="text-[22px] font-semibold text-white">4.8★</h3>
              <p className="text-[13px] text-white/70">Avg. Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge over the image, bottom-right */}
      <div className="hidden 800px:flex absolute bottom-8 right-8 z-10 bg-white rounded-2xl shadow-lg px-5 py-3 items-center gap-3">
        <span className="w-9 h-9 rounded-full bg-[#1E1B4B]/5 flex items-center justify-center">
          <TbTruckDelivery size={20} className="text-[#1E1B4B]" />
        </span>
        <div>
          <p className="text-[13px] font-semibold text-[#1E1B4B]">
            Free Shipping
          </p>
          <p className="text-[11px] text-gray-500">On orders over PKR 5k</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
