// for /dashboard-products
import React from "react";
import DashboardLayout from "../../components/Shop/Layout/DashboardLayout";
import AllProducts from "../../components/Shop/AllProducts";

const ShopAllProducts = () => {
  return (
    <DashboardLayout active={3}>
      <AllProducts />
    </DashboardLayout>
  );
};

export default ShopAllProducts;
