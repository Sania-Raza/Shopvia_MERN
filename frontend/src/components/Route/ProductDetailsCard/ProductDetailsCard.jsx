import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  // If product data is not available, don't render
  if (!data) {
    return null;
  }

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    if (data?.stock && count < data.stock) {
      setCount(count + 1);
    }
  };

  const addToCartHandler = (id) => {
    if (!id) {
      toast.error("Product information is missing!");
      return;
    }

    const isItemExists = cart?.find((i) => i._id === id);

    if (isItemExists) {
      toast.error("Item already in cart!");
      return;
    }

    if (!data?.stock || data.stock < count) {
      toast.error("Product stock limited!");
      return;
    }

    const cartData = {
      ...data,
      qty: count,
    };

    dispatch(addTocart(cartData));
    toast.success("Item added to cart successfully!");
  };

  useEffect(() => {
    if (!data?._id) {
      setClick(false);
      return;
    }

    const isWishlisted = wishlist?.find((item) => item?._id === data._id);

    setClick(!!isWishlisted);
  }, [wishlist, data]);

  const removeFromWishlistHandler = (product) => {
    if (!product?._id) return;

    setClick(false);
    dispatch(removeFromWishlist(product));
  };

  const addToWishlistHandler = (product) => {
    if (!product?._id) return;

    setClick(true);
    dispatch(addToWishlist(product));
  };

  const handleMessageSubmit = () => {
    toast.info("Messaging feature coming soon!");
  };

  const shopId = data?.shop?._id;
  const shopName = data?.shop?.name || "Shop";

  return (
    <div className="bg-white">
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
        <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
          {/* Close */}
          <RxCross1
            size={30}
            className="absolute right-3 top-3 z-50 cursor-pointer"
            onClick={() => setOpen(false)}
          />

          <div className="block w-full 800px:flex">
            {/* LEFT SIDE */}
            <div className="w-full 800px:w-[50%]">
              {/* Product Image */}
              <div className="w-full h-60 800px:h-72.5 bg-[#FDFBF7] rounded-2xl flex items-center justify-center overflow-hidden">
                <img
                  src={data?.images?.[0]?.url || ""}
                  alt={data?.name || "Product"}
                  className="max-w-full max-h-full object-contain p-5"
                />
              </div>
              {/* <img
                src={data?.images?.[0]?.url || ""}
                alt={data?.name || "Product"}
                className="w-full object-contain"
              /> */}

              {/* Shop */}
              {shopId ? (
                <div className="flex mt-4">
                  <Link
                    to={`/shop/preview/${shopId}`}
                    className="flex items-center"
                  >
                    <img
                      src={data?.shop?.avatar?.url || ""}
                      alt={shopName}
                      className="w-12.5 h-12.5 rounded-full mr-2 object-cover"
                    />

                    <div>
                      <h3 className={`${styles.shop_name}`}>{shopName}</h3>

                      <h5 className="pb-3 text-[15px]">
                        {data?.ratings || 0} Ratings
                      </h5>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="mt-4">
                  <h3 className={`${styles.shop_name}`}>
                    Shop information unavailable
                  </h3>
                </div>
              )}

              {/* Message */}
              <div
                className="bg-[#1E1B4B] hover:bg-[#141130] transition-colors mt-4 rounded-xl h-11 flex items-center justify-center cursor-pointer"
                onClick={handleMessageSubmit}
              >
                <span className="text-white flex items-center">
                  Send Message
                  <AiOutlineMessage className="ml-1" />
                </span>
              </div>

              <h5 className="text-[16px] text-[red] mt-5">
                ({data?.sold_out || 0}) Sold
              </h5>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full 800px:w-[50%] pt-5 pl-1.25 pr-1.25">
              {/* Product Name */}
              <h1 className={`${styles.productTitle} text-[20px]`}>
                {data?.name || "Product"}
              </h1>

              {/* Description */}
              <p>{data?.description || "No description available."}</p>

              {/* Price */}
              <div className="flex pt-3">
                <h4 className={`${styles.productDiscountPrice}`}>
                  {data?.discountPrice ?? data?.originalPrice ?? 0}$
                </h4>

                {data?.originalPrice ? (
                  <h3 className={`${styles.price}`}>{data.originalPrice}$</h3>
                ) : null}
              </div>

              {/* Quantity + Wishlist */}
              <div className="flex items-center mt-12 justify-between pr-3">
                <div>
                  <button
                    className="bg-linear-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={decrementCount}
                  >
                    -
                  </button>

                  <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2.75">
                    {count}
                  </span>

                  <button
                    className="bg-linear-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={incrementCount}
                  >
                    +
                  </button>
                </div>

                {/* Wishlist */}
                <div>
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => removeFromWishlistHandler(data)}
                      color="red"
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => addToWishlistHandler(data)}
                      color="#333"
                      title="Add to wishlist"
                    />
                  )}
                </div>
              </div>

              {/* Add To Cart */}
              <div
                className={`${styles.button} mt-6 rounded-sm h-11 flex items-center cursor-pointer`}
                onClick={() => addToCartHandler(data?._id)}
              >
                <span className="text-white flex items-center">
                  Add to cart
                  <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
