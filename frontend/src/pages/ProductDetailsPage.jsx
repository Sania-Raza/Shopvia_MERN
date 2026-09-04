import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/actions/product";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { allEvents } = useSelector((state) => state.events);

  const [data, setData] = useState(null);

  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if (eventData !== null) {
      const event = allEvents?.find((i) => i._id === id);
      setData(event);
    } else {
      dispatch(getProductById(id));
    }
  }, [id, eventData, allEvents, dispatch]);

  const product = useSelector((state) => state.products.product);

  useEffect(() => {
    if (eventData === null && product) {
      setData(product);
    }
  }, [product, eventData]);

  return (
    <div>
      <Header />

      <ProductDetails data={data} />

      {!eventData && data && <SuggestedProduct data={data} />}

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
