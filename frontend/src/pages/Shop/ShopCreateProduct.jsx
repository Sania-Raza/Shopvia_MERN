// for /dashboard-create-product
import React from "react";
import DashboardLayout from "../../components/Shop/Layout/DashboardLayout";
import CreateProduct from "../../components/Shop/CreateProduct";

const ShopCreateProduct = () => {
  return (
    <DashboardLayout active={4}>
      <CreateProduct />
    </DashboardLayout>
  );
};

export default ShopCreateProduct;
