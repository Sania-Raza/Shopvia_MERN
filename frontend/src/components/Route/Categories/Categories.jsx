import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();

  const handleSubmit = (i) => {
    navigate(`/products?category=${i.title}`);
  };

  return (
    <>
      {/* ================= BRANDING STRIP ================= */}
      <div className={`${styles.section} hidden sm:block`}>
        <div className="my-8 grid grid-cols-4 gap-6 bg-white shadow-sm rounded-2xl p-6 border border-[#f0ece3]">
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start gap-3" key={index}>
                <div className="shrink-0">{i.icon}</div>
                <div>
                  <h3 className="font-semibold text-[15px] text-[#1E1B4B]">
                    {i.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">
                    {i.Description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* ================= CATEGORIES ================= */}
      <div className={`${styles.section} mb-12`} id="categories">
        <h2 className="text-[22px] font-semibold text-[#1E1B4B] mb-5">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categoriesData &&
            categoriesData.map((i) => (
              <div
                key={i.id}
                onClick={() => handleSubmit(i)}
                className="group flex flex-col items-center justify-center bg-white border border-[#f0ece3] rounded-2xl py-6 px-3 cursor-pointer hover:border-[#C9A227] hover:shadow-md transition-all duration-300"
              >
                <div className="w-25 h-25 rounded-full bg-[#FDFBF7] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-105 transition-transform">
                  <img
                    src={i.image_Url}
                    alt={i.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h5 className="text-[14px] font-medium text-[#1E1B4B] text-center leading-tight">
                  {i.title}
                </h5>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
