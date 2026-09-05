import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import { addToRecentlyViewed } from "../../utils/recentlyViewed";
const ProductDetails = ({ data }) => {
  console.log("PRODUCT DATA:", data);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get all products of the shop
  useEffect(() => {
    if (data?.shop?._id) {
      dispatch(getAllProductsShop(data.shop._id));
    }

    if (wishlist && data?._id) {
      const isWishlisted = wishlist.find((i) => i._id === data._id);
      setClick(!!isWishlisted);
    } else {
      setClick(false);
    }

    // Save product to Recently Viewed
    if (data?._id) {
      addToRecentlyViewed(data);
    }
  }, [data, wishlist, dispatch]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (product) => {
    setClick(false);
    dispatch(removeFromWishlist(product));
  };

  const addToWishlistHandler = (product) => {
    setClick(true);
    dispatch(addToWishlist(product));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);

    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data?.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = {
          ...data,
          qty: count,
        };

        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products?.reduce(
      (acc, product) => acc + (product.reviews?.length || 0),
      0,
    ) || 0;

  const totalRatings =
    products?.reduce(
      (acc, product) =>
        acc +
        (product.reviews?.reduce(
          (sum, review) => sum + (review.rating || 0),
          0,
        ) || 0),
      0,
    ) || 0;

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to create a conversation");
      return;
    }

    if (!data?._id) {
      toast.error("Product information is not available");
      return;
    }

    if (!user?._id) {
      toast.error("User information is not available");
      return;
    }

    if (!data?.shop?._id) {
      toast.error("Shop information is not available");
      return;
    }

    const groupTitle = data._id + user._id;
    const userId = user._id;
    const sellerId = data.shop._id;

    try {
      const res = await axios.post(
        `${server}/conversation/create-new-conversation`,
        {
          groupTitle,
          userId,
          sellerId,
        },
        {
          withCredentials: true,
        },
      );

      navigate(`/inbox?${res.data.conversation._id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  };

  // Don't render until product data is available
  if (!data) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
        <div className="w-full py-5">
          <div className="flex w-full flex-col md:flex-row">
            {/* Product Images */}
            <div className="w-full md:w-1/2">
             
              <div className="w-full h-85 md:h-100 bg-[#FDFBF7] rounded-2xl flex items-center justify-center overflow-hidden">
                <img
                  src={data?.images?.[select]?.url || ""}
                  alt={data?.name || "Product"}
                  className="max-w-full max-h-full object-contain p-6"
                />
              </div>

              <div className="w-full flex mt-3">
                {data?.images?.map((image, index) => (
                  <div
                    key={image.public_id || index}
                    className={`${
                      select === index
                        ? "ring-2 ring-[#C9A227]"
                        : "border border-[#f0ece3]"
                    } cursor-pointer rounded-lg overflow-hidden`}
                  >
                    <img
                      src={image?.url || ""}
                      alt=""
                      className="h-18 w-18 object-contain bg-white mr-3 p-1"
                      onClick={() => setSelect(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="w-full md:w-1/2 pt-5 md:pl-8">
              <h1 className={`${styles.productTitle}`}>{data?.name}</h1>

              <p>{data?.description}</p>

              <div className="flex pt-3">
                <h4 className={`${styles.productDiscountPrice}`}>
                  {data?.discountPrice} PKR
                </h4>

                <h3 className={`${styles.price}`}>
                  {data?.originalPrice ? `${data.originalPrice} PKR` : null}
                </h3>
              </div>

              {/* Quantity + Wishlist */}
              <div className="flex items-center mt-12 justify-between pr-3">
                <div>
                  <button
                    className="bg-[#1E1B4B] hover:bg-[#141130] text-white font-bold rounded-l-lg px-4 py-2 transition-colors"
                    onClick={decrementCount}
                  >
                    -
                  </button>

                  <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2.75">
                    {count}
                  </span>

                  <button
                    className="bg-[#1E1B4B] hover:bg-[#141130] text-white font-bold rounded-r-lg px-4 py-2 transition-colors"
                    onClick={incrementCount}
                  >
                    +
                  </button>
                </div>

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

              {/* Add to Cart */}
              <div
                className="bg-[#1E1B4B] hover:bg-[#141130] transition-colors mt-6 rounded-xl h-12.5 flex items-center justify-center cursor-pointer"
                onClick={() => addToCartHandler(data?._id)}
              >
                <span className="text-white flex items-center">
                  Add to cart
                  <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>

              {/* Shop Information */}
              <div className="flex items-center pt-8">
                <Link
                  to={data?.shop?._id ? `/shop/preview/${data.shop._id}` : "#"}
                >
                  <img
                    src={data?.shop?.avatar?.url || ""}
                    alt=""
                    className="w-12.5 h-12.5 rounded-full mr-2"
                  />
                </Link>

                <div className="pr-8">
                  <Link
                    to={
                      data?.shop?._id ? `/shop/preview/${data.shop._id}` : "#"
                    }
                  >
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data?.shop?.name || "Shop"}
                    </h3>
                  </Link>

                  <h5 className="pb-3 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>

                <div
                  className="bg-[#C9A227] hover:bg-[#b8931f] transition-colors mt-4 rounded-xl h-12.5 flex items-center justify-center cursor-pointer px-5"
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#1E1B4B] font-medium flex items-center">
                    Send Message
                    <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details / Reviews / Seller */}
        <ProductDetailsInfo
          data={data}
          products={products}
          totalReviewsLength={totalReviewsLength}
          averageRating={averageRating}
        />

        <br />
        <br />
      </div>
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      {/* Tabs */}
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-black text-[18px] px-1 leading-5 font-semibold cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>

          {active === 1 && <div className={`${styles.active_indicator}`} />}
        </div>

        <div className="relative">
          <h5
            className="text-black text-[18px] px-1 leading-5 font-semibold cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>

          {active === 2 && <div className={`${styles.active_indicator}`} />}
        </div>

        <div className="relative">
          <h5
            className="text-black text-[18px] px-1 leading-5 font-semibold cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>

          {active === 3 && <div className={`${styles.active_indicator}`} />}
        </div>
      </div>

      {/* Product Details */}
      {active === 1 && (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data?.description}
          </p>
        </>
      )}

      {/* Product Reviews */}
      {active === 2 && (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data?.reviews?.map((item, index) => (
            <div key={item._id || index} className="w-full flex my-2">
              <img
                src={item?.user?.avatar?.url || ""}
                alt=""
                className="w-12.5 h-12.5 rounded-full"
              />

              <div className="pl-2">
                <div className="w-full flex items-center">
                  <h1 className="font-mrdium mr-3">
                    {item?.user?.name || "User"}
                  </h1>

                  <Ratings rating={data?.ratings || 0} />
                </div>

                <p>{item?.comment}</p>
              </div>
            </div>
          ))}

          <div className="w-full flex justify-center">
            {data?.reviews?.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      )}

      {/* Seller Information */}
      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={data?.shop?._id ? `/shop/preview/${data.shop._id}` : "#"}>
              <div className="flex items-center">
                <img
                  src={data?.shop?.avatar?.url || ""}
                  className="w-12.5 h-12.5 rounded-full"
                  alt=""
                />

                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>
                    {data?.shop?.name || "Shop"}
                  </h3>

                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>

            <p className="pt-2">{data?.shop?.description || ""}</p>
          </div>

          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-semibold">
                Joined on:{" "}
                <span className="font-semibold">
                  {data?.shop?.createdAt?.slice(0, 10) || "N/A"}
                </span>
              </h5>

              <h5 className="font-semibold pt-3">
                Total Products:{" "}
                <span className="font-bold">{products?.length || 0}</span>
              </h5>

              <h5 className="font-semibold pt-3">
                Total Reviews:{" "}
                <span className="font-semibold">{totalReviewsLength || 0}</span>
              </h5>

              <Link to={`/shop/preview/${data?.shop?._id}`}>
                <div className={`${styles.button} rounded-sm! h-10.5! mt-3`}>
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
