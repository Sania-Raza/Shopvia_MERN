import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data";

import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";

import DropDown from "./DropDown";
import Navbar from "./Navbar";
import Cart from "../cart/Cart";

import { useSelector } from "react-redux";

// Wishlist is intentionally disabled for now.
// import Wishlist from "../Wishlist/Wishlist";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // const { allProducts } = useSelector((state) => state.products);
  // const { cart } = useSelector((state) => state.cart);

  // Wishlist is intentionally disabled for now.
  // const { wishlist } = useSelector((state) => state.wishlist);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  // const [openCart, setOpenCart] = useState(false);

  // Wishlist is intentionally disabled for now.
  // const [openWishlist, setOpenWishlist] = useState(false);

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
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img src="../../Assests/logo.png" alt="Logo" />
            </Link>
          </div>

          {/* Search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-10 w-full px-2 border-[#3957db] border-2 rounded-md"
            />

            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />

            {searchData.length > 0 && (
              <div className="absolute min-h-[30vh] w-full bg-slate-50 shadow-sm z-10 p-4">
                {searchData.map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    onClick={() => setSearchData([])}
                  >
                    <div className="w-full flex items-center py-3">
                      <img
                        src={product?.images?.[0]?.url}
                        alt={product?.name || "Product"}
                        className="w-10 h-10 mr-10 object-contain"
                      />
                      <h1>{product.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Become seller button can be added here later */}
        </div>
      </div>

      {/* ================= DESKTOP NAVBAR ================= */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-17.5`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* Categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-15 mt-2.5 w-67.5 hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />

              <button
                type="button"
                className="h-full w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-medium select-none rounded-t-md"
              >
                All Categories
              </button>

              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropDown(!dropDown);
                }}
              />

              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
          </div>

          {/* Navigation items */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          {/* Right side icons */}
          <div className="flex">
            {/* ================= WISHLIST DISABLED =================

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-3.75"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />

                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}

            ========================================================= */}

            {/* Cart */}
            {/* <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-3.75"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />

                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                  {cart?.length || 0}
                </span>
              </div>
            </div> */}

            {/* Profile */}
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-3.75">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={user?.avatar?.url}
                      className="w-8.75 h-8.75 rounded-full object-cover"
                      alt="Profile"
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* Cart popup */}
            {/* {openCart && <Cart setOpenCart={setOpenCart} />} */}
          </div>
        </div>
      </div>

      {/* ================= MOBILE HEADER ================= */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } w-full h-15 bg-white z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Menu button */}
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>

          {/* Logo */}
          <div>
            <Link to="/">
              <img className="h-12.5 w-full"
                src="https://shopvia.pk/wp-content/uploads/elementor/thumbs/logo-01-scaled-rlwdrsge74eteo3fiak2itpoe12ycp3oo7yd0nct0o.jpg"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Cart */}
          {/* <div>
            <div
              className="relative mr-5 cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />

              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                {cart?.length || 0}
              </span>
            </div>
          </div> */}

          {/* Cart popup */}
          {/* {openCart && <Cart setOpenCart={setOpenCart} />} */}
        </div>

        {/* ================= MOBILE SIDEBAR ================= */}
        {open && (
          <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
            <div className="fixed w-[70%] bg-white h-screen top-0 left-0 z-10 overflow-y-scroll">
              {/* Sidebar top */}
              <div className="w-full justify-between flex pr-3">
                <div>
                  {/* ================= WISHLIST DISABLED =================

                  <div
                    className="relative cursor-pointer mr-3.75"
                    onClick={() =>
                      setOpenWishlist(true) || setOpen(false)
                    }
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                  </div>

                  ========================================================= */}
                </div>

                <RxCross1
                  size={30}
                  className="ml-4 mt-5 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              {/* Mobile search */}
              <div className="my-8 w-[92%] m-auto relative">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-10 w-full px-2 border-[#3957db] border-2 rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />

                {searchData.length > 0 && (
                  <div className="absolute bg-white z-10 shadow w-full left-0 p-3">
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
                            src={product?.images?.[0]?.url}
                            alt={product?.name || "Product"}
                            className="w-12.5 h-12.5 object-contain mr-2"
                          />
                          <h5>{product.name}</h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Navbar */}
              <Navbar active={activeHeading} />

              {/* Become Seller */}
              <div className={`${styles.button} ml-4 rounded-sm`}>
                <Link to="/shop-create">
                  <h1 className="text-white flex items-center">
                    Become Seller
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>

              <br />
              <br />
              <br />

              {/* User */}
              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={user?.avatar?.url}
                        alt="Profile"
                        className="w-15 h-15 rounded-full border-[3px] border-[#0eae88] object-cover"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-2.5 text-[#000000b7]"
                    >
                      Login /
                    </Link>

                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
