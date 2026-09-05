import React from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../../Layout/Loader";

const FeaturedProduct = () => {
  const { allProducts, isLoading } = useSelector(
    (state) => state.products
  );

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-2 sm:gap-5 md:gap-6.25 lg:grid-cols-4 lg:gap-6.25 xl:grid-cols-5 xl:gap-7.5 mb-12 border-0">
            {allProducts &&
              allProducts.length !== 0 &&
              allProducts.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;
