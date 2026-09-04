import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data";

import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";

import Dropdown from "./Dropdown";
import Navbar from "./Navbar";
import Cart from "../cart/Cart";

import { useSelector } from "react-redux";

import Wishlist from "../Wishlist/Wishlist";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller, seller } = useSelector((state) => state.seller);
  const { allProducts } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setSearchData([]);
      return;
    }

    const filteredProducts =
      allProducts?.filter((product) =>
        product?.name?.toLowerCase().includes(term.toLowerCase()),
      ) || [];

    setSearchData(filteredProducts);
  };

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* ================= DESKTOP TOP HEADER ================= */}
      <div className="bg-white">
        <div className={`${styles.section}`}>
          <div className="hidden lg:h-18 lg:my-2 lg:flex items-center justify-between">
            <div>
              <Link to="/">
                <img
                  className="h-14 object-contain"
                  src="https://shopvia.pk/wp-content/uploads/elementor/thumbs/logo-01-scaled-rlwdrsge74eteo3fiak2itpoe12ycp3oo7yd0nct0o.jpg"
                  alt="Logo"
                />
              </Link>
            </div>

            {/* Search box */}
            <div className="w-[48%] relative">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-12 w-full pl-5 pr-12 rounded-full border border-[#e5e0d8] bg-white text-sm placeholder:text-gray-400 shadow-sm outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-all"
              />

              <AiOutlineSearch
                size={22}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              {searchData.length > 0 && (
                <div className="absolute min-h-[30vh] w-full bg-white shadow-lg rounded-xl z-10 p-4 mt-2 border border-[#f0ece3]">
                  {searchData.map((product) => (
                    <Link
                      to={`/product/${product._id}`}
                      key={product._id}
                      onClick={() => setSearchData([])}
                    >
                      <div className="w-full flex items-center py-3 hover:bg-[#FDFBF7] rounded-lg px-2 transition-colors">
                        <img
                          src={product?.images?.[0]?.url}
                          alt={product?.name || "Product"}
                          className="w-10 h-10 mr-4 object-contain"
                        />
                        <h1 className="text-sm text-gray-700">
                          {product.name}
                        </h1>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="ml-6">
              {isSeller ? (
                <Link to="/dashboard">
                  <button className="flex items-center gap-1 bg-[#1E1B4B] hover:bg-[#141130] text-white text-sm font-medium px-5 py-3 rounded-full transition-colors">
                    Go Dashboard
                    <IoIosArrowForward className="ml-1" />
                  </button>
                </Link>
              ) : isAuthenticated ? (
                <Link to="/profile">
                  <button className="flex items-center gap-1 bg-[#1E1B4B] hover:bg-[#141130] text-white text-sm font-medium px-5 py-3 rounded-full transition-colors">
                    Go Dashboard
                    <IoIosArrowForward className="ml-1" />
                  </button>
                </Link>
              ) : (
                <Link to="/shop-create">
                  <button className="flex items-center gap-1 bg-[#1E1B4B] hover:bg-[#141130] text-white text-sm font-medium px-5 py-3 rounded-full transition-colors">
                    Become Seller
                    <IoIosArrowForward className="ml-1" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP NAVBAR ================= */}
      <div
        className={`${
          active ? "shadow-md fixed top-0 left-0 z-10" : ""
        } transition-all duration-200 hidden lg:flex items-center justify-between w-full bg-[#1E1B4B] h-16`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* Categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-13 mt-1.5 w-64 hidden lg:block">
              <button
                type="button"
                className={`h-full w-full flex justify-between items-center px-5 bg-white font-medium text-[15px] select-none shadow-sm ${
                  dropDown ? "rounded-t-xl" : "rounded-xl"
                }`}
              >
                <span className="flex items-center gap-2 text-[#1E1B4B]">
                  <BiMenuAltLeft size={22} />
                  All Categories
                </span>
                <IoIosArrowDown
                  size={16}
                  className="text-gray-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropDown(!dropDown);
                  }}
                />
              </button>

              {dropDown && (
                <Dropdown
                 categoriesData={categoriesData}
                 setDropdown={setDropdown}
                 />
              )}
            </div>
          </div>

          {/* Navigation items */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-5">
            <div
              className="relative cursor-pointer"
              onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineHeart
                size={26}
                className="text-white/85 hover:text-[#C9A227] transition-colors"
              />
              <span className="absolute -right-2 -top-2 rounded-full bg-[#C9A227] w-4.5 h-4.5 text-[#1E1B4B] font-semibold text-[11px] leading-tight text-center flex items-center justify-center">
                {wishlist && wishlist.length}
              </span>
            </div>

            <div
              className="relative cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart
                size={26}
                className="text-white/85 hover:text-[#C9A227] transition-colors"
              />
              <span className="absolute -right-2 -top-2 rounded-full bg-[#C9A227] w-4.5 h-4.5 text-[#1E1B4B] font-semibold text-[11px] leading-tight text-center flex items-center justify-center">
                {cart?.length || 0}
              </span>
            </div>

            <div className="relative cursor-pointer">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={user?.avatar?.url}
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#C9A227]"
                    alt="Profile"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile
                    size={26}
                    className="text-white/85 hover:text-[#C9A227] transition-colors"
                  />
                </Link>
              )}
            </div>

            {openCart && <Cart setOpenCart={setOpenCart} />}
          </div>
        </div>
      </div>

      {/* ================= MOBILE HEADER ================= */}
      <div
        className={`${
          active ? "shadow-md fixed top-0 left-0 z-10" : ""
        } w-full h-16 bg-white z-50 top-0 left-0 shadow-sm lg:hidden`}
      >
        <div className="w-full flex items-center justify-between px-2">
          <div>
            <BiMenuAltLeft
              size={34}
              className="ml-2 cursor-pointer text-[#1E1B4B]"
              onClick={() => setOpen(true)}
            />
          </div>

          <div>
            <Link to="/">
              <img
                className="h-14 object-contain"
                src="https://shopvia.pk/wp-content/uploads/elementor/thumbs/logo-01-scaled-rlwdrsge74eteo3fiak2itpoe12ycp3oo7yd0nct0o.jpg"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="flex items-center gap-5 mr-3">
            {/* Wishlist */}
            <div
              className="relative cursor-pointer"
              onClick={() => {
                setOpenWishlist(true);
                setOpenCart(false);
              }}
            >
              <AiOutlineHeart size={26} className="text-[#1E1B4B]" />

              <span className="absolute -right-2 -top-2 rounded-full bg-[#C9A227] w-4.5 h-4.5 text-[#1E1B4B] font-semibold text-[11px] leading-tight text-center flex items-center justify-center">
                {wishlist?.length || 0}
              </span>
            </div>

            {/* Cart */}
            <div
              className="relative cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={26} className="text-[#1E1B4B]" />

              <span className="absolute -right-2 -top-2 rounded-full bg-[#C9A227] w-4.5 h-4.5 text-[#1E1B4B] font-semibold text-[11px] leading-tight text-center flex items-center justify-center">
                {cart?.length || 0}
              </span>
            </div>
          </div>

          {openCart && <Cart setOpenCart={setOpenCart} />}
        </div>

        {/* ================= MOBILE SIDEBAR ================= */}
        {open && (
          <div className="fixed w-full bg-black/50 z-20 h-full top-0 left-0">
            <div className="fixed w-[75%] bg-[#FDFBF7] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex items-center pl-6 pt-4">
                <RxCross1
                  size={24}
                  className="cursor-pointer text-[#1E1B4B]"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-6 w-[90%] m-auto relative">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="h-11 w-full px-4 rounded-full border border-[#e5e0d8] bg-white text-sm outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />

                {searchData.length > 0 && (
                  <div className="absolute bg-white z-10 shadow-lg rounded-xl w-full left-0 p-3 mt-2 border border-[#f0ece3]">
                    {searchData.map((product) => (
                      <Link
                        to={`/product/${product._id}`}
                        key={product._id}
                        onClick={() => {
                          setSearchData([]);
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-center py-2">
                          <img
                            src={product?.image_Url?.[0]?.url}
                            alt={product?.name || "Product"}
                            className="w-12 h-12 object-contain mr-3"
                          />
                          <h5 className="text-sm">{product.name}</h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />

              <div className="w-[90%] m-auto mt-6">
                {isSeller ? (
                  <Link to="/dashboard">
                    <button className="w-full flex items-center justify-center gap-1 bg-[#1E1B4B] hover:bg-[#141130] text-white text-sm font-medium px-5 py-3 rounded-full transition-colors">
                      Go Dashboard
                      <IoIosArrowForward className="ml-1" />
                    </button>
                  </Link>
                ) : isAuthenticated ? (
                  <Link to="/profile">
                    <button className="w-full flex items-center justify-center gap-1 bg-[#1E1B4B] hover:bg-[#141130] text-white text-sm font-medium px-5 py-3 rounded-full transition-colors">
                      Go Dashboard
                      <IoIosArrowForward className="ml-1" />
                    </button>
                  </Link>
                ) : (
                  <Link to="/shop-create">
                    <button className="w-full flex items-center justify-center gap-1 bg-[#1E1B4B] hover:bg-[#141130] text-white text-sm font-medium px-5 py-3 rounded-full transition-colors">
                      Become Seller
                      <IoIosArrowForward className="ml-1" />
                    </button>
                  </Link>
                )}
              </div>

              <div className="flex w-full justify-center mt-8 mb-8">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={user?.avatar?.url}
                      alt="Profile"
                      className="w-16 h-16 rounded-full border-2 border-[#C9A227] object-cover"
                    />
                  </Link>
                ) : (
                  <div className="flex gap-2">
                    <Link
                      to="/login"
                      className="text-[16px] text-[#1E1B4B] font-medium"
                    >
                      Login
                    </Link>
                    <span className="text-[16px] text-gray-400">/</span>
                    <Link
                      to="/sign-up"
                      className="text-[16px] text-[#1E1B4B] font-medium"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};

export default Header;
