import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import { getAllProducts } from "../../redux/actions/product";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");

  const dispatch = useDispatch();

  const { allProducts, isLoading } = useSelector((state) => state.products);

  const [data, setData] = useState([]);

  // Get all products from backend
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Filter products
  useEffect(() => {
    if (!allProducts) {
      setData([]);
      return;
    }

    if (categoryData === null) {
      setData(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (i) => i.category === categoryData,
      );

      setData(filteredProducts);
    }
  }, [allProducts, categoryData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-[#FDFBF7] min-h-screen">
          <Header activeHeading={3} />

          <br />
          <br />

          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-4 lg:gap-7 xl:grid-cols-5 xl:gap-8 mb-12">
              {data && data.map((i) => <ProductCard data={i} key={i._id} />)}
            </div>

            {data && data.length === 0 && (
              <h1 className="text-center w-full pb-25 text-[20px]">
                Restocking in progress! Products Arriving Soon!
              </h1>
            )}
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
