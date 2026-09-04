import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { Link } from "react-router-dom";
const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  };

  return (
    <div className="fixed inset-0 bg-[#0000004b] z-50">
      <div
        className="
          fixed top-0 right-0
          h-full
          w-full
          min-[800px]:w-[30%]
          bg-white
          overflow-y-auto
          flex flex-col
          shadow-lg
        "
      >
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            {/* Close button */}
            <div className="absolute top-5 right-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center py-25 px-4">
              <h2 className="text-[20px] font-semibold text-[#1E1B4B] mb-1.5">
                Your wishlist is waiting!
              </h2>

              <p className="text-[14px] text-gray-500 text-center max-w-87.5 mb-6">
                Start exploring and add your favorites!
              </p>

              <Link to="/products">
                <button className="bg-[#1E1B4B] hover:bg-[#141130] text-white text-sm font-medium px-6 py-3 rounded-full transition-colors">
                  Browse Products
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="w-full">
              <div className="flex justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>

              {/* Wishlist item count */}
              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />

                <h5 className="pl-2 text-[20px] font-medium">
                  {wishlist?.length} items
                </h5>
              </div>
            </div>

            {/* Wishlist items */}
            <div className="w-full border-t">
              {wishlist &&
                wishlist.map((item, index) => (
                  <CartSingle
                    key={index}
                    data={item}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center gap-3">
        {/* Remove */}
        <RxCross1
          className="cursor-pointer shrink-0"
          onClick={() => removeFromWishlistHandler(data)}
        />

        {/* Product image */}
        <img
          src={data?.images?.[0]?.url}
          alt=""
          className="
            w-20 h-20
            min-[800px]:w-24
            min-[800px]:h-24
            object-cover
            rounded-[5px]
            shrink-0
          "
        />

        {/* Product information */}
        <div className="flex-1 min-w-0">
          <h1 className="text-[15px] min-[800px]:text-[16px] truncate">
            {data.name}
          </h1>

          <h4 className="font-semibold pt-2 text-[16px] text-[#d02222] font-Roboto">
            PKR {totalPrice}
          </h4>
        </div>

        {/* Add to cart */}
        <BsCartPlus
          size={20}
          className="cursor-pointer shrink-0"
          title="Add to cart"
          onClick={() => addToCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Wishlist;
