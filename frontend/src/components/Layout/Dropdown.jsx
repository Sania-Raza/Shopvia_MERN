import React from "react";
import { useNavigate } from "react-router-dom";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="w-full bg-white absolute z-30 rounded-b-xl shadow-lg border border-t-0 border-[#f0ece3] overflow-hidden">
      <div className="max-h-100 overflow-y-auto py-2">
        {categoriesData &&
          categoriesData.map((i, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-2.5 hover:bg-[#FDFBF7] cursor-pointer transition-colors"
              onClick={() => submitHandle(i)}
            >
              <img
                src={i.image_Url}
                className="w-6 h-6 object-contain select-none"
                alt=""
              />
              <h3 className="ml-3 text-[14px] text-[#1E1B4B] select-none">
                {i.title}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DropDown;
