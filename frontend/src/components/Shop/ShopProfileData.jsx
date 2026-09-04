import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../../redux/actions/product";
import ProductCard from "../Route/ProductCard/ProductCard";
import Ratings from "../Products/Ratings";
import { getAllEventsShop } from "../../../redux/actions/event";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch]);

  const [active, setActive] = useState(1);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-3">
        {isOwner && (
          <Link to="/dashboard" className="shrink-0">
            <button className="bg-[#1E1B4B] hover:bg-[#141130] transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-full">
              Go Dashboard
            </button>
          </Link>
        )}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto">
          <h5
            onClick={() => setActive(1)}
            className={`font-semibold text-[15px] sm:text-[18px] whitespace-nowrap cursor-pointer pb-1 border-b-2 transition-colors ${
              active === 1
                ? "text-[#1E1B4B] border-[#C9A227]"
                : "text-gray-500 border-transparent"
            }`}
          >
            Shop Products
          </h5>
          <h5
            onClick={() => setActive(2)}
            className={`font-semibold text-[15px] sm:text-[18px] whitespace-nowrap cursor-pointer pb-1 border-b-2 transition-colors ${
              active === 2
                ? "text-[#1E1B4B] border-[#C9A227]"
                : "text-gray-500 border-transparent"
            }`}
          >
            Running Events
          </h5>
          <h5
            onClick={() => setActive(3)}
            className={`font-semibold text-[15px] sm:text-[18px] whitespace-nowrap cursor-pointer pb-1 border-b-2 transition-colors ${
              active === 3
                ? "text-[#1E1B4B] border-[#C9A227]"
                : "text-gray-500 border-transparent"
            }`}
          >
            Shop Reviews
          </h5>
        </div>
      </div>

      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6.25 lg:grid-cols-3 lg:gap-6.25 xl:grid-cols-4 xl:gap-5 mb-12 border-0">
          {products &&
            products.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
      )}

      {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6.25 xl:grid-cols-4 xl:gap-5 mb-12 border-0">
            {events &&
              events.map((i, index) => (
                <ProductCard
                  data={i}
                  key={index}
                  isShop={true}
                  isEvent={true}
                />
              ))}
          </div>
          {events && events.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px] text-gray-500">
              No Events have for this shop!
            </h5>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full flex my-4" key={index}>
                <img
                  src={`${item.user.avatar?.url}`}
                  className="w-12.5 h-12.5 rounded-full object-cover"
                  alt=""
                />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-semibold text-[#1E1B4B] pr-2">
                      {item.user.name}
                    </h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="font-normal text-gray-600">{item?.comment}</p>
                  <p className="text-gray-400 text-[13px]">{"2 days ago"}</p>
                </div>
              </div>
            ))}
          {allReviews && allReviews.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px] text-gray-500">
              No Reviews have for this shop!
            </h5>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
