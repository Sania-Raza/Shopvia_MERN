import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../../redux/actions/wishlist";
import { addTocart } from "../../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const productLink =
    isEvent === true
      ? `/product/${data._id}?isEvent=true`
      : `/product/${data._id}`;

  const discountPct =
    data.originalPrice && data.originalPrice > data.discountPrice
      ? Math.round(
          ((data.originalPrice - data.discountPrice) / data.originalPrice) *
            100,
        )
      : 0;

  return (
    <div className="group w-full bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-3 relative">
      {/* Image area */}
      <div className="relative w-full h-45 bg-[#FDFBF7] rounded-xl overflow-hidden">
        <Link to={productLink}>
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt={data.name}
            className="w-full h-full object-contain p-5"
          />
        </Link>

        {discountPct > 0 && (
          <span className="absolute top-2 left-2 bg-[#C9A227] text-white text-[11px] font-semibold px-2 py-1 rounded-full">
            {discountPct}% OFF
          </span>
        )}

        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {click ? (
            <button
              onClick={() => removeFromWishlistHandler(data)}
              className="w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white transition-colors"
              title="Remove from wishlist"
            >
              <AiFillHeart size={16} color="#e0455f" />
            </button>
          ) : (
            <button
              onClick={() => addToWishlistHandler(data)}
              className="w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white transition-colors"
              title="Add to wishlist"
            >
              <AiOutlineHeart size={16} color="#1E1B4B" />
            </button>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white transition-colors"
            title="Quick view"
          >
            <AiOutlineEye size={16} color="#1E1B4B" />
          </button>

          <button
            onClick={() => addToCartHandler(data._id)}
            className="w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white transition-colors"
            title="Add to cart"
          >
            <AiOutlineShoppingCart size={16} color="#1E1B4B" />
          </button>
        </div>
      </div>

      {/* Info */}
      <Link to={`/shop/preview/${data?.shop?._id}`}>
        <h5 className={`${styles.shop_name} pt-2.5 pb-1`}>
          {data?.shop?.name || "Shop"}
        </h5>
      </Link>

      <Link to={productLink}>
        <h4 className="font-medium text-[14.5px] text-[#1E1B4B] leading-snug h-10 line-clamp-2 mb-1.5">
          {data.name}
        </h4>

        <Ratings rating={data?.ratings} />

        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice} 
              PKR
            </h5>
            {data.originalPrice ? (
              <h4 className={`${styles.price}`}>{data.originalPrice} PKR</h4>
            ) : null}
          </div>
          <span className="text-[12px] text-gray-400">
            {data?.sold_out || 0} sold
          </span>
        </div>
      </Link>

      {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
    </div>
  );
};

export default ProductCard;
