import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0,
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed inset-0 w-full h-screen bg-[#0000004b] z-100">
      <div className="fixed top-0 right-0 h-full w-full sm:w-[75%] md:w-[50%] lg:w-[30%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center py-25 px-4">
                         
            
                          <h2 className="text-[20px] font-semibold text-[#1E1B4B] mb-1.5">
                            No Cart Item right now
                          </h2>
            
                          <p className="text-[14px] text-gray-500 text-center max-w-87.5 mb-6">
                            Let's find something you like.
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
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-medium">
                  {cart && cart.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="px-4 sm:px-5 mb-3">
              <Link to="/checkout">
                <div className="w-full min-h-12.5 flex items-center justify-center bg-[#C9A227] hover:bg-[#b8931f] transition-colors px-3 py-2.5 rounded-full cursor-pointer">
                  <h1 className="text-[#1E1B4B] text-[16px] sm:text-[18px] font-semibold text-center">
                    Checkout Now (PKR {totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#1E1B4B] rounded-full w-6.25 h-6.25 ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-2.5">{data.qty}</span>
          <div
            className="bg-gray-100 rounded-full w-6.25 h-6.25 flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-32.5 h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-1.25">
          <h1>{data.name}</h1>
          <h4 className="font-normal text-[15px] text-[#00000082]">
            PKR{data.discountPrice} * {value}
          </h4>
          <h4 className="font-semibold text-[17px] pt-0.75 text-[#1E1B4B] font-Roboto">
            PKR {totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
